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
import { RECIPE_DATA } from "../../data/RECIPE_DATA";
import { CATEGORY_DATA } from "../../data/CATEGORY_DATA";

export default function HomeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const renderRecipe = (item) => {
    return (
      <TouchableOpacity
        style={{
          width: wp(190),
          height: hp(220),
          borderRadius: wp(10),
          marginRight: wp(15),
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
            <View>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  fontFamily: "Bold",
                  fontSize: hp(12),
                  color: colors.white,
                  marginBottom: hp(5),
                }}
              >
                {item.title}
              </Text>
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

  const renderCategory = (item) => {
    return (
      <TouchableOpacity
        style={{
          height: hp(50),
          marginBottom: hp(15),
          marginHorizontal: wp(27),
          backgroundColor: colors.lightGrey,
        }}
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
              justifyContent: "center",
              paddingHorizontal: wp(27),
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: wp(10),
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.white,
              }}
            >
              {item.title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          marginBottom: hp(15),
          paddingHorizontal: wp(27),
          paddingTop: hp(10),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: hp(25),
          }}
        >
          <View>
            <Text style={styles.title}>Welcome Chef,</Text>
            <Text style={styles.desc}>what do you want to cook today?</Text>
          </View>
          <TouchableOpacity
            style={{
              width: wp(49),
              height: wp(49),
              borderRadius: wp(49) / 2,
              justifyContent: "center",
            }}
          >
            <ImageBackground
              source={require("../../assets/images/profilepicture.jpg")}
              resizeMode="cover"
              style={{ flex: 1 }}
              imageStyle={{ borderRadius: wp(49) }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: wp(49) / 2,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              />
            </ImageBackground>
          </TouchableOpacity>
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
        <View style={{ marginTop: hp(25), marginBottom: hp(15) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.title, { fontSize: hp(12) }]}>
              Trending Recipe
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("GuestTrendingRecipe", { RECIPE_DATA })
              }
            >
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: hp(12),
                  color: colors.darkGrey,
                }}
              >
                View All
              </Text>
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={colors.darkGrey}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={RECIPE_DATA}
            renderItem={({ item }) => renderRecipe(item)}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="always"
            style={styles.cardWrap}
          />
        </View>
        <View>
          <Text style={[styles.title, { fontSize: hp(12) }]}>Categories</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <FlatList
        data={CATEGORY_DATA}
        renderItem={({ item }) => renderCategory(item)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: "Bold",
    fontSize: hp(16),
    color: colors.black,
  },
  desc: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    marginTop: wp(5),
  },
  searchWrap: {
    flexDirection: "row",
    height: hp(55),
    backgroundColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
  },
  searchTxt: {
    flex: 1,
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.black,
    marginLeft: wp(15),
  },
  cardWrap: {
    overflow: "hidden",
    marginTop: hp(15),
  },
});
