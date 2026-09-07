import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShopScreen } from "@/screens/ShopScreen";
import { ProductDetailScreen } from "@/screens/ProductDetailScreen";
import { PlaceholderScreen } from "@/screens/PlaceholderScreen";
import { FloatingTabBar } from "./FloatingTabBar";
import { theme } from "@/theme/theme";

export type ShopStackParamList = {
  ShopHome: undefined;
  ProductDetail: { productId: string };
};

const ShopStack = createNativeStackNavigator<ShopStackParamList>();

function ShopStackNavigator() {
  return (
    <ShopStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.textPrimary,
        headerShadowVisible: false,
      }}
    >
      <ShopStack.Screen name="ShopHome" component={ShopScreen} options={{ headerShown: false }} />
      <ShopStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "" }}
      />
    </ShopStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <FloatingTabBar {...props} />}
      >
        <Tab.Screen name="Home">
          {() => <PlaceholderScreen label="Home" />}
        </Tab.Screen>
        <Tab.Screen name="Shop" component={ShopStackNavigator} />
        <Tab.Screen name="EMIDues">
          {() => <PlaceholderScreen label="EMI Dues" />}
        </Tab.Screen>
        <Tab.Screen name="Limit">
          {() => <PlaceholderScreen label="Limit" />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {() => <PlaceholderScreen label="Profile" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
