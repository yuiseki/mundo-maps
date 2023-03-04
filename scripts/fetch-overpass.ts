import { load } from "js-yaml";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { globSync } from "glob";
import osmtogeojson from "osmtogeojson";
import { basename, parse } from "path";
import { FeatureCollection } from "geojson";

const convertOverpassTag = (nwr: any) => {
  return nwr
    .map((nwr: any) => {
      return Object.keys(nwr).map((key) => {
        if (nwr[key]) {
          return `${key}="${nwr[key]}"`;
        } else {
          return key;
        }
      });
    })
    .flat();
};

const convertOverpassNWRQuery = (subject: string, tags: string[]) => {
  return tags.map((tag: string) => {
    return `${subject}[${tag}](area.a)`;
  });
};

const adminBoundaryQuery = (adminRelationId: number, adminLevel: number) => {
  return `
[out:json][timeout:30000];
relation(${adminRelationId})[admin_level=${adminLevel}][type='boundary'][boundary='administrative']['name'];
out geom;
`;
};

const fetchAndSaveAdminBoundary = async (
  adminRelationId: number,
  areaLevel: number,
  saveDir: string
) => {
  const geojsonFilePath = `${saveDir}/boundary.geojson`;
  if (!existsSync(geojsonFilePath)) {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: adminBoundaryQuery(adminRelationId, areaLevel),
    });
    const boundaryJson = await res.json();
    const boundaryGeojson = osmtogeojson(boundaryJson);
    writeFileSync(
      geojsonFilePath,
      JSON.stringify(boundaryGeojson, undefined, 2)
    );
  }
};

const buildOverpassQuery = async (
  layer: any,
  areaKey: string,
  areaName: string,
  missionName: string
) => {
  let subject = "";
  let tags = [];
  let nwrQuery: string[][] = [];
  let nwrQueries: string = "";
  let osmIds: string[] = [];
  let osmIdsQuery: string = "";
  let osmOverrideFeatures: any[] = [];

  console.log("layer: ", layer);

  if (layer.nwr) {
    subject = "nwr";
    tags = convertOverpassTag(layer.nwr);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }
  if (layer.node) {
    subject = "node";
    tags = convertOverpassTag(layer.node);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }
  if (layer.way) {
    subject = "way";
    tags = convertOverpassTag(layer.way);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }
  if (layer.relation) {
    subject = "relation";
    tags = convertOverpassTag(layer.relation);
    nwrQuery.push(convertOverpassNWRQuery(subject, tags));
  }
  if (layer.osm_ids_dir) {
    subject = "nwr";
    const yamlFiles = globSync(
      `./missions/${missionName}/${layer.osm_ids_dir}/**/[!_]*.yml`
    );
    if (yamlFiles.length > 0) {
      osmIds = yamlFiles.map((yamlFile) => parse(basename(yamlFile)).name);
      osmIdsQuery = `nwr(id:${osmIds.join(",")})(area.a);`;
      yamlFiles.map((yamlFile) => {
        const osmOverrideFeatureJSON = load(
          readFileSync(yamlFile, "utf8")
        ) as any;
        osmOverrideFeatureJSON["id"] = parse(basename(yamlFile)).name;
        osmOverrideFeatures.push(osmOverrideFeatureJSON);
      });
    }
  }

  console.log("nwrQuery: ", nwrQuery);

  if (nwrQuery.length > 0) {
    nwrQueries = nwrQuery.flat().join(";\n      ") + ";";
  }

  console.log("nwrQueries: ", nwrQueries);

  if (nwrQueries.length === 0 && osmIdsQuery.length === 0) {
    return { query: undefined, osmOverrideFeatures: undefined };
  }

  const query = `
    [out:json][timeout:30000];
    area['${areaKey}'='${areaName}']->.a;
    (
      ${nwrQueries}
      ${osmIdsQuery}
    );
    out geom;
  `;
  console.log("query: ", query);
  return { query, osmOverrideFeatures };
};

// main
const configFilePaths = globSync(`./missions/**/overpass.yml`);
if (configFilePaths.length > 0) {
  for await (const configFilePath of configFilePaths) {
    console.log("configFilePath: ", configFilePath);
    const missionName = configFilePath.split("/")[2];
    console.log("missionName: ", missionName);
    const missionDataDir = `public/data/${missionName}/`;
    const config = load(readFileSync(configFilePath, "utf8")) as any;
    console.log("config: ", config);

    const areaKey = Object.keys(config.area)[0];
    const areaName = config.area[areaKey];
    const areaRelationId = config.area.relation;
    const areaLevel = config.area.level;

    console.log("area: ", areaName);
    console.log("area relation id: ", areaRelationId);
    console.log("level: ", areaLevel);
    if (areaRelationId && areaLevel) {
      await fetchAndSaveAdminBoundary(
        areaRelationId,
        areaLevel,
        missionDataDir
      );
    }

    for await (const layer of config.layers) {
      const geojsonFilePath = `${missionDataDir}/${layer.name}.geojson`;
      const { query, osmOverrideFeatures } = await buildOverpassQuery(
        layer,
        areaKey,
        areaName,
        missionName
      );

      if (!query || query.length === 0) {
        continue;
      }

      let geojson: FeatureCollection;
      if (existsSync(geojsonFilePath)) {
        geojson = JSON.parse(readFileSync(geojsonFilePath, "utf-8"));
      } else {
        const res = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: query,
        });
        const json = await res.json();
        geojson = osmtogeojson(json);
      }

      if (osmOverrideFeatures.length > 0) {
        for (const feature of geojson.features) {
          for (const overrideFeature of osmOverrideFeatures) {
            if (
              feature.id &&
              typeof feature.id === "string" &&
              feature.id.includes(overrideFeature.id)
            ) {
              if (feature.properties) {
                Object.assign(feature.properties, overrideFeature.properties);
              }
            }
          }
        }
      }

      writeFileSync(geojsonFilePath, JSON.stringify(geojson, undefined, 2));
    }
  }
}
