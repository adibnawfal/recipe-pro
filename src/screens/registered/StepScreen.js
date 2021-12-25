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

export default function StepScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const { title } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              width: wp(38),
              justifyContent: "center",
            }}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons name="arrow-back" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>{title}</Text>
          <TouchableOpacity
            style={{
              width: wp(38),
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <MaterialIcons
              name="delete-outline"
              size={30}
              color={colors.black}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: hp(15),
          }}
        >
          <View
            style={{
              width: wp(5),
              height: wp(5),
              borderRadius: wp(5) / 2,
              marginTop: hp(6),
              backgroundColor: colors.primary,
            }}
          />
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: hp(12),
              color: colors.black,
              marginLeft: wp(15),
            }}
          >
            Step 1
          </Text>
        </View>
        <InputText title="Fry the chicken" />
      </View>
      <Button title={title} navRoute={() => null} />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(40),
  },
  headerTxt: {
    fontFamily: "Bold",
    fontSize: hp(16),
    color: colors.black,
  },
});
