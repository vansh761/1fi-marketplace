import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme/theme";
import { EMIBreakdown, Product } from "@/types";

type Step = "eligibility" | "checking" | "approved";

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/**
 * Mobile number + PAN is how 1Fi's real eligibility check works — it's an
 * instant-approval flow based on identity, not a card/UPI payment form. This
 * modal captures both, validates them client-side, simulates the check
 * (no real backend exists here, per the assignment's scope), and then shows
 * the plan summary as the actual CTA endpoint.
 */
export function ProceedFlowModal({
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
  const [step, setStep] = useState<Step>("eligibility");
  const [mobile, setMobile] = useState("");
  const [pan, setPan] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [panError, setPanError] = useState("");

  function reset() {
    setStep("eligibility");
    setMobile("");
    setPan("");
    setMobileError("");
    setPanError("");
  }

  function handleClose() {
    onClose();
    // Reset after the close animation rather than mid-transition.
    setTimeout(reset, 300);
  }

  function handleCheckEligibility() {
    let valid = true;
    if (!MOBILE_REGEX.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number");
      valid = false;
    } else {
      setMobileError("");
    }
    if (!PAN_REGEX.test(pan.toUpperCase())) {
      setPanError("Enter a valid PAN (e.g. ABCDE1234F)");
      valid = false;
    } else {
      setPanError("");
    }
    if (!valid) return;

    setStep("checking");
    // Simulated eligibility check — no real backend/KYC service exists for
    // this assignment; this delay stands in for that call.
    setTimeout(() => setStep("approved"), 1400);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          {step === "eligibility" && (
            <>
              <View style={styles.iconCircle}>
                <Ionicons name="shield-checkmark" size={26} color="#fff" />
              </View>
              <Text style={styles.title}>Check your eligibility</Text>
              <Text style={styles.subtitle}>
                Enter your details to instantly check if you qualify for this
                EMI plan — no CIBIL impact.
              </Text>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Mobile number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="98765 43210"
                  placeholderTextColor={theme.colors.textSecondary}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={(t) => setMobile(t.replace(/[^0-9]/g, ""))}
                />
                {mobileError ? <Text style={styles.errorText}>{mobileError}</Text> : null}
              </View>

              <View style={styles.field}>
                <Text style={styles.fieldLabel}>PAN number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="ABCDE1234F"
                  placeholderTextColor={theme.colors.textSecondary}
                  autoCapitalize="characters"
                  maxLength={10}
                  value={pan}
                  onChangeText={(t) => setPan(t.toUpperCase())}
                />
                {panError ? <Text style={styles.errorText}>{panError}</Text> : null}
              </View>

              <Pressable style={styles.primaryButton} onPress={handleCheckEligibility}>
                <Text style={styles.primaryButtonText}>Check Eligibility</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={handleClose}>
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </Pressable>
            </>
          )}

          {step === "checking" && (
            <View style={styles.checkingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.title}>Checking eligibility...</Text>
              <Text style={styles.subtitle}>This usually takes a few seconds.</Text>
            </View>
          )}

          {step === "approved" && (
            <>
              <View style={styles.iconCircle}>
                <Ionicons name="checkmark" size={28} color="#fff" />
              </View>
              <Text style={styles.title}>You're eligible!</Text>
              <Text style={styles.subtitle}>
                Next, you'd pledge mutual funds to unlock this purchase — out
                of scope for this assignment, so this summary is the CTA
                endpoint.
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

              <Pressable style={styles.primaryButton} onPress={handleClose}>
                <Text style={styles.primaryButtonText}>Got it</Text>
              </Pressable>
            </>
          )}
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
  title: { ...theme.typography.h1, color: theme.colors.textPrimary, textAlign: "center" },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: theme.spacing.md,
  },
  field: { width: "100%", marginBottom: theme.spacing.sm },
  fieldLabel: {
    ...theme.typography.caption,
    fontWeight: "700",
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.background,
  },
  errorText: { ...theme.typography.caption, color: theme.colors.error, marginTop: 4 },
  checkingContainer: { alignItems: "center", paddingVertical: theme.spacing.lg, gap: theme.spacing.sm },
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
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    marginTop: theme.spacing.md,
    width: "100%",
    alignItems: "center",
  },
  primaryButtonText: { ...theme.typography.button, color: "#fff" },
  secondaryButton: { marginTop: theme.spacing.sm, paddingVertical: 6 },
  secondaryButtonText: { ...theme.typography.body, color: theme.colors.textSecondary },
});
