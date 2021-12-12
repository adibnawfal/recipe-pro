import React from "react";
import AppLoading from "expo-app-loading";
import ImageOverlay from "react-native-image-overlay";
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import SignInImage from "../../assets/images/signin.jpg";

export default function SignInScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View>
        <ImageOverlay
          source={SignInImage}
          containerStyle={{ aspectRatio: 3000 / 2008 }}
          contentPosition="top"
          overlayColor={colors.black}
          overlayAlpha={0.3}
        >
          <SafeAreaView style={{ width: "100%", paddingHorizontal: wp(27) }}>
            <TouchableOpacity
              style={{
                width: wp(38),
                height: wp(38),
                borderRadius: wp(38) / 2,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
              onPress={() => navigation.pop()}
            >
              <MaterialIcons name="arrow-back" size={30} color={colors.white} />
            </TouchableOpacity>
          </SafeAreaView>
        </ImageOverlay>
      </View>
      <View style={styles.bodyWrap}>
        <View>
          <View style={{ marginBottom: hp(25) }}>
            <Text style={styles.title}>Welcome back,</Text>
            <Text style={styles.desc}>sign in to continue</Text>
          </View>
          <View style={[styles.inputWrap, { marginBottom: hp(15) }]}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={colors.darkGrey}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.inputTxt}
            />
          </View>
          <View style={[styles.inputWrap, { marginBottom: hp(15) }]}>
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotPass}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerTxt}>
              Don’t have an account?{" "}
              <Text style={{ fontFamily: "Bold", color: colors.black }}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("RegisteredUser")}
          >
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bodyWrap: {
    flex: 1,
    paddingHorizontal: wp(27),
    paddingVertical: hp(25),
    justifyContent: "space-between",
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
    borderRadius: wp(10),
  },
  inputTxt: {
    flex: 1,
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.black,
    marginLeft: wp(27),
  },
  forgotPass: {
    alignSelf: "flex-end",
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
  },
  registerTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
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
