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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";

export default function GuestRecipeScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
        style={{
          flex: 1,
          paddingHorizontal: wp(27),
          paddingVertical: hp(25),
        }}
      >
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: hp(16),
            color: colors.black,
            marginBottom: hp(5),
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(12),
            color: colors.darkGrey,
          }}
        >
          {item.by}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: hp(25),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="star" size={24} color={colors.yellow} />
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.black,
                marginLeft: wp(10),
              }}
            >
              {item.rating + "\n"}
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: hp(10),
                  color: colors.darkGrey,
                }}
              >
                Rating
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="timer-outline"
              size={24}
              color={colors.black}
            />
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.black,
                marginLeft: wp(10),
              }}
            >
              {item.time + "\n"}
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: hp(10),
                  color: colors.darkGrey,
                }}
              >
                Time
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="speed" size={24} color={colors.black} />
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.black,
                marginLeft: wp(10),
              }}
            >
              {item.difficulty + "\n"}
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: hp(10),
                  color: colors.darkGrey,
                }}
              >
                Difficulty
              </Text>
            </Text>
          </View>
        </View>
        <View style={{ height: hp(15), marginVertical: hp(25) }}>
          <View
            style={{
              position: "absolute",
              height: hp(15),
              left: wp(-27),
              right: wp(-27),
              backgroundColor: colors.lightGrey,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: hp(15),
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.black,
            }}
          >
            Ingredients
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            Items
          </Text>
        </View>
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
