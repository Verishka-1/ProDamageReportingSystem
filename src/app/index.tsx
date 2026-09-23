import { AnimatedIcon } from "@/components/animated-icon";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth } from "@/constants/theme";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* =========================
              HEADER
          ========================= */}

          <View style={styles.header}>
            <AnimatedIcon />

            <View style={styles.titleContainer}>
              <ThemedText style={styles.headerText}>UMFixed</ThemedText>

              <ThemedText style={styles.dashboardText}>Dashboard</ThemedText>
            </View>
          </View>

          {/* =========================
              WELCOME
          ========================= */}

          <ThemedView style={styles.welcomeBox}>
            <ThemedText style={styles.welcomeTitle}>
              Welcome to UMFixed
            </ThemedText>

            <ThemedText style={styles.welcomeText}>
              Property Damage Reporting and Monitoring System
            </ThemedText>
          </ThemedView>

          {/* =========================
              OVERVIEW
          ========================= */}

          <ThemedText style={styles.sectionTitle}>Report Overview</ThemedText>

          <View style={styles.statsContainer}>
            {/* TOTAL */}
            <ThemedView style={styles.statCard}>
              <ThemedText style={styles.statIcon}>📋</ThemedText>

              <ThemedText style={styles.statNumber}>0</ThemedText>

              <ThemedText style={styles.statLabel}>Total Reports</ThemedText>
            </ThemedView>

            {/* PENDING */}
            <ThemedView style={styles.statCard}>
              <ThemedText style={styles.statIcon}>⏳</ThemedText>

              <ThemedText style={styles.statNumber}>0</ThemedText>

              <ThemedText style={styles.statLabel}>Pending</ThemedText>
            </ThemedView>

            {/* IN PROGRESS */}
            <ThemedView style={styles.statCard}>
              <ThemedText style={styles.statIcon}>🔧</ThemedText>

              <ThemedText style={styles.statNumber}>0</ThemedText>

              <ThemedText style={styles.statLabel}>In Progress</ThemedText>
            </ThemedView>

            {/* RESOLVED */}
            <ThemedView style={styles.statCard}>
              <ThemedText style={styles.statIcon}>✔️</ThemedText>

              <ThemedText style={styles.statNumber}>0</ThemedText>

              <ThemedText style={styles.statLabel}>Resolved</ThemedText>
            </ThemedView>
          </View>

          {/* =========================
              QUICK ACTION
          ========================= */}

          <ThemedText style={styles.sectionTitle}>Quick Action</ThemedText>

          <TouchableOpacity style={styles.reportButton}>
            <ThemedText style={styles.reportButtonIcon}>📷</ThemedText>

            <View style={styles.reportButtonContent}>
              <ThemedText style={styles.reportButtonTitle}>
                Report Damaged Property
              </ThemedText>

              <ThemedText style={styles.reportButtonDescription}>
                Submit a new property damage report
              </ThemedText>
            </View>

            <ThemedText style={styles.arrow}>→</ThemedText>
          </TouchableOpacity>

          {/* =========================
              RECENT REPORTS
          ========================= */}

          <ThemedText style={styles.sectionTitle}>Recent Reports</ThemedText>

          {/* REPORT 1 */}

          {/* =========================
              SYSTEM INFORMATION
          ========================= */}

          <ThemedView style={styles.infoBox}>
            <ThemedText style={styles.infoTitle}>📍 UMFixed</ThemedText>

            <ThemedText style={styles.infoText}>
              Property damage reports can be submitted with room information,
              campus location, GPS location, and photo evidence.
            </ThemedText>
          </ThemedView>

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
    marginBottom: 20,
    paddingLeft: 1,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  headerText: {
    marginLeft: 20,
    color: "maroon",
    fontSize: 19,
    fontWeight: "600",
  },

  dashboardText: {
    marginLeft: 8,
    fontSize: 11,
    color: "#6b7280",
  },

  // =========================
  // WELCOME
  // =========================

  welcomeBox: {
    width: "100%",
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#800000",
    marginBottom: 22,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
  },

  welcomeText: {
    color: "#FFFFFF",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 20,
  },

  // =========================
  // SECTION
  // =========================

  sectionTitle: {
    color: "#800000",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
    marginLeft: 4,
  },

  // =========================
  // STATISTICS
  // =========================

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  statCard: {
    width: "48%",
    minHeight: 125,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },

  statIcon: {
    fontSize: 22,
    marginBottom: 5,
  },

  statNumber: {
    color: "#800000",
    fontSize: 26,
    fontWeight: "700",
  },

  statLabel: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 3,
  },

  // =========================
  // REPORT BUTTON
  // =========================

  reportButton: {
    width: "100%",
    minHeight: 75,
    borderRadius: 10,
    backgroundColor: "#FFF7F7",
    borderWidth: 1,
    borderColor: "#800000",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  reportButtonIcon: {
    fontSize: 27,
    marginRight: 12,
  },

  reportButtonContent: {
    flex: 1,
  },

  reportButtonTitle: {
    color: "#800000",
    fontSize: 15,
    fontWeight: "700",
  },

  reportButtonDescription: {
    color: "#6B7280",
    fontSize: 11,
    marginTop: 4,
  },

  arrow: {
    color: "#800000",
    fontSize: 24,
    fontWeight: "700",
  },

  // =========================
  // REPORT CARDS
  // =========================

  reportCard: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },

  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  reportRoom: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },

  reportLocation: {
    color: "#800000",
    fontSize: 12,
    marginTop: 5,
  },

  reportDescription: {
    color: "#374151",
    fontSize: 13,
    marginTop: 8,
  },

  reportDate: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 8,
  },

  // =========================
  // STATUS BADGES
  // =========================

  pendingBadge: {
    color: "#B45309",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "700",
  },

  progressBadge: {
    color: "#1D4ED8",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "700",
  },

  resolvedBadge: {
    color: "#15803D",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "700",
  },

  // =========================
  // INFORMATION
  // =========================

  infoBox: {
    width: "100%",
    marginTop: 10,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  infoTitle: {
    color: "#800000",
    fontSize: 15,
    fontWeight: "700",
  },

  infoText: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 7,
  },

  bottomSpacer: {
    height: 50,
  },
});
