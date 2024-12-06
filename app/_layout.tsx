import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRootNavigationState } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import "react-native-reanimated";
import "@/i18n";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useTranslation } from "react-i18next";
import { Button, I18nManager } from "react-native";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import LanguageToggle from "@/components/LanguageToggle";
import * as Notifications from "expo-notifications";
import { SQLiteProvider } from "expo-sqlite";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const [loaded] = useFonts({
    Bahij: require("../assets/fonts/Bahij.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    //runDB();
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SQLiteProvider databaseName="test.db">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={{
              headerTitle: t("main"),
              drawerStyle: { width: 240 },
              headerRight: () => <LanguageToggle />,
            }}
          >
            <Drawer.Screen
              name="(tabs)"
              options={{
                drawerLabel: t("main"),
                title: t("main"),
              }}
            />

            <Drawer.Screen
              name="screens/Screen1"
              options={{
                drawerLabel: t("user"),
                title: t("user"),
              }}
            />
          </Drawer>

          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </SQLiteProvider>
    </ThemeProvider>
  );
}
