// components/RangeSlider.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const RangeSlider = () => {
  const [sliderValue, setSliderValue] = useState(50); // Default value for the slider

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Value: {sliderValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={sliderValue}
        onValueChange={setSliderValue} // Updates value when the slider is moved
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#D3D3D3"
        thumbTintColor="#1EB1FC"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: 300,
    height: 40,
  },
});

export default RangeSlider;
