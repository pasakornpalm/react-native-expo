import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/HomeMain";
import ProfileScreen from "../screens/ProfileDetail";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  const [CheckLogin, setCheckLogin] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);

  const LogingCheckData = async () => {
    // เช็คว่ายังมีค่าที่ User Login อยู่หรือป่าว
    const mid = await AsyncStorage.getItem("@mid");
    if (mid) {
      setCheckLogin(true);
    } else {
      setCheckLogin(false);
    }
    SetIsLoading(true);
  };

  useEffect(() => {
    LogingCheckData();
  }, [isLoading]);

  if (isLoading) {
    // เช็คต้องโหลดข้อมูลเสร็จก่อนจึงทำเงือนไข
    if (CheckLogin) {
      console.log("User Login");
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="HomeMain"
              component={HomeScreen}
              options={{ title: "Intranet-Saleecolour" }}
            />
            <Stack.Screen name="ProfileDetail" component={ProfileScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      console.log("User not login");
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="HomeMain"
              component={HomeScreen}
              options={{ title: "Intranet-Saleecolour" }}
            />
            <Stack.Screen name="ProfileDetail" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
};

export default MyStack;
