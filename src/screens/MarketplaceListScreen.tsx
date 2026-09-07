import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/theme";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/SkeletonLoader";
import { ErrorState } from "@/components/ErrorState";

export function MarketplaceListScreen({
  navigation,
  searchQuery = "",
}: {
  navigation: any;
  searchQuery?: string;
}) {
  const { data: products, isLoading, isError, error, refetch, isRefetching } = useProducts();

  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : undefined}
        onRetry={() => refetch()}
      />
    );
  }

  const filtered = (products ?? []).filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  if (filtered.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          {searchQuery ? `No products matching "${searchQuery}".` : "No products available right now."}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.list}
      refreshing={isRefetching}
      onRefresh={refetch}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: theme.spacing.sm, paddingBottom: 100 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: theme.spacing.xl },
  emptyText: { ...theme.typography.body, color: theme.colors.textSecondary },
});
