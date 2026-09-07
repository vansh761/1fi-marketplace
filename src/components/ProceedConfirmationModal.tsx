import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme/theme";
import { EMIBreakdown, Product } from "@/types";

export function ProceedConfirmationModal({
  visible,
  product,
  variantLabel,
  breakdown,
  onClose,
}: {
  visible: boolean;
  product: Product;
  variantLabel: string;
  breakdown: EMIBreakdown;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={28} color="#fff" />
          </View>

          <Text style={styles.title}>Plan selected</Text>
          <Text style={styles.subtitle}>
            You're one step away from checking eligibility for this purchase.
          </Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Product</Text>
              <Text style={styles.summaryValue} numberOfLines={1}>
                {product.name}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Variant</Text>
              <Text style={styles.summaryValue} numberOfLines={1}>
                {variantLabel}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tenure</Text>
              <Text style={styles.summaryValue}>{breakdown.tenureMonths} months</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Monthly payment</Text>
              <Text style={styles.summaryValueStrong}>
                ₹{breakdown.monthlyAmount.toLocaleString("en-IN")}/mo
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total payable</Text>
              <Text style={styles.summaryValue}>
                ₹{breakdown.totalPayable.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>

          <Text style={styles.note}>
            In the live 1Fi app, this step would check your eligibility and
            let you pledge mutual funds to unlock this purchase — out of
            scope for this assignment, so this screen stands in as the CTA
            endpoint.
          </Text>

          <Pressable style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(17,24,39,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: "center",
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  title: { ...theme.typography.h1, color: theme.colors.textPrimary },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: theme.spacing.md,
  },
  summaryCard: {
    width: "100%",
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    gap: 8,
  },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLabel: { ...theme.typography.caption, color: theme.colors.textSecondary },
  summaryValue: { ...theme.typography.body, color: theme.colors.textPrimary, fontWeight: "600" },
  summaryValueStrong: { ...theme.typography.body, color: theme.colors.primary, fontWeight: "700" },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 4 },
  note: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: theme.spacing.md,
    lineHeight: 16,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.lg,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: { ...theme.typography.button, color: "#fff" },
});
