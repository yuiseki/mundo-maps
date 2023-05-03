/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/MapHeader.module.css";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { EmojiLayer } from "@/types/layer";
import { Inter } from "next/font/google";
import { useLocalStorage } from "@/hooks/localStorage";
import { BaseMapStyleOptions } from "./BaseMapStyleOptions";
import { ConcernLayerList } from "@/const/ConcernLayerList";

const inter = Inter({ subsets: ["latin"] });

export const MapHeader: React.FC<{
  missionName?: string;
  onChangeMapStyleJson?: (selectedMapStyleJson: string) => void;
  onChangeConcernLayer?: (selectedLayers: EmojiLayer[]) => void;
}> = ({ missionName, onChangeMapStyleJson, onChangeConcernLayer }) => {
  const [mapStyleJsonUrl, setMapStyleJsonUrl] = useLocalStorage<string>(
    "mundo-selected-map-style-json-url",
    "https://tile.openstreetmap.jp/styles/osm-bright/style.json"
  );

  const [selectedConcernLayerNames, setSelectedConcernLayerNames] =
    useLocalStorage<string[]>("mundo-selected-concern-layers", [
      "military",
      "incidents",
      "road_closed",
    ]);

  const onSelectMapStyleJsonUrl = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setMapStyleJsonUrl(e.target.value);
    },
    [setMapStyleJsonUrl]
  );

  useEffect(() => {
    if (onChangeConcernLayer) {
      onChangeConcernLayer(
        ConcernLayerList.filter((item) =>
          selectedConcernLayerNames.includes(item.layerName)
        )
      );
    }
    if (onChangeMapStyleJson) {
      onChangeMapStyleJson(mapStyleJsonUrl);
    }
  }, [
    onChangeConcernLayer,
    onChangeMapStyleJson,
    selectedConcernLayerNames,
    mapStyleJsonUrl,
  ]);

  const onCheckConcernLayer = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newSelectedLayerNames: string[];
      if (selectedConcernLayerNames.includes(e.target.value)) {
        newSelectedLayerNames = selectedConcernLayerNames.filter(
          (item) => item !== e.target.value
        );
      } else {
        newSelectedLayerNames = [...selectedConcernLayerNames, e.target.value];
      }
      setSelectedConcernLayerNames(newSelectedLayerNames);
      if (onChangeConcernLayer) {
        const newSelectedLayers = ConcernLayerList.filter((item) =>
          newSelectedLayerNames.includes(item.layerName)
        );
        onChangeConcernLayer(newSelectedLayers);
      }
    },
    [
      onChangeConcernLayer,
      selectedConcernLayerNames,
      setSelectedConcernLayerNames,
    ]
  );

  return (
    <div className={styles.header}>
      <div className={styles.logoWrap}>
        <Link href={"/"}>
          <img
            style={{
              display: "inline-block",
              verticalAlign: "middle",
            }}
            alt="UN Open GIS logo"
            src="/Logo_of_the_United_Nations.svg"
            width={110}
            height={50}
          />
        </Link>
      </div>
      <div className={styles.titleWrap}>
        <h3 className={`${inter.className} ${styles.title}`}>
          <Link className="titleText" href={"/"}>
            MUNDO Maps
          </Link>
          {missionName && (
            <>
              <span className="titleText">{" | "}</span>
              <span className="titleText">{missionName}</span>
            </>
          )}
        </h3>
      </div>
      {missionName && (
        <div
          style={{
            whiteSpace: "nowrap",
            paddingLeft: "20px",
            fontFamily: "sans-serif, emoji",
          }}
        >
          🗺{" "}
          <select
            style={{
              height: "1.8em",
              maxWidth: "130px",
              textOverflow: "ellipsis",
              fontSize: "0.8em",
              fontFamily: "sans-serif, emoji",
            }}
            value={mapStyleJsonUrl}
            onChange={onSelectMapStyleJsonUrl}
          >
            <BaseMapStyleOptions />
          </select>
        </div>
      )}
      {missionName &&
        ConcernLayerList.map((concernLayerOption) => {
          return (
            <div
              key={concernLayerOption.layerName}
              id={`${concernLayerOption.layerName}-checkbox-wrap`}
              style={{
                whiteSpace: "nowrap",
                paddingLeft: "15px",
                fontFamily: "sans-serif, emoji",
                color: "rgba(0, 0, 0, 0.9",
              }}
            >
              <input
                id={`${concernLayerOption.layerName}-checkbox`}
                type="checkbox"
                checked={selectedConcernLayerNames.includes(
                  concernLayerOption.layerName
                )}
                value={concernLayerOption.layerName}
                onChange={onCheckConcernLayer}
              />
              <label htmlFor={`${concernLayerOption.layerName}-checkbox`}>
                {" "}
                {concernLayerOption.emoji} {concernLayerOption.displayName}
              </label>
            </div>
          );
        })}
    </div>
  );
};
