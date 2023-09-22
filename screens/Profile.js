import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { apiLink } from "../helpers/apiLink";
import { positionRank } from "../helpers/positionRank";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Buttons from "../components/Button";
import IonicIcon from "react-native-vector-icons/Ionicons";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconArt from "react-native-vector-icons/AntDesign";
export default function Profile({ navigation }) {
  const Singout = () => {
    // console.log("done");
    Alert.alert("Are your sure?", "Do you want to sing out yes or no ?", [
      {
        text: "Yes",
        onPress: () => {
          AsyncStorage.removeItem("@mid");
          navigation.navigate("Login");
        },
      },
      {
        text: "No",
      },
    ]);
  };

  const [user, SetUser] = useState({});
  const [isLoading, SetIsLoading] = useState(true);
  const fetchUser = async () => {
    const mid = await AsyncStorage.getItem("@mid");
    const response = await fetch(apiLink("getDatauser"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mid: mid,
      }),
    });
    // console.log(mid);
    const data = await response.json();
    SetUser(data.user);
    SetIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: `https://intranet.saleecolour.com/intsys/usermanagement/uploads/${user.file_img}`,
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              <IconArt name="user" color="#777777" size={20} /> K. {user.Fname}{" "}
              {user.Lname}
            </Title>
            <Caption style={styles.caption}>
              คุณ : {user.Tname} {user.TLname}
            </Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <IconArt name="idcard" color="#777777" size={20} />
          <Text
            style={{ color: "#777777", marginLeft: 20, fontWeight: "bold" }}
          >
            Detail employee
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginStart: 20 }}></Text>
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Username : {user.username}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginStart: 20 }}></Text>
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            English Name : K. {user.Fname} {user.Lname}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginStart: 20 }}></Text>
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Thia Name : คุณ. {user.Tname} {user.TLname}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginStart: 20 }}></Text>
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Employee Code : {user.ecode}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginStart: 20 }}></Text>
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Email : {user.memberemail}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginStart: 20 }}></Text>
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Department and Code : {user.Dept} | {user.DeptCode}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={{ marginStart: 20 }}></Text>
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Position : {positionRank(user.posi)}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>0</Title>
          <Caption>All of history onsite server</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>3</Title>
          <Caption>Owner of devices</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={() =>
            navigation.navigate("ChangePassword", {
              itemMid: user.mid,
            })
          }
        >
          <View style={styles.menuItem}>
            <Icon name="key-variant" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Change password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => Singout()}>
          <View style={styles.menuItem}>
            <IconArt name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
