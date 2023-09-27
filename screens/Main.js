import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function Main() {
  const snedNotification = async () => {
    const mid = await AsyncStorage.getItem("@mid");
    const userId = "userid-" + mid;

    axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: userId,
      appId: 12543,
      appToken: "TgLzMcJg4xD75FLd7KI7Ai",
      title: "CSRO System.",
      message: "คำร้องขอรอรับการอนุมัติจากหน่วยงานที่เกี่ยวข้อง",
    });
    console.log("send");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <Text>Main</Text>
        <Button onPress={snedNotification} title="Press Me" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
