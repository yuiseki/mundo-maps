import { FillLayer, Layer, LineLayer, Source } from "react-map-gl";

const fillStyle: FillLayer = {
  id: "road-closed",
  type: "fill",
  source: "road-closed",
  layout: {},
  paint: {
    "fill-color": "red",
    "fill-opacity": 0.5,
  },
  filter: ["==", "$type", "Polygon"],
};

const lineStyle: LineLayer = {
  id: "road-closed-line",
  type: "line",
  source: "road-closed",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "red",
    "line-opacity": 0.4,
    "line-width": 5,
  },
};

export const RoadClosedLayer: React.FC<{ geojson: any }> = ({ geojson }) => {
  return (
    <>
      {geojson && (
        <>
          <Source id="road-closed" type="geojson" data={geojson}>
            <Layer {...fillStyle} />
            <Layer {...lineStyle} />
          </Source>
        </>
      )}
    </>
  );
};
