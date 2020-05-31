import * as WebBrowser from "expo-web-browser";
import React, { useState, useContext, useEffect, useReducer } from "react";
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
import { CalendarContext } from "../contexts/SelectedCalendarData";
import {
  dayArray,
  monthDetail,
} from "../assets/staticFiles/LandingMonthDetails";
import useHolidays from "../hooks/Holidays";

var moment = require("moment");

let weekDayMap = [
  { day: "Monday", weekValue: 1 },
  { day: "Tuesday", weekValue: 2 },
  { day: "Wednesday", weekValue: 3 },
  { day: "Thursday", weekValue: 4 },
  { day: "Friday", weekValue: 5 },
  { day: "Saturday", weekValue: 6 },
  { day: "Saturday", weekValue: 7 },
];

const createMonthArray = (monthDetails, holidaysInMonth) => {
  let dateArray = [];
  for (let i = 0; i < monthDetails.dateCountInCurrentMonth; i++) {
    if (holidaysInMonth.some((h) => h.date === i + 1)) {
      dateArray.push(holidaysInMonth.filter((h) => h.date === i + 1)[0]);
    } else {
      dateArray.push({
        date: i + 1,
        isMercantile: false,
        isPublic: false,
        isBank: false,
      });
    }
  }

  return dateArray;
};

const setupMonthDatesWithNearbyMonthDates = (
  dateArray,
  monthStartingDayInWeek
) => {
  let datesInMonthArray = [];

  for (let i = 1; i < monthStartingDayInWeek; i++) {
    datesInMonthArray.push({
      date: undefined,
      isMercantile: false,
      isPublic: false,
      isBank: false,
    });
  }

  dateArray.forEach((d) => {
    datesInMonthArray.push(d);
  });

  const remainingDates = 42 - datesInMonthArray.length;

  for (let i = 1; i <= remainingDates; i++) {
    datesInMonthArray.push({
      date: undefined,
      isMercantile: false,
      isPublic: false,
      isBank: false,
    });
  }
  return datesInMonthArray;
};

const setupDatesInMonthArrayToWeeekInMonth = (datesInMonthArray) => {
  let monthDatesByWeeklyArray = [];

  for (let i = 0; i < 6; i++) {
    monthDatesByWeeklyArray.push(datesInMonthArray.splice(0, 7));
  }
  return monthDatesByWeeklyArray;
};

const DayNames = (props) => {
  const { NavigationState } = useContext(NavigationContext);
  const [NavigationData, setNavigationData] = NavigationState;
  const { calendarState } = useContext(CalendarContext);
  const [calendarData, setCalendarData] = calendarState;
  const [monthAndYear, setMonthAndYear] = useState({});
  const [forwardCount, setForwardCount] = useState(0);
  const [backwardCount, setBackwardCount] = useState(0);
  const holidaysInMonth = useHolidays({ month: 4, year: 2020 });
  let monthDetails = {};

  useEffect(() => {
    const currentDate = moment();
    prepareReqestedMonthToDisplay(currentDate);
  }, []);

  useEffect(() => {
    if (calendarData === undefined) {
      setMonthAndYear(monthDetail);
    } else {
      setMonthAndYear(calendarData);
    }
  }, [calendarData]);

  const prepareReqestedMonthToDisplay = (currentDate) => {
    monthDetails.dateCountInCurrentMonth = moment(currentDate).daysInMonth();
    monthDetails.firstDayOfMonth = moment(currentDate)
      .startOf("month")
      .format("dddd");
    monthDetails.currentMonth = moment(currentDate).format("MMMM");
    monthDetails.currentMonthNumber = moment(currentDate)
      .month(monthDetails.currentMonth)
      .format("M");
    monthDetails.currentYear = moment(currentDate).format("YYYY");

    let currentMonthDates = createMonthArray(monthDetails, holidaysInMonth);

    monthDetails.dateArray = setupMonthDatesWithNearbyMonthDates(
      currentMonthDates,
      weekDayMap.find((d) => d.day === monthDetails.firstDayOfMonth).weekValue
    );
    monthDetails.weekArray = setupDatesInMonthArrayToWeeekInMonth(
      monthDetails.dateArray
    );
    setCalendarData(monthDetails);
  };

  const setupNavigationCounts = (direction) => {
    let countTotal;
    if (direction === true) {
      if (backwardCount === 0) {
        countTotal = forwardCount + 1;
        setForwardCount(countTotal);

        prepareReqestedMonthToDisplay(moment().add(countTotal, "months"));
      } else {
        countTotal = backwardCount - 1;
        setBackwardCount(countTotal);
        prepareReqestedMonthToDisplay(moment().subtract(countTotal, "months"));
      }
    } else {
      if (forwardCount === 0) {
        countTotal = backwardCount + 1;
        setBackwardCount(countTotal);
        prepareReqestedMonthToDisplay(moment().subtract(countTotal, "months"));
      } else {
        countTotal = forwardCount - 1;
        setForwardCount(countTotal);
        prepareReqestedMonthToDisplay(moment().add(countTotal, "months"));
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => {
            setupNavigationCounts(false);
          }}
        >
          <NavigationIcon name="md-arrow-round-back" />
        </TouchableOpacity>
        <Text style={styles.topText}>
          {monthAndYear.currentMonth + " " + monthAndYear.currentYear}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setupNavigationCounts(true);
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
    justifyContent: "space-evenly",
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
