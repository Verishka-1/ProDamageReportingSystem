
import {
  View,
  StyleSheet,
  useColorScheme,
  type ViewProps,
} from "react-native";

import { Colors } from "@/constants/theme";

export function ThemedView({ style, ...rest }: ViewProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];

  return (
    <View
      style={[
        { backgroundColor: colors.background },
        styles.container,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 0,
  },
});