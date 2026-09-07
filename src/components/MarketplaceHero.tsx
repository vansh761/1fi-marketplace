import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme/theme";

/**
 * Headline copy, the "NO-COST EMIs" badge text, and the subtext below are
 * transcribed verbatim from a screenshot of the real Shop page.
 *
 * The illustration is cropped directly from that same real screenshot
 * (assets/hero-illustration.png), not redrawn — this is the actual in-app
 * artwork, sized down. Because it's sourced from a compressed phone
 * screenshot rather than the original design file, it won't be perfectly
 * crisp at every screen density, but the layout and copy around it are
 * pixel-matched to the real page.
 */
export function MarketplaceHero() {
  return (
    <View style={styles.container}>
      <View style={styles.textCol}>
        <View style={styles.badge}>
          <Ionicons name="sparkles" size={12} color="#fff" />
          <Text style={styles.badgeText}>NO-COST EMIs</Text>
        </View>
        <Text style={styles.headline}>
          Shop today,{"\n"}
          <Text style={styles.headlineItalic}>Pay later using</Text>
          {"\n"}Mutual funds.
        </Text>
        <Text style={styles.subtext}>
          No credit score required. No interest.{"\n"}Backed by your investments.
        </Text>
      </View>

      <Image
        source={require("../../assets/hero-illustration.png")}
        style={styles.illustration}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.heroGradientEnd,
    borderRadius: theme.radius.lg,
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    overflow: "hidden",
    minHeight: 170,
    alignItems: "center",
  },
  textCol: { flex: 1.5, paddingRight: 4, justifyContent: "center" },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: theme.spacing.sm,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  headline: { fontSize: 21, fontWeight: "800", color: "#fff", lineHeight: 26 },
  headlineItalic: { fontStyle: "italic", fontWeight: "700" },
  subtext: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11.5,
    marginTop: theme.spacing.sm,
    lineHeight: 16,
  },
  illustration: {
    width: 130,
    height: 150,
  },
});
