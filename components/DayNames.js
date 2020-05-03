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
import { MonoText } from "../components/StyledText";
import Colors from "../constants/Colors";
import { NavigationIcon } from "../components/TabBarIcon";
import { NavigationContext } from "../contexts/CalendarNavigation";
import useCalender from "../hooks/Calendar";

const dayArray = [
  { name: "MON" },
  { name: "TUE" },
  { name: "WED" },
  { name: "THU" },
  { name: "FRI" },
  { name: "SAT" },
  { name: "SUN" },
];

const DayNames = (props) => {
  const { NavigationState } = useContext(NavigationContext);
  const [NavigationData, setNavigationData] = NavigationState;

  const [initialRender, setInitialRender] = useState(true);

  // useEffect(() => {
  //   if (initialRender === true) {
  //     console.log(initialRender);
  //     setInitialRender(false);
  //   } else {
  //     console.log(initialRender);
  //   }
  //   // useCalender(false, NavigationData);
  // }, [NavigationData]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            props.monthNavigation(false);
          }}
        >
          <NavigationIcon name="md-arrow-round-back" />
        </TouchableOpacity>
        <Text style={styles.topText}>{props.month + " " + props.year}</Text>
        <TouchableOpacity
          onPress={() => {
            props.monthNavigation(true);
          }}
        >
          <NavigationIcon name="md-arrow-round-forward" />
        </TouchableOpacity>
      </View>
      <View style={styles.dayNameContainer}>
        {dayArray.map((day, index) => {
          return (
            <View style={styles.dayNameParent} key={index}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      index === 5 || index === 6
                        ? Colors.gray
                        : Colors.basicBlack,
                  },
                ]}
                key={index}
              >
                {day.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "15%",
    // backgroundColor: "blue",
  },
  topContainer: {
    height: "65%",
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  dayNameContainer: {
    flexDirection: "row",
    // backgroundColor: "white",
    height: "35%",
    justifyContent: "space-around",
    paddingTop: "1%",
  },
  dayNameParent: {
    alignItems: "center",
    justifyContent: "center",
  },
  topText: {
    fontSize: responsiveFontSize(4),
    color: Colors.tabIconSelected,
  },
  text: {
    color: Colors.basicBlack,
    fontSize: responsiveFontSize(2),
  },
});

export default DayNames;
