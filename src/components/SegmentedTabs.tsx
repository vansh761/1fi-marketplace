import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/theme/theme";

export function SegmentedTabs({
  options,
  selectedIndex,
  onChange,
}: {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}) {
  // Real app shows 2 tabs at a comfortable size; we support a 3rd
  // ("1Fi Marketplace") by shrinking the label size slightly rather than
  // truncating it, since the exact wording is part of the assignment spec.
  const compact = options.length > 2;

  return (
    <View style={styles.container}>
      {options.map((label, index) => {
        const active = index === selectedIndex;
        return (
          <Pressable
            key={label}
            style={[styles.tab, active && styles.tabActive]}
            onPress={() => onChange(index)}
          >
            <Text
              style={[
                styles.label,
                compact && styles.labelCompact,
                active && styles.labelActive,
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
            {active && <View style={styles.underline} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.primaryLight,
    borderRadius: theme.radius.pill,
    padding: 4,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: theme.colors.surface,
    ...theme.shadow.card,
  },
  label: { ...theme.typography.body, fontWeight: "700", color: theme.colors.textSecondary },
  labelCompact: { fontSize: 12 },
  labelActive: { color: theme.colors.primary },
  underline: {
    marginTop: 3,
    width: 22,
    height: 2,
    borderRadius: 1,
    backgroundColor: theme.colors.primary,
  },
});
