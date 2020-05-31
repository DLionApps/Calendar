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
import { useMemoAdd } from "../hooks/Memo";
import { CalendarContext } from "../contexts/SelectedCalendarData";
import staticMonthArray from "../assets/staticFiles/LandingMonthDetails";
import Modal, {
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalButton,
} from "react-native-modals";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card, Button, Input } from "react-native-elements";
// import * as SQLite from "expo-sqlite";

var moment = require("moment");
// const db = SQLite.openDatabase("CalendarDB");

const MemoModal = (props) => {
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [memo, setMemo] = useState({
    date: props.selectedDate,
    time: moment(new Date()).format("hh:mm:A"),
  });
  const aa = useMemoAdd();
  // console.log(aa);

  const handleTimePicker = () => {
    setShowDatepicker(true);
  };

  const onChange = (event, selectedDate) => {
    setShowDatepicker(false);
    const memoTime =
      selectedDate !== undefined
        ? moment(selectedDate).format("hh:mm:A")
        : moment(new Date()).format("hh:mm:A");
    setMemo({ ...memo, time: memoTime });
  };

  // const createDBIfNotexists = async () => {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       "create table if not exists Momo (Id integer primary key not null, d int, value text);"
  //     );
  //   });
  // };

  const addMemo = () => {
    // console.log(memo);
    // SQLite.openDatabase(name, version, description, size);
  };

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
          <View style={{ paddingBottom: "4%" }}>
            <Input
              placeholder="Title"
              onChangeText={(value) => {
                setMemo({ ...memo, title: value });
              }}
            />
          </View>
          <View style={styles.timeWrapper}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity onPress={handleTimePicker}>
                <Text>Start Time</Text>
                <Text>{memo.time}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>End Time</Text>
                <Text>{memo.time}</Text>
              </TouchableOpacity>
            </View>

            {showDatepicker === true && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View style={{ paddingBottom: "4%", paddingTop: "4%" }}>
            <Input
              placeholder="Content"
              multiline={true}
              maxLength={100}
              onChangeText={(value) => {
                setMemo({ ...memo, content: value });
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Button
              title="Cancel"
              type="outline"
              icon={<Icon name="times" size={18} color="red" />}
              onPress={() => {
                props.closeModalFunc();
              }}
            />
            <Button
              title="Save"
              type="outline"
              icon={<Icon name="check" size={18} color="blue" />}
              onPress={addMemo}
            />
          </View>
        </ScrollView>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  timeWrapper: {
    // backgroundColor: "red",
    padding: "5%",
    paddingLeft: "10%",
    paddingRight: "10%",
    borderRadius: 40,
    borderWidth: 1,
    paddingBottom: "4%",
  },
  multiLineTextBox: {},
});

export default MemoModal;
