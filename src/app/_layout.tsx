import {
  DarkTheme,
  DefaultTheme,
  Slot,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { app } from "@/services/firebase"; // <-- ADD THIS LINE

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (u) => {
      // <-- CHANGED getAuth() to getAuth(app)
      setUser(u);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;
    const inAuthScreen = segments[0] === "login" || segments[0] === "signup";
    if (!user && !inAuthScreen) {
      router.replace("/login");
    } else if (user && inAuthScreen) {
      router.replace("/");
    }
  }, [user, initializing, segments]);

  useEffect(() => {
    // Skip push notifications for now — not needed for Expo Go / login testing
    // registerForPushNotificationsAsync();  // <-- keep this commented out for now
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Slot />
    </ThemeProvider>
  );
}
