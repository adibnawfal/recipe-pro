import React from "react";
import AppLoading from "expo-app-loading";
import {
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

export default function GuestTrendingRecipeScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const { RECIPE_DATA } = route.params;

  const renderRecipe = (item) => {
    return (
      <TouchableOpacity
        style={{
          height: hp(79),
          borderRadius: wp(10),
          marginBottom: hp(15),
          backgroundColor: colors.lightGrey,
        }}
        onPress={() => navigation.navigate("GuestRecipe", { item })}
      >
        <ImageBackground
          source={item.image}
          resizeMode="cover"
          style={{ flex: 1 }}
          imageStyle={{ borderRadius: wp(10) }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              paddingHorizontal: wp(15),
              paddingVertical: hp(15),
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: wp(10),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  width: wp(200),
                  fontFamily: "Bold",
                  fontSize: hp(12),
                  color: colors.white,
                  marginBottom: hp(5),
                }}
              >
                {item.title}
              </Text>
              <View>
                <View
                  style={{
                    width: wp(54),
                    height: hp(24),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: wp(54) / 2,
                    alignSelf: "flex-end",
                  }}
                >
                  <MaterialIcons name="star" size={14} color={colors.yellow} />
                  <Text
                    style={{
                      fontFamily: "Bold",
                      fontSize: hp(10),
                      color: colors.white,
                      marginLeft: wp(5),
                    }}
                  >
                    {item.rating}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontFamily: "SemiBold",
                    fontSize: hp(10),
                    color: colors.white,
                  }}
                >
                  <Text>{item.time}</Text>
                  <Text> | </Text>
                  <Text>{item.difficulty}</Text>
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={{
            width: wp(38),
            justifyContent: "center",
            alignSelf: "center",
          }}
          onPress={() => navigation.pop()}
        >
          <MaterialIcons name="arrow-back" size={30} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Trending Recipe</Text>
        <View style={{ width: wp(38) }} />
      </View>
      <View style={styles.searchWrap}>
        <TouchableOpacity>
          <MaterialIcons
            name="search"
            size={24}
            color={colors.darkGrey}
            style={{ marginLeft: wp(27) }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Recipes"
          placeholderTextColor={colors.darkGrey}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.searchTxt}
        />
        <TouchableOpacity>
          <MaterialIcons
            name="filter-list"
            size={24}
            color={colors.darkGrey}
            style={{ marginRight: wp(27) }}
          />
        </TouchableOpacity>
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
          style={{ fontFamily: "Bold", fontSize: hp(12), color: colors.black }}
        >
          Result
        </Text>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: hp(12),
            color: colors.darkGrey,
          }}
        >
          {RECIPE_DATA.length} Recipes
        </Text>
      </View>
      <FlatList
        data={RECIPE_DATA}
        renderItem={({ item }) => renderRecipe(item)}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(27),
    paddingTop: hp(10),
    paddingBottom: hp(25),
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTxt: {
    fontFamily: "Bold",
    fontSize: hp(16),
    color: colors.black,
  },
  searchWrap: {
    flexDirection: "row",
    height: hp(55),
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(25),
    borderRadius: wp(10),
  },
  searchTxt: {
    flex: 1,
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.black,
    marginLeft: wp(15),
  },
});
