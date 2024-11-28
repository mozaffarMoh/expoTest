import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  I18nManager,
  Alert,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Button as ButtonP,
  Card,
  PaperProvider,
  Text,
} from "react-native-paper";
import { useTranslation } from "react-i18next";
import * as Updates from "expo-updates";
import {
  Gesture,
  GestureDetector,
  Directions,
  State,
  FlingGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFontForLanguage } from "@/constants/font";
import { SafeAreaView } from "react-native-safe-area-context";

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const About = () => {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const [gesVal, setGesVal] = useState(false);
  const fontFamily = getFontForLanguage(i18n.language);

  const changeLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem("language", lang);
      i18n.changeLanguage(lang);
      const isRTL = lang === "ar";

      if (I18nManager.isRTL !== isRTL) {
        I18nManager.forceRTL(isRTL);
        Alert.alert(
          "Restart Required",
          "The app needs to restart to apply the new language direction.",
          [
            {
              text: "Restart Now",
              onPress: async () => {
                // This reloads the app
                await Updates.reloadAsync();
              },
            },
          ]
        );
        // Reload the app to apply the new layout direction
      }
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const onSwipe = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("Swiped Left!");
      setGesVal(!gesVal);
    }
  };

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Text variant="titleLarge">{t("about_title")}</Text>
          <Button
            title={t("language_switch")}
            onPress={() =>
              changeLanguage(currentLanguage === "en" ? "ar" : "en")
            }
          />
          <FlingGestureHandler
            direction={Directions.LEFT} // Use Directions constants
            onHandlerStateChange={onSwipe}
          >
            <View style={styles.container}>
              <Text style={gesVal ? styles.text : styles.gesTest}>
                Swipe Left
              </Text>
            </View>
          </FlingGestureHandler>
          <Card style={styles.card}>
            <Card.Title
              title={t("card_title")}
              subtitle={t("card_subtitle")}
              left={LeftContent}
              titleStyle={{
                fontFamily, // Custom font for title
              }}
              subtitleStyle={{
                fontFamily, // Custom font for subtitle
              }}
            />

            <Card.Content>
              <Text variant="titleLarge" style={{ fontFamily }}>
                {t("card_content_title")}
              </Text>
              <Text variant="bodyMedium" style={{ fontFamily }}>
                {t("card_content_body")}
              </Text>
            </Card.Content>
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Actions>
              <ButtonP>{t("cancel")}</ButtonP>
              <ButtonP>{t("ok")}</ButtonP>
            </Card.Actions>
          </Card>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 24,
    color: "green",
  },
  gesTest: {
    fontSize: 44,
    color: "red",
  },
  app: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    fontFamily: "Bahij",
  },
});

export default About;
