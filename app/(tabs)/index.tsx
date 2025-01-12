import DropdownSelectExample from "@/components/SelectExample";
import FileUploadWithValidation from "@/components/validationZod/validationZod";
import { getFontForLanguage } from "@/constants/font";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Button,
  Dimensions,
} from "react-native";
import { Snackbar, Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColor } from "@/custom-hooks/useColor";
import LocationComponent from "@/components/device-resources/LocationComponent";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  scheduleAndCancel,
  sendPushNotification,
} from "@/constants/notifications";
import * as Notifications from "expo-notifications";
import SqliteData from "@/components/SqliteData";
import CustomSnackbar from "@/components/CustomSnackbar";
import Slider from "@/components/Slider";
import RangeSlider from "@/components/RangeSlider";

const { width: screenWidth } = Dimensions.get("window");

/* const DATA = [
  { id: "1", title: "First Item" },
  { id: "2", title: "Second Item" },
  { id: "3", title: "Third Item" },
  { id: "4", title: "Fourth Item" },
  { id: "5", title: "Fifth Item" },
  { id: "6", title: "Sixth Item" },
  { id: "7", title: "Seventh Item" },
  { id: "8", title: "Eighth Item" },
  { id: "9", title: "Ninth Item" },
  { id: "10", title: "Tenth Item" },
  { id: "11", title: "Eleventh Item" },
  { id: "12", title: "Twelfth Item" },
  { id: "13", title: "Thirteenth Item" },
  { id: "14", title: "Fourteenth Item" },
  { id: "15", title: "Fifteenth Item" },
  { id: "16", title: "Sixteenth Item" },
  { id: "17", title: "Seventeenth Item" },
  { id: "18", title: "Eighteenth Item" },
  { id: "19", title: "Nineteenth Item" },
  { id: "20", title: "Twentieth Item" },
  { id: "21", title: "Twenty-First Item" },
  { id: "22", title: "Twenty-Second Item" },
  { id: "23", title: "Twenty-Third Item" },
  { id: "24", title: "Twenty-Fourth Item" },
  { id: "25", title: "Twenty-Fifth Item" },
  { id: "26", title: "Twenty-Sixth Item" },
  { id: "27", title: "Twenty-Seventh Item" },
  { id: "28", title: "Twenty-Eighth Item" },
  { id: "29", title: "Twenty-Ninth Item" },
  { id: "30", title: "Thirtieth Item" },
  { id: "31", title: "Thirty-First Item" },
  { id: "32", title: "Thirty-Second Item" },
  { id: "33", title: "Thirty-Third Item" },
  { id: "34", title: "Thirty-Fourth Item" },
  { id: "35", title: "Thirty-Fifth Item" },
];
 */
export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language == "ar";
  const fontFamily = getFontForLanguage(i18n.language);
  const [isSnackbarVisible, setIsSnackbarVisible]: any = useState(false);

  const data = [
    {
      title: "Amazing Sunset",
      description: "Experience the beautiful sunset over the ocean.",
      imageUrl: "https://picsum.photos/700",
    },
    {
      title: "Mountain Adventure",
      description: "Climb the highest peaks and enjoy breathtaking views.",
      imageUrl: "https://picsum.photos/800",
    },
    {
      title: "City Lights",
      description: "The city comes alive at night with vibrant lights.",
      imageUrl: "https://picsum.photos/900",
    },
  ];

  return (
    <View>
      <StatusBar style="auto" />
      <View style={{ height: screenWidth, width: "100%" }}>
        <Slider data={data} />
      </View>

      {/*
      <Button title="get products" onPress={getProducts} />
      <View style={{ height:430}}>
        <FlatList
          data={products.slice(0, 10)}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <>
              <DropdownSelectExample />
              <FileUploadWithValidation />
            </>
          )}
          alwaysBounceVertical={false}
        />
      </View>
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginBottom: 10,
  },
  gradientOverlay: {
    padding: 20,
    marginVertical: 8,
  },
});
