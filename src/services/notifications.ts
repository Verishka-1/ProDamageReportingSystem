

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

// Display notifications while the app is running
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Register for remote push notifications
export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    console.log("Use a physical device for push notifications.");
    return null;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Notification permission not granted.");
    return null;
  }

  await Notifications.setNotificationChannelAsync("default", {
    name: "Property Damage Updates",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    sound: "default",
  });

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  if (!projectId) {
    throw new Error(
      "Missing Expo projectId. EAS setup is required."
    );
  }

  const tokenResult =
    await Notifications.getExpoPushTokenAsync({
      projectId,
    });

  console.log("Expo Push Token:", tokenResult.data);

  return tokenResult.data;
}

// Local test notification
export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Property Damage Reporting",
      body: "Notifications are working on your device!",
      sound: "default",
    },
    trigger: null,
  });
}

// Local notification after report submission
export async function notifyReportSubmitted() {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Notification permission not granted.");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Report Submitted Successfully!",
      body: "Your property damage report has been submitted.",
      sound: "default",
    },
    trigger: null,
  });
}