import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Scan({ navigation }) {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [memberId, setMemberId] = useState(null);

  const ScannerBarcode = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const LoginByQRCode = async (accessToken) => {
    const response = await fetch(
      "https://intranet.saleecolour.com/intranet/login/byQRCode",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
          mid: memberId,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  const fetchUser = async () => {
    const storageMid = await AsyncStorage.getItem("@mid");
    setMemberId(storageMid);
  };

  useEffect(() => {
    fetchUser();
    if (isFocused) {
      const unsubscribe = navigation.addListener("focus", () => {
        setScanned(false);
        setHasPermission(false);
        ScannerBarcode();
      });
      console.log(scanned);
    }
  }, [isFocused]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert("Dialog Message", "Login successfully", [
      {
        text: "OK",
        onPress: () => {
          LoginByQRCode(data);
          navigation.navigate("Main");
        },
      },
    ]);

    // alert(
    //   `Bar code with type ${type} and data ${Linking.openURL(
    //     `${data}`
    //   )} has been scaned`
    // );
    // alert(`Bar code with type ${type} and data ${data} has been scaned`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for Camera Permission </Text>;
  }

  if (hasPermission === false) {
    return <Text>No Access to Camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
      {/* {scanned && (
        <Button
          title="Tap to scan again"
          onPress={() => setScanned(false)}
        ></Button>
      )} */}
    </View>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 2,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 5,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});
