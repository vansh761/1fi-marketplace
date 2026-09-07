import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/theme";

/**
 * Home, EMI Dues, Limit, and Profile are out of scope for this assignment
 * (only the Shop -> 1Fi Marketplace flow was asked for). These exist purely
 * so the bottom tab bar matches the real app's navigation shell instead of
 * the Marketplace feeling like a standalone screen with nothing around it.
 */
export function PlaceholderScreen({ label }: { label: string }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>{label}</Text>
        <Text style={styles.sub}>Not part of this assignment</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { ...theme.typography.h2, color: theme.colors.textPrimary },
  sub: { ...theme.typography.body, color: theme.colors.textSecondary, marginTop: 4 },
});
