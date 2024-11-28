import DropdownSelectExample from "@/components/SelectExample";
import FileUploadWithValidation from "@/components/validationZod/validationZod";
import { getFontForLanguage } from "@/constants/font";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Surface } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColor } from "@/custom-hooks/useColor";
import LocationComponent from "@/components/device-resources/LocationComponent";

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
  const { i18n } = useTranslation();
  const textColor = useColor("normal");
  const fontFamily = getFontForLanguage(i18n.language);

  const Item = ({ title }: any) => (
    <LinearGradient
      colors={["#00559955", "#550099"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientOverlay}
    >
      <Text style={{ color: textColor }}>{title}</Text>
    </LinearGradient>
  );

  return (
    <>
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView style={{ flexGrow: 1 }}>
          <Surface style={styles.surface}>
            <Text style={{ color: "blue", fontSize: 50, fontFamily }}>
              Project
            </Text>
          </Surface>
          <View style={{width:'100%',height:300,backgroundColor:'#cc0000'}}>
            <LocationComponent />
          </View>
          {/*          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={() => (
              <>
                <DropdownSelectExample />
                <FileUploadWithValidation />
              </>
            )}
            alwaysBounceVertical={false}
            style={{ marginBottom: 200 }} // Adjust as necessary
          /> */}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
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
