import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { ScrollView } from "react-native-gesture-handler";
import { MonoText } from "../components/StyledText";
import Colors from "../constants/Colors";
import useCalender from "../hooks/Calendar";
import { CalendarContext } from "../contexts/SelectedCalendarData";
import staticMonthArray from "../assets/staticFiles/LandingMonthDetails";
import Modal, {
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalButton,
} from "react-native-modals";
import MemoModal from "../components/MemoModal";

const forcusToHolidayOrMomo = (dateObj) => {
  console.log(dateObj);
};

const CalendarBody = (props) => {
  const [weekArray, setWeekArray] = useState([]);
  const { calendarState } = useContext(CalendarContext);
  const [calendarData, setCalendarData] = calendarState;
  const [isMemoModalShow, setIsMemoModalShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});

  // console.log(calendarData.weekArray);
  useEffect(() => {
    if (calendarData === undefined) {
      setWeekArray(staticMonthArray);
    } else {
      setWeekArray(calendarData.weekArray);
    }
  }, [calendarData]);

  const closeModal = () => {
    setIsMemoModalShow(false);
  };

  const showModal = (dateObj) => {
    if (dateObj.date !== undefined) {
      setSelectedDate(dateObj);
      setIsMemoModalShow(true);
    }
  };

  return (
    <View style={styles.container}>
      {weekArray.map((weekObj, weekIndex) => {
        return (
          <View style={styles.weekRow} key={weekIndex}>
            {weekObj.map((dateObj, dateIndex) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.dateContainer,
                    {
                      borderWidth: 1,
                      borderColor:
                        dateObj.isBank === true ||
                        dateObj.isMercantile === true ||
                        dateObj.isPublic === true
                          ? Colors.red
                          : "transparent",
                    },
                  ]}
                  key={dateIndex}
                  onPress={() => {
                    showModal(dateObj);
                  }}
                >
                  <Text
                    style={[
                      styles.dateText,

                      {
                        color:
                          dateIndex === 5 || dateIndex === 6
                            ? Colors.gray
                            : Colors.basicBlack,
                      },
                    ]}
                  >
                    {dateObj.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
      <MemoModal
        isShow={isMemoModalShow}
        closeModalFunc={closeModal}
        selectedDate={selectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
    // backgroundColor: "blue",
    justifyContent: "space-around",
    paddingTop: "2%",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "blue",
    height: "10%",
  },
  text: {
    color: Colors.basicBlack,
  },
  dateContainer: {
    // backgroundColor: "yellow",
    width: "7%",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    // fontWeight: "bold",
  },
});

export default CalendarBody;
