import React from "react";
import { StyleSheet, View, Button, I18nManager, Alert } from "react-native";
import { Avatar, Button as ButtonP, Card, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";
import * as Updates from 'expo-updates';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const About = () => {
  const { t, i18n } = useTranslation();

  const switchLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    const isRTL = newLang === "ar";

    // Update language in i18next
    i18n.changeLanguage(newLang);

    // Change layout direction
    if (I18nManager.isRTL !== isRTL) {
      console.log('valllll : ',isRTL);
      I18nManager.forceRTL(isRTL);
      Alert.alert(
        "Restart Required",
        "The app needs to restart to apply the new language direction.",
        [
          {
            text: "Restart Now",
            onPress: () => {
              // This reloads the app
              Updates.reloadAsync();
            },
          },
        ]
      );
      // Reload the app to apply the new layout direction
    
    }
  };

  return (
    <View style={styles.app}>
      <Text variant="titleLarge">{t("about_title")}</Text>
      <Button title={t("language_switch")} onPress={switchLanguage} />

      <Card style={styles.card}>
        <Card.Title
          title={t("card_title")}
          subtitle={t("card_subtitle")}
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">{t("card_content_title")}</Text>
          <Text variant="bodyMedium">{t("card_content_body")}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <ButtonP>{t("cancel")}</ButtonP>
          <ButtonP>{t("ok")}</ButtonP>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
  },
});

export default About;
