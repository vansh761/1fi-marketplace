import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/theme";
import { EMIBreakdown } from "@/types";

export function EMIPlanCard({
  breakdown,
  selected,
  onSelect,
}: {
  breakdown: EMIBreakdown;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable
      onPress={onSelect}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <View style={styles.info}>
        <View style={styles.tenureRow}>
          <Text style={styles.tenure}>{breakdown.tenureMonths} months</Text>
          {breakdown.interestAmount === 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>No-cost EMI</Text>
            </View>
          )}
        </View>
        <Text style={styles.monthly}>₹{breakdown.monthlyAmount.toLocaleString("en-IN")}/mo</Text>
      </View>
      <View style={styles.totalCol}>
        <Text style={styles.totalLabel}>Total payable</Text>
        <Text style={styles.totalValue}>₹{breakdown.totalPayable.toLocaleString("en-IN")}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.sm,
  },
  cardSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  info: { flex: 1 },
  tenureRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  badge: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.radius.pill,
  },
  badgeText: { fontSize: 10, fontWeight: "700", color: "#fff" },
  tenure: { ...theme.typography.body, fontWeight: "600", color: theme.colors.textPrimary },
  monthly: { ...theme.typography.caption, color: theme.colors.textSecondary, marginTop: 2 },
  totalCol: { alignItems: "flex-end" },
  totalLabel: { ...theme.typography.caption, color: theme.colors.textSecondary },
  totalValue: { ...theme.typography.body, fontWeight: "600", color: theme.colors.textPrimary },
});
