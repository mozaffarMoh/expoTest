import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/i18n";
import { useColorScheme } from "@/hooks/useColorScheme";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Bahij: require("../assets/fonts/Bahij.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Function to load the stored language preference
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem("language");
        const locale = storedLanguage || Localization.locale.split("-")?.[0];
        const isRTL = locale === "ar";

        // Set RTL layout based on the language
        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);
      } catch (error) {
        console.error("Error loading language preference:", error);
      }
    };

    loadLanguage();
  }, []); // Run this effect only once on app load

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
