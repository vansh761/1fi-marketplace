import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/theme";
import { MarketplaceHero } from "@/components/MarketplaceHero";
import { SegmentedTabs } from "@/components/SegmentedTabs";
import { SearchBar } from "@/components/SearchBar";
import { MarketplaceListScreen } from "./MarketplaceListScreen";

// Order and exact labels match the real Shop page, with "1Fi Marketplace"
// added as the new 3rd option per the assignment spec — the live app
// currently only has the first two.
const TABS = ["Top Brands", "Nearby Stores", "1Fi Marketplace"];
const SEARCH_PLACEHOLDERS = ["Search online stores...", "Search stores...", "Search products..."];
const SECTION_TITLES = ["Top Brands", "Nearby Stores", "1Fi Marketplace"];

function BlankPlaceholder({ label }: { label: string }) {
  // Intentionally blank per assignment spec — "No implementation required".
  // (The real app fully populates this tab; we deliberately don't clone it.)
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{label}</Text>
      <Text style={styles.placeholderSub}>Coming soon</Text>
    </View>
  );
}

export function ShopScreen({ navigation }: any) {
  const [tabIndex, setTabIndex] = useState(2); // default to Marketplace for the demo
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <MarketplaceHero />
      <SegmentedTabs options={TABS} selectedIndex={tabIndex} onChange={setTabIndex} />
      <SearchBar
        placeholder={SEARCH_PLACEHOLDERS[tabIndex]}
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{SECTION_TITLES[tabIndex]}</Text>
      </View>
      <View style={styles.content}>
        {tabIndex === 0 && <BlankPlaceholder label="Top Brands" />}
        {tabIndex === 1 && <BlankPlaceholder label="Nearby Stores" />}
        {tabIndex === 2 && (
          <MarketplaceListScreen navigation={navigation} searchQuery={search} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1 },
  sectionHeader: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  sectionTitle: { ...theme.typography.h2, color: theme.colors.textPrimary },
  placeholder: { flex: 1, alignItems: "center", justifyContent: "center" },
  placeholderText: { ...theme.typography.h2, color: theme.colors.textPrimary },
  placeholderSub: { ...theme.typography.body, color: theme.colors.textSecondary, marginTop: 4 },
});
