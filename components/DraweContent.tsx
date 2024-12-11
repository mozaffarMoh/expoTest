import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router, useNavigation } from "expo-router";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

export default function DrawerContent() {
  const { t } = useTranslation();
  // Define the navigation items
  const navigationItems = [
    { name: t("main"), route: "/" },
    { name: t("about"), route: "/about" },
    { name: t("services"), route: "/services" },
    { name: t("login"), route: "/auth/login" },
  ];

  return (
    <DrawerContentScrollView>
      <View style={styles.container}>
        {navigationItems.map((item: any, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() =>
              router.push({ pathname: item.route, params: { name: item.name } })
            }
          >
            <Text style={styles.navText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  navItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  navText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
