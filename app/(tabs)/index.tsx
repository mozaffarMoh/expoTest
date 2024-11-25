import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <ImageBackground
  source={require("../../assets/images/icon.png")}
  style={styles.imageBackground}
>
  <LinearGradient
    colors={["#99551177", "#00000099"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientOverlay}
  />
</ImageBackground>
);
export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <Pressable
        onPress={() => {
          console.log("yes");
        }}
      >
        <Text style={{ color: "white" }}>prss me</Text>
      </Pressable>
  {/*     <Image
        style={styles.tinyLogo}
        source={require("../../assets/images/favicon.png")}
      /> */}
   {/*    <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
      /> */} 
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    width: 200, // Adjust size as needed
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject, // Ensures the gradient covers the image
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
