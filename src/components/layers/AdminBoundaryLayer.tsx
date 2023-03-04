import { FeatureCollection } from "geojson";
import { Layer, LineLayer, Source } from "react-map-gl";

const layerStyle: LineLayer = {
  id: "admin-boundary",
  source: "admin-boundary",
  type: "line",
  layout: {},
  paint: {
    "line-color": "#0080ff",
    "line-width": 3,
  },
  filter: ["==", "$type", "Polygon"],
};

export const AdminBoundaryLayer: React.FC<{ geojson: FeatureCollection }> = ({
  geojson,
}) => {
  return (
    <>
      {geojson && (
        <Source id="admin-boundary" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      )}
    </>
  );
};
