import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import TextInput from "../components/TextInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { apiLink } from "../helpers/apiLink";
import { passwordPattern } from "../helpers/passwordPattern";

export default function ChangePassword({ route, navigation }) {
  const { itemMid } = route.params;
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmpassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChangePassordPressed = async () => {
    const passwordError = passwordPattern(password.value);
    const confirmpasswordError = passwordPattern(confirmpassword.value);

    if (passwordError || confirmpasswordError) {
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmpassword, error: confirmpasswordError });
      return;
    } else if (password.value != confirmpassword.value) {
      setConfirmPassword({
        ...confirmpassword,
        error: "Passwords don't match Please try again",
      });
    } else {
      // alert("done");

      const response = await fetch(apiLink("userChangepassword"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mid: itemMid,
          newpassword: password.value,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        alert("Sucessfully");
        navigation.navigate("Profile");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}></View>
      {/* <Text>itemId: {itemMid}</Text> */}
      {/* <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
        เปลี่ยนรหัสผ่านใหม่
      </Text> */}
      <TextInput
        secureTextEntry={!showPassword}
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        style={styles.input}
        placeholder="Enter New Password"
        placeholderTextColor="#aaa"
      />
      <TextInput
        secureTextEntry={!showPassword}
        value={confirmpassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
        error={!!confirmpassword.error}
        errorText={confirmpassword.error}
        style={styles.input}
        placeholder="Comfirm Password"
        placeholderTextColor="#aaa"
      />
      <MaterialCommunityIcons
        name={showPassword ? "eye-off" : "eye"}
        size={24}
        color="#aaa"
        style={styles.icon}
        onPress={toggleShowPassword}
      />
      <TouchableOpacity
        style={styles.commandButton}
        onPress={onChangePassordPressed}
      >
        <Text style={styles.panelButtonTitle}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    // borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    // paddingBottom: 5,
  },
  input: {
    color: "#333",
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
    alignSelf: "flex-end",
  },
});
