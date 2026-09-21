import { router } from "expo-router";
import * as Device from "expo-device";
import * as Location from "expo-location";
import { useState } from "react";

import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AnimatedIcon } from "../components/animated-icon";
import { ThemedText } from "../components/themed-text";
import { sendTestNotification } from "../services/notifications";

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

  const shortcut =
    Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";

  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [building, setBuilding] = useState("");
  const [location, setLocation] =
    useState<Location.LocationObject | null>(null);
  const [locationText, setLocationText] =
    useState("No location detected");
  const [loading, setLoading] = useState(false);

  const handleTestNotification = async () => {
    try {
      setLoading(true);
      await sendTestNotification();

      Alert.alert(
        "Success",
        "Test notification scheduled!"
      );
    } catch (error) {
      console.error("Notification error:", error);
      Alert.alert(
        "Error",
        "Could not schedule notification."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.heroSection}>
          <AnimatedIcon />

          <ThemedText type="title" style={styles.headerText}>
            UMFixed
          </ThemedText>

          <ThemedText type="title" style={styles.reportText}>
            Dashboard
          </ThemedText>
        </View>

        <View style={styles.notificationSection}>
          <ThemedText type="default">
            Property Damage Reporting and Monitoring System
          </ThemedText>

          <Pressable
            style={[
              styles.notificationButton,
              loading && styles.disabledButton,
            ]}
            onPress={handleTestNotification}
            disabled={loading}
          >
            <Text style={styles.notificationButtonText}>
              {loading ? "Please wait..." : "Test Notification"}
            </Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: "#173b73",
            padding: 18,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 15,
  }}
  onPress={() => router.push("/explore")}
>
  <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}>
    Report Property Damage
  </Text>
</Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f4f5f9",
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    alignItems: "flex-start",
    gap: 12,
    paddingBottom: 20,
    maxWidth: 600,
  },

  heroSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 0,
    paddingTop: 0,
    gap: 8,
    flexWrap: "wrap",
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

  notificationSection: {
    width: "100%",
    marginTop: 25,
    gap: 16,
  },

  notificationButton: {
    backgroundColor: "maroon",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },

  disabledButton: {
    opacity: 0.6,
  },
});