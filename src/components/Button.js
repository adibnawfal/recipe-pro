import React from "react";
import AppLoading from "expo-app-loading";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import { wp, hp } from "../config/dimensions";
import { colors } from "../res/colors";

export default function Button({ title, navRoute, addStyle }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity
      style={[styles.btn, { ...addStyle }]}
      onPress={() => navRoute()}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: hp(55),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
  },
  btnText: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.white,
  },
});
