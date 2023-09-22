import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonicIcon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View, Text, Dimensions } from "react-native";
import { useTheme, Avatar } from "react-native-paper";

import MainScreen from "../screens/Main";
import ScanScreen from "../screens/Scan";
import NotificationScreen from "../screens/Notification";
import ProfileScreen from "../screens/Profile";
import ChangePassword from "../screens/ChangePassword";

const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size, padding }) => {
          let iconName;
          if (route.name === "Main") {
            iconName = "home";
          } else if (route.name === "Scanner") {
            iconName = "qr-code-scanner";
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications-active" : "notifications";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          return (
            <MaterialIcons
              name={iconName}
              size={size}
              color={color}
              style={{ paddingBottom: padding }}
            ></MaterialIcons>
          );
        },
      })}
    >
      <Tab.Screen name="Main" component={MainScreen}></Tab.Screen>
      <Tab.Screen name="Scanner" component={ScanScreen}></Tab.Screen>
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
      ></Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileStackScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Detail Employee",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      ></ProfileStack.Screen>
      <ProfileStack.Screen
        name="ChangePassword"
        options={{
          title: "Change Password",
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        component={ChangePassword}
      ></ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};
