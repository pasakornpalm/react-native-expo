import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
export default function Main() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <Text>Main</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
