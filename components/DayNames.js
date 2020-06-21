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
// import useCalender from "../hooks/Calendar";
import { CalendarContext } from "../contexts/SelectedCalendarData";
import {
  dayArray,
  monthDetail,
} from "../assets/staticFiles/LandingMonthDetails";
import useHolidays from "../hooks/Holidays";
import * as SQLite from "expo-sqlite";

var moment = require("moment");
const db = SQLite.openDatabase("CalendarDBEX.db");

let weekDayMap = [
  { day: "Monday", weekValue: 1 },
  { day: "Tuesday", weekValue: 2 },
  { day: "Wednesday", weekValue: 3 },
  { day: "Thursday", weekValue: 4 },
  { day: "Friday", weekValue: 5 },
  { day: "Saturday", weekValue: 6 },
  { day: "Saturday", weekValue: 7 },
];

const createMonthArray = (monthDetails, holidaysInMonth, callBack) => {
  let dateArray = [];
  for (let i = 0; i < monthDetails.dateCountInCurrentMonth; i++) {
    if (holidaysInMonth.some((h) => h.Date === i + 1)) {
      const selectedHoliday = holidaysInMonth.filter(
        (h) => h.Date === i + 1
      )[0];
      dateArray.push({
        date: selectedHoliday.Date,
        isBank: selectedHoliday.IsBank === true ? true : false,
        isMercantile: selectedHoliday.IsMercantile === true ? true : false,
        isPublic: selectedHoliday.IsPublic === true ? true : false,
        reason: selectedHoliday.Reason,
        isHoliday: true,
      });
    } else {
      dateArray.push({
        date: i + 1,
        isMercantile: false,
        isPublic: false,
        isBank: false,
        isHoliday: false,
      });
    }
  }

  callBack(dateArray);
};

const setupMonthDatesWithNearbyMonthDates = (
  dateArray,
  monthStartingDayInWeek,
  callBack
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
  callBack(datesInMonthArray);
};

const setupDatesInMonthArrayToWeeekInMonth = (datesInMonthArray) => {
  let monthDatesByWeeklyArray = [];

  for (let i = 0; i < 6; i++) {
    monthDatesByWeeklyArray.push(datesInMonthArray.splice(0, 7));
  }
  return monthDatesByWeeklyArray;
};

const loadHolidays = (year, month, callBack) => {
  // const query =
  //   "insert into Holiday (ID, Year, MonthNumber, MonthText, Date, Reason, IsPublic, IsBank, IsMercantile) values (null, ?, ?, ?, ?, ?, ?, ?, ?)";
  // const params = [2020, 7, "July", 4, "Esala Full Moon Poya Day", 1, 1, 1];
  // db.transaction(
  //   (tx) => {
  //     tx.executeSql(
  //       query,
  //       params,
  //       (tx, res) => {
  //         console.log(res);
  //       },
  //       function (tx, er) {
  //         console.log(er);
  //         return;
  //       }
  //     );
  //   },
  //   (e) => {},
  //   (s) => {}
  // );
  // console.log(
  //   "SELECT * FROM Holiday WHERE Year = " + year + " AND MonthText = " + month
  // );
  db.transaction(
    (tx) => {
      tx.executeSql(
        "SELECT * FROM Holiday WHERE Year=? AND MonthText=?",
        [year, month],
        (tx, res) => {
          res.rows._array.forEach((h) => {
            h.IsBank = h.IsBank === 1 ? true : false;
            h.IsMercantile = h.IsMercantile === 1 ? true : false;
            h.IsPublic = h.IsPublic === 1 ? true : false;
          });
          callBack(res.rows._array);
        },
        function (tx, errror) {
          console.log("Holiday retrieve query execute error.");
          return;
        }
      );
    },
    (error) => {
      console.log("Holiday retrieve transaction execute error.");
    },
    (susccess) => {
      // console.log(susccess);
    }
  );

  // try {
  //   db.executeSql(
  //     "select * from items",
  //     [],
  //     (ss) => {
  //       console.log("done");
  //     },
  //     (er) => {
  //       console.log("err");
  //     }
  //   );
  //   console.log(true);
  // } catch (e) {
  //   console.log(false);
  //   createHolidayTable();
  // }
};

const DayNames = (props) => {
  const { NavigationState } = useContext(NavigationContext);
  const [NavigationData, setNavigationData] = NavigationState;
  const { calendarState } = useContext(CalendarContext);
  const [calendarData, setCalendarData] = calendarState;
  const [monthAndYear, setMonthAndYear] = useState({});
  const [forwardCount, setForwardCount] = useState(0);
  const [backwardCount, setBackwardCount] = useState(0);
  // const holidaysInMonth = useHolidays({ month: 4, year: 2020 });
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

    try {
      loadHolidays(
        monthDetails.currentYear,
        monthDetails.currentMonth,
        (holidays) => {
          monthDetails.holidays = holidays;
          createMonthArray(monthDetails, holidays, (currentMonthDates) => {
            setupMonthDatesWithNearbyMonthDates(
              currentMonthDates,
              weekDayMap.find((d) => d.day === monthDetails.firstDayOfMonth)
                .weekValue,
              (dateArray) => {
                monthDetails.dateArray = dateArray;
                monthDetails.weekArray = setupDatesInMonthArrayToWeeekInMonth(
                  dateArray
                );
                setCalendarData(monthDetails);
              }
            );
          });
        }
      );
    } catch (error) {
      console.log("day names try catch");
    }
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
