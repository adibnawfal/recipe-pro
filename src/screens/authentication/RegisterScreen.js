import React from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";

export default function RegisterScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View>
        <TouchableOpacity
          style={{ width: wp(38), justifyContent: "center" }}
          onPress={() => navigation.pop()}
        >
          <MaterialIcons name="arrow-back" size={30} color={colors.black} />
        </TouchableOpacity>
        <View style={{ marginVertical: hp(25) }}>
          <Text style={styles.title}>Create account,</Text>
          <Text style={styles.desc}>sign up to get started</Text>
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={colors.darkGrey}
            style={styles.inputTxt}
          />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor={colors.darkGrey}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.inputTxt}
          />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.darkGrey}
            secureTextEntry={true}
            style={styles.inputTxt}
          />
          <TouchableOpacity style={{ marginRight: wp(27) }}>
            <MaterialCommunityIcons
              name="eye-off"
              size={24}
              color={colors.darkGrey}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.inputWrap, { marginBottom: 0 }]}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={colors.darkGrey}
            secureTextEntry={true}
            style={styles.inputTxt}
          />
          <TouchableOpacity style={{ marginRight: wp(27) }}>
            <MaterialCommunityIcons
              name="eye-off"
              size={24}
              color={colors.darkGrey}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: wp(10) }}>
            <MaterialCommunityIcons
              name="toggle-switch-off-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.termsTxt}>
              I accept the Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: wp(27),
    paddingTop: hp(10),
    paddingBottom: hp(25),
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: "Bold",
    fontSize: hp(22),
    color: colors.black,
  },
  desc: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    marginTop: wp(5),
  },
  inputWrap: {
    flexDirection: "row",
    height: hp(55),
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(15),
    borderRadius: wp(10),
  },
  inputTxt: {
    flex: 1,
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.black,
    marginLeft: wp(27),
  },
  termsTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
  },
  btn: {
    width: "100%",
    height: hp(55),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
    marginTop: wp(15),
  },
  btnText: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.white,
  },
});
