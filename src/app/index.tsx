import * as Device from "expo-device";
import * as Location from "expo-location";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useState } from "react";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [building, setBuilding] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [locationText, setLocationText] = useState("No location detected");

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />

          <ThemedText type="title" style={styles.headerText}>
            UMFixed
          </ThemedText>
          <ThemedText type="title" style={styles.reportText}>
            Dashboard
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: "flex-start",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 0,
    paddingTop: 0,
    gap: 8,
  },
  title: {
    marginLeft: 0,
    textAlign: "left",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.four,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.five,
  },
  headerText: {
    marginLeft: 20,
    textAlign: "left",
    color: "maroon",
    fontSize: 19,
  },
  reportText: {
    fontSize: 11,
    color: "#6b7280",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "maroon",
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  gpsBadge: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },

  gpsText: {
    fontSize: 9,
    color: "#315ddf",
    fontWeight: "600",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    height: 42,
    backgroundColor: "#f0f2fb",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  inputText: {
    fontSize: 12,
    color: "#111827",
    marginLeft: 8,
    flex: 1,
  },

  containercb: {
    padding: 20,
  },

  labelcb: {
    fontSize: 18,
    marginBottom: 10,
  },

  comboBox: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
  },

  result: {
    marginTop: 20,
    fontSize: 18,
  },

  picker: {
    height: 100,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    justifyContent: "center",
  },
});
