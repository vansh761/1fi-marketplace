import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/theme";
import { Product } from "@/types";
import { PriceTag } from "./PriceTag";

export function ProductCard({
  product,
  onPress,
}: {
  product: Product;
  onPress: () => void;
}) {
  const maxTenure = Math.max(...product.emiPlans.map((p) => p.tenureMonths));

  return (
    <Pressable
      onPress={onPress}
      disabled={!product.inStock}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        !product.inStock && styles.disabledCard,
      ]}
    >
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <PriceTag amount={product.basePrice} size="md" />
        {product.inStock ? (
          <Text style={styles.emiHint}>No-cost EMIs upto {maxTenure} months</Text>
        ) : (
          <Text style={styles.outOfStock}>Out of stock</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    margin: theme.spacing.xs,
    ...theme.shadow.card,
  },
  pressed: { opacity: 0.85 },
  disabledCard: { opacity: 0.55 },
  image: { width: "100%", aspectRatio: 1, backgroundColor: theme.colors.primaryLight },
  body: { padding: theme.spacing.sm, gap: 4 },
  brand: { ...theme.typography.caption, color: theme.colors.textSecondary },
  name: { ...theme.typography.body, fontWeight: "700", color: theme.colors.textPrimary },
  emiHint: { ...theme.typography.caption, color: theme.colors.textSecondary, marginTop: 2 },
  outOfStock: { ...theme.typography.caption, color: theme.colors.error, marginTop: 2 },
});
