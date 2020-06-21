import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MonoText } from "../components/StyledText";
import DayNames from "../components/DayNames";
import CalendarBody from "../components/CalendarBody";
import HolidayDetails from "../components/HolidayDetails";
import useHolidays from "../hooks/Holidays";

const CalanderScreen = () => {
  const [initialRender, setInitialRender] = useState(true);
  const [navigationViaMonths, setNavigationViaMonths] = useState(false);

  return (
    <View style={styles.container}>
      <DayNames />
      <CalendarBody />
      <HolidayDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "cyan",
  },
  verticleScrollContainer: {
    // paddingTop: 30,
    // backgroundColor: "red",
  },
});

export default CalanderScreen;
