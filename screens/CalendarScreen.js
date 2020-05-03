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
import useCalender from "../hooks/Calendar";
import useHolidays from "../hooks/Holidays";

const CalanderScreen = () => {
  const [initialRender, setInitialRender] = useState(true);
  const [navigationViaMonths, setNavigationViaMonths] = useState(false);
  const getInitialValue = useCalender(true, false);
  const holidaysInMonth = useHolidays({ month: 4, year: 2020 });

  const monthNavigation = (isForward) => {
    setNavigationViaMonths(isForward);
  };

  return (
    <View style={styles.container}>
      <DayNames month="April" year={2020} monthNavigation={monthNavigation} />
      <CalendarBody />
      <HolidayDetails holidayDetails={holidaysInMonth} />
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
