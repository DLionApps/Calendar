import * as WebBrowser from "expo-web-browser";
import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import { MonoText } from "./StyledText";
import Colors from "../constants/Colors";
import { CalendarContext } from "../contexts/SelectedCalendarData";

const HolidayDetails = () => {
  const { calendarState } = useContext(CalendarContext);
  const [calendarData, setCalendarData] = calendarState;
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    if (calendarData !== undefined) {
      setHolidays(calendarData.holidays);
    } else {
      setHolidays([]);
    }
  }, [calendarData]);

  return (
    <View style={styles.container}>
      <ScrollView
        // style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {holidays.map((holidayDetail, index) => {
          return (
            <View
              style={[
                styles.holidayContainer,
                {
                  borderTopWidth: index === 0 ? 1 : 0,
                  borderTopColor: index === 0 ? Colors.red : "transparent",
                },
              ]}
              key={index}
            >
              <View style={styles.dateContainer}>
                <Text>{holidayDetail.Date}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <View>
                  <Text>{holidayDetail.Reason}</Text>
                </View>
                <View>
                  <Text style={styles.holidayType}>
                    {holidayDetail.IsPublic === true ? " Public," : ""}{" "}
                    {holidayDetail.IsBank === true ? " Bank," : ""}
                    {holidayDetail.IsMercantile === true
                      ? " Mercantile"
                      : ""}{" "}
                    Holiday
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "35%",
    // backgroundColor: "blue",
  },
  contentContainer: {},
  holidayContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.red,
  },
  dateContainer: {
    // height: "100%",
    width: "10%",
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  holidayType: {
    fontSize: responsiveFontSize(1.8),
    color: Colors.gray,
  },
});

export default HolidayDetails;
