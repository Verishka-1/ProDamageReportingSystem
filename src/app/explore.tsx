import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth } from "@/constants/theme";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// =========================
// NOTIFICATION CONFIGURATION
// =========================

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function ReportScreen() {
  // =========================
  // STATE
  // =========================

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [room, setRoom] = useState("");
  const [campus, setCampus] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [locationText, setLocationText] = useState("No location detected");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // REQUEST NOTIFICATION PERMISSION
  // =========================

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        // Android notification channel
        await Notifications.setNotificationChannelAsync("default", {
          name: "UMFixed Notifications",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#800000",
          sound: "default",
        });

        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();

          if (status !== "granted") {
            console.log("Notification permission was denied.");
          }
        }
      } catch (error) {
        console.error("Notification permission error:", error);
      }
    };

    requestNotificationPermission();
  }, []);

  // =========================
  // SEND LOCAL NOTIFICATION
  // =========================

  const sendReportNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🔧 UMFixed",
          body: `Your damage report for ${room}, ${campus} Campus was submitted successfully.`,
          sound: "default",
        },
        trigger: null,
      });
    } catch (error) {
      console.error("Notification error:", error);
    }
  };

  // =========================
  // GET GPS LOCATION
  // =========================

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationText("Location permission denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);

      setLocationText(
        `${room || "Room not selected"}, ${
          campus || "Campus not selected"
        } Campus, University of Mindanao`,
      );
    } catch (error) {
      console.error(error);
      setLocationText("Unable to get location");
    }
  };

  // =========================
  // TAKE PHOTO
  // =========================

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      setMessage("Camera permission denied.");
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
      setMessage("");
    }
  };

  // =========================
  // SUBMIT REPORT
  // =========================

  const submitReport = async () => {
    setMessage("");

    // Validate room
    if (!room) {
      setMessage("Please select a room.");
      return;
    }

    // Validate campus
    if (!campus) {
      setMessage("Please select a campus.");
      return;
    }

    // Validate GPS
    if (!location) {
      setMessage("Please get your current location first.");
      return;
    }

    // Validate photo
    if (!photo) {
      setMessage("Please take a photo of the damaged property.");
      return;
    }

    try {
      setSubmitting(true);

      // Simulate submitting
      // No API / database is used
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success message
      setMessage("✓ Report submitted successfully!");

      // 🔔 SEND LOCAL NOTIFICATION
      await sendReportNotification();

      // Clear form
      setPhoto(null);
      setLocation(null);
      setLocationText("No location detected");
      setRoom("");
      setCampus("");
    } catch (error) {
      console.error("Submit report error:", error);

      setMessage("Failed to submit report.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* =========================
              HEADER
          ========================= */}

          <View style={styles.header}>
            <AnimatedIcon />

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
              onValueChange={(itemValue) => {
                setRoom(itemValue);

                if (location) {
                  setLocationText(
                    `${itemValue}, ${
                      campus || "Campus"
                    } Campus, University of Mindanao`,
                  );
                }
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select Room" value="" />

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
              onValueChange={(itemValue) => {
                setCampus(itemValue);

                if (location) {
                  setLocationText(
                    `${room || "Room"}, ${
                      itemValue || "Campus"
                    } Campus, University of Mindanao`,
                  );
                }
              }}
              style={styles.picker}
            >
              <Picker.Item label="Select Campus" value="" />

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
              GET LOCATION
          ========================= */}

          <TouchableOpacity style={styles.gpsButton} onPress={getLocation}>
            <ThemedText style={styles.buttonText}>
              📍 Get Current Location
            </ThemedText>
          </TouchableOpacity>

          {/* =========================
              PHOTO
          ========================= */}

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

            <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
              <ThemedText style={styles.cameraButtonText}>
                📷 {photo ? "Retake Photo" : "Take Photo"}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {/* =========================
              SUBMIT REPORT
          ========================= */}

          <TouchableOpacity
            style={[
              styles.submitButton,
              submitting && styles.submitButtonDisabled,
            ]}
            onPress={submitReport}
            disabled={submitting}
          >
            <ThemedText style={styles.submitButtonText}>
              {submitting ? "Submitting..." : "Submit Report"}
            </ThemedText>
          </TouchableOpacity>

          {/* =========================
              MESSAGE
          ========================= */}

          {message !== "" && (
            <ThemedText
              style={[
                styles.message,
                message.startsWith("✓")
                  ? styles.successMessage
                  : styles.errorMessage,
              ]}
            >
              {message}
            </ThemedText>
          )}

          {/* =========================
              BOTTOM SPACING
          ========================= */}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

// =========================
// STYLES
// =========================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 29,
    paddingTop: 25,
    paddingBottom: BottomTabInset + 40,
    maxWidth: MaxContentWidth,
    width: "100%",
    alignSelf: "center",
  },

  // =========================
  // HEADER
  // =========================

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

  // =========================
  // SECTION
  // =========================

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

  // =========================
  // LABEL
  // =========================

  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
  },

  // =========================
  // PICKER
  // =========================

  input: {
    minHeight: 50,
    backgroundColor: "#f0f2fb",
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  picker: {
    height: 55,
    width: "100%",
  },

  // =========================
  // GPS
  // =========================

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

  // =========================
  // GPS BUTTON
  // =========================

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

  // =========================
  // PHOTO
  // =========================

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

  // =========================
  // SUBMIT
  // =========================

  submitButton: {
    width: "100%",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#15803D",
    alignItems: "center",
  },

  submitButtonDisabled: {
    backgroundColor: "#9CA3AF",
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  // =========================
  // MESSAGE
  // =========================

  message: {
    width: "100%",
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
  },

  successMessage: {
    color: "#15803D",
  },

  errorMessage: {
    color: "#B91C1C",
  },

  // =========================
  // BOTTOM SPACING
  // =========================

  bottomSpacer: {
    height: 50,
  },
});
