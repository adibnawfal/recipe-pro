import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

import { wp, hp } from "../config/dimensions";
import { colors } from "../res/colors";

export default function InputText({
  navigation,
  title,
  addStyle,
  value,
  onChangeText,
}) {
  let [fontsLoaded] = useFonts({
    Regular: require("../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [secure, setSecure] = useState(true);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={[styles.inputWrap, { ...addStyle }]}>
      {title === "Search Recipe" || title === "Search Ingredient" ? (
        <MaterialIcons
          name="search"
          size={24}
          color={colors.darkGrey}
          style={{ marginLeft: wp(27) }}
        />
      ) : null}
      <TextInput
        placeholder={title}
        placeholderTextColor={colors.darkGrey}
        keyboardType={title === "Email Address" ? "email-address" : "default"}
        secureTextEntry={
          title === "Password" || title === "Confirm Password" ? secure : false
        }
        autoCapitalize="none"
        style={styles.inputTxt}
        value={value}
        onChangeText={onChangeText}
      />
      {title === "Password" || title === "Confirm Password" ? (
        <TouchableOpacity
          style={{ marginRight: wp(27) }}
          onPress={() => setSecure(!secure)}
        >
          <MaterialIcons
            name={secure ? "visibility-off" : "visibility"}
            size={24}
            color={colors.darkGrey}
          />
        </TouchableOpacity>
      ) : null || title === "Search Recipe" ? (
        <TouchableOpacity onPress={() => navigation.navigate("FilterSearch")}>
          <MaterialIcons
            name="filter-list"
            size={24}
            color={colors.darkGrey}
            style={{ marginRight: wp(27) }}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: "row",
    height: hp(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
    backgroundColor: colors.lightGrey,
  },
  inputTxt: {
    flex: 1,
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.black,
    marginLeft: wp(27),
  },
});
