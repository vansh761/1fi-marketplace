import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { theme } from "@/theme/theme";
import { useProduct } from "@/hooks/useProduct";
import { calculateEMI } from "@/services/api";
import { PriceTag } from "@/components/PriceTag";
import { EMIPlanCard } from "@/components/EMIPlanCard";
import { ErrorState } from "@/components/ErrorState";
import { ProceedFlowModal } from "@/components/ProceedFlowModal";
import { ActivityIndicator } from "react-native";

export function ProductDetailScreen({ route, navigation }: any) {
  const { productId } = route.params;
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Reset selections once the product loads, defaulting to the first
  // in-stock variant and the shortest EMI tenure.
  React.useEffect(() => {
    if (product) {
      const firstInStockVariant = product.variants.find((v) => v.inStock) ?? product.variants[0];
      setSelectedVariantId(firstInStockVariant?.id ?? null);
      setSelectedPlanId(product.emiPlans[0]?.id ?? null);
    }
  }, [product]);

  const selectedVariant = product?.variants.find((v) => v.id === selectedVariantId);
  const finalPrice = product ? product.basePrice + (selectedVariant?.priceDelta ?? 0) : 0;

  const emiBreakdowns = useMemo(() => {
    if (!product) return [];
    return product.emiPlans.map((plan) => calculateEMI(finalPrice, plan));
  }, [product, finalPrice]);

  const selectedBreakdown = emiBreakdowns.find((b) => b.planId === selectedPlanId);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView style={styles.center}>
        <ErrorState
          message={error instanceof Error ? error.message : undefined}
          onRetry={() => refetch()}
        />
      </SafeAreaView>
    );
  }

  const canProceed = Boolean(selectedVariant?.inStock && selectedBreakdown);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />

        <View style={styles.section}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>★ {product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
          </View>
          <PriceTag amount={finalPrice} size="lg" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Variants</Text>
          <View style={styles.variantRow}>
            {product.variants.map((variant) => {
              const active = variant.id === selectedVariantId;
              return (
                <Pressable
                  key={variant.id}
                  disabled={!variant.inStock}
                  onPress={() => setSelectedVariantId(variant.id)}
                  style={[
                    styles.variantChip,
                    active && styles.variantChipActive,
                    !variant.inStock && styles.variantChipDisabled,
                  ]}
                >
                  <Text style={[styles.variantText, active && styles.variantTextActive]}>
                    {variant.label}
                    {!variant.inStock ? " (Out of stock)" : ""}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product details</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose an EMI plan</Text>
          {emiBreakdowns.map((breakdown) => (
            <EMIPlanCard
              key={breakdown.planId}
              breakdown={breakdown}
              selected={breakdown.planId === selectedPlanId}
              onSelect={() => setSelectedPlanId(breakdown.planId)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>
            {canProceed ? "Pay monthly" : "Unavailable"}
          </Text>
          <Text style={styles.footerAmount}>
            {canProceed ? `₹${selectedBreakdown!.monthlyAmount.toLocaleString("en-IN")}/mo` : "—"}
          </Text>
        </View>
        <Pressable
          disabled={!canProceed}
          style={[styles.cta, !canProceed && styles.ctaDisabled]}
          onPress={() => setShowConfirmation(true)}
        >
          <Text style={styles.ctaText}>Proceed</Text>
        </Pressable>
      </View>

      {canProceed && selectedBreakdown && (
        <ProceedFlowModal
          visible={showConfirmation}
          product={product}
          variantLabel={selectedVariant!.label}
          breakdown={selectedBreakdown}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  scrollContent: { paddingBottom: theme.spacing.xl },
  image: { width: "100%", aspectRatio: 1, backgroundColor: theme.colors.primaryLight },
  section: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  },
  brand: { ...theme.typography.caption, color: theme.colors.textSecondary },
  name: { ...theme.typography.h1, color: theme.colors.textPrimary, marginTop: 2 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginVertical: 6, gap: 6 },
  rating: { ...theme.typography.body, color: theme.colors.accent, fontWeight: "700" },
  reviewCount: { ...theme.typography.caption, color: theme.colors.textSecondary },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  variantRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  variantChip: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: theme.colors.surface,
  },
  variantChipActive: { borderColor: theme.colors.primary, backgroundColor: theme.colors.primaryLight },
  variantChipDisabled: { opacity: 0.4 },
  variantText: { ...theme.typography.caption, color: theme.colors.textPrimary },
  variantTextActive: { color: theme.colors.primary, fontWeight: "700" },
  description: { ...theme.typography.body, color: theme.colors.textSecondary, lineHeight: 20 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.md + 70, // clears the floating tab bar
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  footerLabel: { ...theme.typography.caption, color: theme.colors.textSecondary },
  footerAmount: { ...theme.typography.h2, color: theme.colors.textPrimary },
  cta: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.pill,
  },
  ctaDisabled: { backgroundColor: theme.colors.disabled },
  ctaText: { ...theme.typography.button, color: "#fff" },
});
