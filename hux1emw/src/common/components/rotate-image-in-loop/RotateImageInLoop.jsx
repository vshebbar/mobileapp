import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

const RotateImageInLoop = ({ imageSource, classNames, rotate }) => {
  // Rotation Animation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Interpolating rotation from 0 to 360 degrees
  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Full rotation
  });

  useEffect(() => {
    let animation;

    if (rotate) {
      // Start rotation when `rotate` is true
      animation = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000, // 4 seconds per full rotation
          useNativeDriver: true,
        })
      );
      animation.start();
    } else {
      // Stop rotation when `rotate` is false
      rotateAnim.stopAnimation();
      rotateAnim.setValue(0); // Reset animation
    }

    return () => {
      if (animation) animation.stop();
    };
  }, [rotate]);

  return <Animated.Image source={imageSource} style={[classNames, { transform: [{ rotate: rotateInterpolation }] }]} />;
};

export default RotateImageInLoop;
