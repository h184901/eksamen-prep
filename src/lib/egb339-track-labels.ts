import type { Egb339Track } from "./egb339-vault/types";

/** Track id → ui.ts key for the section heading label. */
export const EGB339_TRACK_LABEL_KEY: Record<Egb339Track, "trackFoundations" | "trackKinematics" | "trackMotion" | "trackVision"> = {
  foundations: "trackFoundations",
  kinematics: "trackKinematics",
  motion: "trackMotion",
  vision: "trackVision",
};

/** Track id → ui.ts key for the section description. */
export const EGB339_TRACK_DESC_KEY: Record<Egb339Track, "trackFoundationsDesc" | "trackKinematicsDesc" | "trackMotionDesc" | "trackVisionDesc"> = {
  foundations: "trackFoundationsDesc",
  kinematics: "trackKinematicsDesc",
  motion: "trackMotionDesc",
  vision: "trackVisionDesc",
};
