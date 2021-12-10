import React from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import WelcomeImage from "../../assets/images/welcome.jpg";

export default function WelcomeScreen({ navigation }) {
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
      <ImageBackground
        source={WelcomeImage}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,1)"]}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.safeView}>
            <View style={styles.headerWrap}>
              <MaterialIcons
                name="local-restaurant"
                size={30}
                color={colors.white}
              />
              <Text style={styles.title}>Recipe Pro</Text>
            </View>
            <View style={{ width: "100%" }}>
              <Text style={styles.desc}>
                Share, browse and collect various{"\n"}recipes all around the
                world.
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={styles.btnText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnGuest}
                onPress={() => navigation.navigate("GuestUser")}
              >
                <Text style={[styles.btnText, { color: colors.white }]}>
                  Guest
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  safeView: {
    flex: 1,
    paddingHorizontal: wp(27),
    paddingTop: hp(10),
    paddingBottom: hp(25),
    justifyContent: "space-between",
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Bold",
    fontSize: hp(18),
    color: colors.white,
    marginLeft: wp(15),
  },
  desc: {
    fontFamily: "Regular",
    fontSize: hp(14),
    color: colors.white,
    marginBottom: wp(10),
  },
  btn: {
    height: hp(55),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
    marginTop: wp(15),
  },
  btnGuest: {
    height: hp(55),
    borderWidth: wp(2),
    borderColor: colors.primary,
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
