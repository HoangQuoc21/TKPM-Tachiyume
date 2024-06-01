import React, { useState, useRef } from "react";
import { View, Text, PanResponder, StyleSheet } from "react-native";

const CustomSlider = ({ minimumValue, maximumValue, value, onValueChange }) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(
    ((value - minimumValue) / (maximumValue - minimumValue)) * 100
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("Touch started");
      },
      onPanResponderMove: (evt, gestureState) => {
        const newPosition = gestureState.dx / sliderWidth * 100;
        setSliderPosition(Math.min(Math.max(sliderPosition + newPosition, 0), 100));
      },
      onPanResponderRelease: (evt, gestureState) => {
        const newPosition = gestureState.dx / sliderWidth * 100;
        const finalPosition = Math.min(Math.max(sliderPosition + newPosition, 0), 100);
        setSliderPosition(finalPosition);
        const newValue = minimumValue + (finalPosition / 100) * (maximumValue - minimumValue);
        onValueChange(newValue);
      },
    })
  ).current;

  return (
    <View
      style={styles.slider}
      onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
    >
      <View style={[styles.sliderTrack, { width: `${sliderPosition}%` }]} />
      <View
        style={[styles.sliderThumb, { left: `${sliderPosition}%` }]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    height: 30,
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 5,
    position: "relative",
  },
  sliderTrack: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  sliderThumb: {
    position: "absolute",
    top: -5,
    width: 20,
    height: 40,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
});

export default CustomSlider;