import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { theme } from "@/theme/theme";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "home",
  Shop: "storefront",
  EMIDues: "receipt",
  Limit: "trending-up",
  Profile: "person",
};

const LABELS: Record<string, string> = {
  Home: "Home",
  Shop: "Shop",
  EMIDues: "EMI Dues",
  Limit: "Limit",
  Profile: "Profile",
};

export function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const active = state.index === index;
          const iconName = ICONS[route.name] ?? "ellipse";

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tab}
            >
              {active && <View style={styles.activeBar} />}
              <Ionicons
                name={active ? iconName : (`${iconName}-outline` as keyof typeof Ionicons.glyphMap)}
                size={22}
                color={active ? theme.colors.primary : theme.colors.textSecondary}
              />
              <Text style={[styles.label, active && styles.labelActive]}>
                {LABELS[route.name] ?? route.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: theme.spacing.md,
    right: theme.spacing.md,
    bottom: theme.spacing.md,
  },
  bar: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingVertical: 10,
    ...theme.shadow.card,
  },
  tab: { flex: 1, alignItems: "center", gap: 2 },
  activeBar: {
    position: "absolute",
    top: -10,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: theme.colors.primary,
  },
  label: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 2 },
  labelActive: { color: theme.colors.primary, fontWeight: "700" },
});
