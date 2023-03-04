import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { GeoJSONToMarkers } from "../GeoJSONMarkers";
import { IncidentLayer } from "./IncidentLayer";
import { RoadClosedLayer } from "./RoadClosedLayer";

export const ConcernLayers: React.FC<{
  missionName: string;
  layerName: string;
  emoji: string;
}> = ({ missionName, layerName, emoji }) => {
  const url =
    missionName && layerName
      ? `/data/${missionName}/${layerName}.geojson`
      : undefined;
  const { data: geojson, error } = useSWR(url, fetcher);

  console.log(error);
  if (error) return null;
  if (!geojson) return null;

  switch (layerName) {
    case "incidents":
      return (
        <>
          <IncidentLayer geojson={geojson} />
          <GeoJSONToMarkers geojson={geojson} emoji={emoji} />
        </>
      );
    case "road_closed":
      return (
        <>
          <RoadClosedLayer geojson={geojson} />
          <GeoJSONToMarkers geojson={geojson} emoji={emoji} />
        </>
      );
    default:
      return <GeoJSONToMarkers geojson={geojson} emoji={emoji} />;
  }
};
