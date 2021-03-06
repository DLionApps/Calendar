import React, { useState, useRef, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import { CalendarProvider } from "./contexts/SelectedCalendarData";
import { NavigationProvider } from "./contexts/CalendarNavigation";
import { holidayTableCreateQuery } from "./assets/staticFiles/LandingMonthDetails";
import * as SQLite from "expo-sqlite";

const Stack = createStackNavigator();
const db = SQLite.openDatabase("CalendarDBEX.db");

export default function App(props) {
  const [val, setVal] = useState(0);
  // const increment = () => {
  //   debugger;
  //   let tep = val + 1;
  //   setVal(tep);
  // };

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  // const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        // setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
        await dbOperations();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  const dbOperations = () => {
    db.transaction((tx) => {
      tx.executeSql(
        holidayTableCreateQuery,
        [],
        (success) => {
          // console.log("Holiday Table Created");
        },
        (errror) => {
          // console.log("Holiday Table error");
        }
      );
    });
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <CalendarProvider>
          <NavigationProvider>
            {/* <Text>{val}</Text> */}
            {/* <TouchableOpacity onPress={increment}> */}
            {/* <Text>Click</Text> */}
            {/* </TouchableOpacity> */}
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
            >
              <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </NavigationProvider>
        </CalendarProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
