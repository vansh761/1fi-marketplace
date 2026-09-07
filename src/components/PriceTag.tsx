import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/theme";

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function PriceTag({
  amount,
  size = "md",
  strikethroughAmount,
}: {
  amount: number;
  size?: "sm" | "md" | "lg";
  strikethroughAmount?: number;
}) {
  const fontSize = size === "lg" ? 22 : size === "md" ? 17 : 14;

  return (
    <View style={styles.row}>
      <Text style={[styles.price, { fontSize }]}>{formatINR(amount)}</Text>
      {strikethroughAmount && strikethroughAmount > amount ? (
        <Text style={styles.strike}>{formatINR(strikethroughAmount)}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  price: { fontWeight: "700", color: theme.colors.textPrimary },
  strike: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textDecorationLine: "line-through",
  },
});
