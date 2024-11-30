import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, Button } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function LocationComponent() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [text, setText] = useState<string>(""); // Store the text to display

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

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setText("Location");
    } catch {
      setText("fail to catch the location");
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Get Location" onPress={getCurrentLocation} />
      <Text style={styles.paragraph}>{text}</Text>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
          />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
  },
  map: {
    flex: 1, // Allow the map to take the remaining space
    width: "100%",
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
});
