import { MapProvider, MapRef } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useRouter } from "next/router";
import useSWR from "swr";
import * as turf from "@turf/turf";
import { useCallback, useEffect, useRef, useState } from "react";
import { fetcher } from "@/lib/fetcher";

import Head from "next/head";

import styles from "@/styles/Mission.module.css";
import { BaseMap } from "@/components/BaseMap";
import { MapHeader } from "@/components/MapHeader";
import { AdminBoundaryLayer } from "@/components/layers/AdminBoundaryLayer";
import { EmojiLayer } from "@/types/layer";
import { ConcernLayers } from "@/components/layers/ConcernLayers";

const Mission = () => {
  const router = useRouter();
  const { name: missionName } = router.query;

  const mapRef = useRef<MapRef | null>(null);
  const [currentCenter, setCurrentCenter] = useState<number[] | undefined>(
    undefined
  );

  const [selectedMapStyle, setSelectedMapStyle] = useState<string>();
  const onChangeMapStyle = useCallback((newSelectedMapStyle: string) => {
    setSelectedMapStyle(newSelectedMapStyle);
  }, []);

  const [selectedLayers, setSelectedLayers] = useState<EmojiLayer[]>();
  const onChangeLayer = useCallback((newSelectedLayers: EmojiLayer[]) => {
    setSelectedLayers(newSelectedLayers);
  }, []);

  const countryBoundaryDataUrl = missionName
    ? `/data/${missionName}/boundary.geojson`
    : undefined;
  const { data: boundaryGeoJSON } = useSWR(countryBoundaryDataUrl, fetcher);

  // 初回のみ地図をデータにあわせる
  useEffect(() => {
    setTimeout(() => {
      if (!mapRef || !mapRef.current) return;
      if (!boundaryGeoJSON) return;
      const [minLng, minLat, maxLng, maxLat] = turf.bbox(boundaryGeoJSON);

      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }, 500);
  }, [boundaryGeoJSON]);

  const updateCurrentCenter = useCallback(() => {
    if (!mapRef || !mapRef.current) return;
    setCurrentCenter([
      mapRef.current.getCenter().lng,
      mapRef.current.getCenter().lat,
    ]);
  }, []);

  if (!missionName) return null;
  if (!boundaryGeoJSON) return null;

  return (
    <>
      <Head>
        <title>{missionName} - MUNDO Maps</title>
        <meta name="description" content={`${missionName} - MUNDO Maps`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/unopengis_logo.png" />
      </Head>
      <div>
        <MapHeader
          missionName={missionName as string}
          onChangeMapStyleJson={onChangeMapStyle}
          onChangeConcernLayer={onChangeLayer}
        />
        <MapProvider>
          <div style={{ margin: "0px" }}>
            <BaseMap
              id="mainMap"
              mapRef={mapRef}
              longitude={0}
              latitude={0}
              zoom={11}
              onMapLoad={updateCurrentCenter}
              onMapMoveEnd={updateCurrentCenter}
              style={selectedMapStyle}
            >
              <AdminBoundaryLayer geojson={boundaryGeoJSON} />
              {selectedLayers &&
                selectedLayers.map((layerOption) => {
                  return (
                    <ConcernLayers
                      key={layerOption.layerName}
                      missionName={missionName as string}
                      layerName={layerOption.layerName}
                      emoji={layerOption.emoji}
                    />
                  );
                })}
            </BaseMap>
          </div>
        </MapProvider>
      </div>
    </>
  );
};

export default Mission;
