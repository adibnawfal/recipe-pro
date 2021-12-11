import React from "react";
import AppLoading from "expo-app-loading";
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";

export default function GuestRecipeScreen({ navigation, route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground
        source={item.image}
        resizeMode="cover"
        style={{ height: hp(230) }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: wp(27),
            paddingVertical: hp(10),
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
            <TouchableOpacity
              style={{
                width: wp(38),
                height: wp(38),
                borderRadius: wp(38) / 2,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <MaterialIcons name="share" size={30} color={colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View
        style={{ flex: 1, paddingHorizontal: wp(27), paddingVertical: hp(25) }}
      >
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: hp(18),
            color: colors.black,
            marginBottom: hp(5),
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(14),
            color: colors.darkGrey,
          }}
        >
          {item.by}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.white,
  },
});
