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
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

const MemoModal = (props) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [startTime, setStartTime] = useState(undefined);

  return (
    <Modal
      visible={props.isShow}
      onTouchOutside={() => {
        props.closeModalFunc();
      }}
      modalAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      modalTitle={<ModalTitle title="New Memo" />}
      width={Dimensions.get("screen").width - responsiveWidth(10)}
      // modalStyle={{ backgroundColor: "black" }}
    >
      <ModalContent>
        <ScrollView>
          <View>
            <Input label="Title" />
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowDatepicker(true);
              console.log("in");
            }}
            style={{ backgroundColor: "red" }}
          >
            {/* <View> */}
            <Input
              label="Start"
              rightIcon={<Icon name="chevron-right" size={24} />}
            />
            {showDatepicker && (
              <DateTimePicker
                testID="dateTimePicker"
                // timeZoneOffsetInMinutes={0}
                value={startTime}
                mode="time"
                is24Hour="false"
                display="default"
                onChange={(e) => {
                  console.log(e);
                }}
              />
            )}
            {/* </View> */}
          </TouchableOpacity>
        </ScrollView>
      </ModalContent>
    </Modal>
  );
};

export default MemoModal;
