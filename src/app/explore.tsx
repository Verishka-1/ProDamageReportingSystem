
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

import { notifyReportSubmitted } from "../services/notifications";

const campuses = ["UM Visayan (Tagum)"];

const rooms = [
  "Classroom",
  "Laboratory",
  "Library",
  "Office",
  "Hallway",
  "Comfort Room",
  "Other",
];

export default function ExploreScreen() {
  const [campus, setCampus] = useState("UM Visayan (Tagum)");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [locationText, setLocationText] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const getCurrentLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow location access to get your current location."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocationText(
        `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`
      );
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Unable to get your location.");
    }
  };

  const takePhoto = async () => {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permission.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow camera access to take a photo."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Unable to open the camera.");
    }
  };

  const handleSubmitReport = async () => {
    if (!campus || !room || !description.trim()) {
      Alert.alert(
        "Missing Information",
        "Please select a campus and room, and enter a description."
      );
      return;
    }

    setSubmitting(true);

    try {
      // This currently demonstrates local notification only.
      // Add actual report-saving code here when your backend is ready.
      await notifyReportSubmitted();

      Alert.alert(
        "Success",
        "Your report submission was simulated and a local notification was requested."
      );

      setCampus("");
      setRoom("");
      setDescription("");
      setLocationText("");
      setPhotoUri(null);
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert(
        "Error",
        "Could not complete the submission notification."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Report Property Damage</Text>
        <Text style={styles.subtitle}>
          Report damaged facilities around the campus.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Campus</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={campus}
              onValueChange={setCampus}
            >
              <Picker.Item
                label="Select Campus"
                value=""
              />
              {campuses.map((item) => (
                <Picker.Item
                  key={item}
                  label={item}
                  value={item}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Room / Location</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={room}
              onValueChange={setRoom}
            >
              <Picker.Item
                label="Select Room"
                value=""
              />
              {rooms.map((item) => (
                <Picker.Item
                  key={item}
                  label={item}
                  value={item}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>GPS Location</Text>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={getCurrentLocation}
          >
            <Text style={styles.secondaryButtonText}>
              Get Current Location
            </Text>
          </TouchableOpacity>

          {locationText ? (
            <Text style={styles.locationText}>
              Coordinates: {locationText}
            </Text>
          ) : null}

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Describe the property damage..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Photo Evidence</Text>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={takePhoto}
          >
            <Text style={styles.secondaryButtonText}>
              Take Photo
            </Text>
          </TouchableOpacity>

          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={styles.photo}
              resizeMode="cover"
            />
          ) : null}

          <TouchableOpacity
            style={[
              styles.submitButton,
              submitting && styles.disabledButton,
            ]}
            onPress={handleSubmitReport}
            disabled={submitting}
          >
            <Text style={styles.submitButtonText}>
              {submitting ? "Submitting..." : "Submit Report"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6fa",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#14213d",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#667085",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#263238",
    marginTop: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 10,
    overflow: "hidden",
  },
  secondaryButton: {
    backgroundColor: "#e8eef8",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#173b73",
    fontWeight: "600",
  },
  locationText: {
    marginTop: 8,
    color: "#475467",
    fontSize: 13,
  },
  textInput: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#d0d5dd",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#222",
  },
  photo: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginTop: 12,
  },
  submitButton: {
    backgroundColor: "#173b73",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
});