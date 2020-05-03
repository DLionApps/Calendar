import React, { useContext, useEffect } from "react";
import { CalendarContext } from "../contexts/SelectedCalendarData";
import { NavigationContext } from "../contexts/CalendarNavigation";
import useHolidays from "./Holidays";

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

const useCalender = (isInitialCall, isForword) => {
  const { calendarState } = useContext(CalendarContext);
  const [calendarData, setCalendarData] = calendarState;
  const { NavigationState } = useContext(NavigationContext);
  const [NavigationData, setNavigationData] = calendarState;
  const holidaysInMonth = useHolidays({ month: 4, year: 2020 });
  let monthDetails = {};

  useEffect(() => {
    if (isInitialCall === true && isForword === false) {
      const currentDate = moment();
      monthDetails.dateCountInCurrentMonth = moment(currentDate).daysInMonth();
      monthDetails.firstDayOfMonth = moment(currentDate)
        .startOf("month")
        .format("dddd");
      let currentMonthDates = createMonthArray(monthDetails, holidaysInMonth);

      monthDetails.dateArray = setupMonthDatesWithNearbyMonthDates(
        currentMonthDates,
        weekDayMap.find((d) => d.day === monthDetails.firstDayOfMonth).weekValue
      );
      monthDetails.weekArray = setupDatesInMonthArrayToWeeekInMonth(
        monthDetails.dateArray
      );
      setCalendarData(monthDetails);
    }
    // else if (isInitialCall === false && isForword === true) {
    //   console.log(isForword);
    // } else {
    //   console.log(isForword);
    // }
  }, []);

  let currentDate = moment();
  let firstDay = moment("2020-02-19T07:42:02.015Z")
    .startOf("month")
    .format("d");
  return firstDay;
};

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

export default useCalender;
