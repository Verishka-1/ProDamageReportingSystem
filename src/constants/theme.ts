
import { Platform } from "react-native";

export type ThemeColor =
  | "text"
  | "background"
  | "backgroundElement"
  | "tint"
  | "icon"
  | "border";

export const Colors = {
  light: {
    text: "#222222",
    background: "#ffffff",
    backgroundElement: "#f0f2f5",
    tint: "#800000",
    icon: "#687076",
    border: "#d1d5db",
  },
  dark: {
    text: "#f5f5f5",
    background: "#151515",
    backgroundElement: "#292929",
    tint: "#e6a0a0",
    icon: "#9ba1a6",
    border: "#444444",
  },
};

export const Fonts = {
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  })!,
};

export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 24,
};

export const BottomTabInset = 80;
export const MaxContentWidth = 600;