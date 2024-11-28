import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

export default function LocationComponent() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [text, setText] = useState<string>(""); // Store the text to display

  async function reverseGeocode(lat: any, lon: any) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return `${data.address.city}, ${data.address.state}, ${data.address.country}`;
    } catch (error) {
      console.error("Error fetching geocode:", error);
      return "Could not retrieve address";
    }
  }

  async function getCurrentLocation() {
    setText("Waiting...");
    if (Platform.OS === "android" && !Device.isDevice) {
      setText(
        "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setText("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const address = await reverseGeocode(
      location.coords.latitude,
      location.coords.longitude
    )
      .then((res) => {
        setText(res);
        
        console.log('Location is : ',res);
      })
      .catch((err) => {
        console.log('Error Location is : ',err);
        
        setText(err);
      });
  }

  return (
    <View style={styles.container}>
      <Button title="get location" onPress={getCurrentLocation} />
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
