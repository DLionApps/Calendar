import * as React from "react";
import { Text } from "react-native";
// import * as Font from "expo-font";

export function MonoText(props) {
  // Font.loadAsync({
  //   "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
  // });

  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
