import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { inputValidator } from "../helpers/inputValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiLink } from "../helpers/apiLink";
import { registerIndieID } from "native-notify";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onLoginPressed = async () => {
    const usernameError = inputValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    } else {
      const response = await fetch(apiLink("login"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });
      const data = await response.json();
      console.log(data.status);
      if (data.status === "ok") {
        await AsyncStorage.setItem("@mid", data.mid);
        registerIndieID(`userid-${data.mid}`, 12543, "TgLzMcJg4xD75FLd7KI7Ai");
        setUsername("");
        setPassword("");
        navigation.navigate("HomeMain");
      } else if (data.status === "error1") {
        alert(data.message);
      } else if (data.status === "error2") {
        alert(data.message);
      }
    }
  };

  return (
    <Background>
      <Logo />
      <Header>INTRANET_V1</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
});
