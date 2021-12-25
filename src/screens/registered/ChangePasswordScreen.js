import React from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";

export default function ChangePasswordScreen({ navigation }) {
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
          <Text style={styles.title}>Change password,</Text>
          <Text style={styles.desc}>
            enter the email address associated with your account
          </Text>
        </View>
        <InputText title="Email Address" />
      </View>
      <Button title="Change Password" navRoute={() => null} />
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
});
