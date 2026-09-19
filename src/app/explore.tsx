import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportScreen() {
  // GPS location
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  // Selected room
  const [room, setRoom] = useState("");

  // Selected campus
  const [campus, setCampus] = useState("");

  const [photo, setPhoto] = useState<string | null>(null);

  // Location text shown to user
  const [locationText, setLocationText] = useState("No location detected");

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocationText("Location permission denied");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    // Save actual GPS location
    setLocation(currentLocation);

    // Show readable location instead of latitude/longitude
    setLocationText(`${room}, ${campus} Campus, University of Mindanao`);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          {/* LOGO */}
          <AnimatedIcon />

          {/* TITLE */}
          <View style={styles.titleContainer}>
            <ThemedText style={styles.headerText}>UMFixed</ThemedText>

            <ThemedText style={styles.reportText}>Report</ThemedText>
          </View>
        </View>

        {/* =========================
            FACILITY & LOCATION
        ========================= */}

        <ThemedView style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>
            Facility & Location
          </ThemedText>
        </ThemedView>

        {/* =========================
            SELECT ROOM
        ========================= */}

        <ThemedText style={styles.label}>Select Room:</ThemedText>

        <ThemedView style={styles.input}>
          <Picker
            selectedValue={room}
            onValueChange={(itemValue) => setRoom(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Room 101" value="Room 101" />
            <Picker.Item label="Room 102" value="Room 102" />
            <Picker.Item label="Room 103" value="Room 103" />
            <Picker.Item label="Room 104" value="Room 104" />
            <Picker.Item label="Room 105" value="Room 105" />
            <Picker.Item label="Room 106" value="Room 106" />
            <Picker.Item label="Room 201" value="Room 201" />
          </Picker>
        </ThemedView>

        {/* =========================
            SELECT CAMPUS
        ========================= */}

        <ThemedText style={styles.label}>Select Campus:</ThemedText>

        <ThemedView style={styles.input}>
          <Picker
            selectedValue={campus}
            onValueChange={(itemValue) => setCampus(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Visayan Campus" value="Visayan" />
            <Picker.Item label="Mabini Campus" value="Mabini" />
          </Picker>
        </ThemedView>

        {/* =========================
            GPS LOCATION
        ========================= */}

        <ThemedView style={styles.gpsBox}>
          <ThemedText style={styles.gpsTitle}>📍 GPS Location</ThemedText>

          <ThemedText style={styles.locationText}>{locationText}</ThemedText>

          {location && (
            <ThemedText style={styles.validated}>
              ✓ GPS Location Validated
            </ThemedText>
          )}
        </ThemedView>

        {/* =========================
            GET LOCATION BUTTON
        ========================= */}

        <TouchableOpacity style={styles.gpsButton} onPress={getLocation}>
          <ThemedText style={styles.buttonText}>
            📍 Get Current Location
          </ThemedText>
        </TouchableOpacity>

        <ThemedView style={styles.photoBox}>
          <ThemedText style={styles.photoTitle}>
            📷 Report Damaged Property
          </ThemedText>
          <ThemedText style={styles.photoDescription}>
            Take a photo of the damaged school property.
          </ThemedText>

          {photo && (
            <Image source={{ uri: photo }} style={styles.photoPreview} />
          )}

          {/* Camera Button */}

          <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
            <ThemedText style={styles.cameraButtonText}>
              📷 {photo ? "Retake Photo" : "Take Photo"}
            </ThemedText>
          </TouchableOpacity>
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
    paddingHorizontal: 29,
    paddingTop: 25,
    alignItems: "flex-start",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },

  /* =========================
     HEADER
     ========================= */

  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    paddingLeft: 1,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    justifyContent: "center",
  },

  headerText: {
    marginLeft: 20,
    textAlign: "left",
    color: "maroon",
    fontSize: 19,
  },

  reportText: {
    marginLeft: 8,
    fontSize: 11,
    color: "#6b7280",
  },

  /* =========================
     SECTION
     ========================= */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "maroon",
    marginLeft: 8,
  },

  /* =========================
     LABEL
     ========================= */

  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },

  /* =========================
     PICKER
     ========================= */

  input: {
    height: 42,
    backgroundColor: "#f0f2fb",
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  picker: {
    height: 100,
    width: "100%",
  },

  /* =========================
     GPS
     ========================= */

  gpsBox: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#800000",
    borderRadius: 10,
    backgroundColor: "#FFF7F7",
  },

  gpsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#800000",
  },

  locationText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
  },

  validated: {
    marginTop: 10,
    color: "#15803D",
    fontWeight: "bold",
  },

  /* =========================
     BUTTON
     ========================= */

  gpsButton: {
    width: "100%",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#800000",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  /* =========================
     CAMERA
     ========================= */

  photoBox: {
    width: "100%",
    marginTop: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  photoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#800000",
  },
  photoDescription: {
    marginTop: 5,
    marginBottom: 12,
    fontSize: 12,
    color: "#6b7280",
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  cameraButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: "#800000",
    alignItems: "center",
  },
  cameraButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});
