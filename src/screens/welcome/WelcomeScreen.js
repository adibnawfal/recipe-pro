import React from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button } from "../../components";
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
              <Button
                title="Sign In"
                addStyle={{ marginTop: hp(15) }}
                onPress={() => navigation.navigate("SignIn")}
              />
              <Button
                title="Guest"
                addStyle={{
                  backgroundColor: "transparent",
                  borderWidth: wp(2),
                  borderColor: colors.primary,
                  marginTop: hp(15),
                }}
                onPress={() => navigation.navigate("GuestUser")}
              />
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
});
