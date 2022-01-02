import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import AppLoading from "expo-app-loading";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";

import { SectionBreak } from "../../components";

export default function RecipeScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const auth = getAuth();

  const { item } = route.params;
  const [menu, setMenu] = useState(false);

  const renderIngredient = (item) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: hp(15),
          marginHorizontal: wp(27),
        }}
      >
        <View
          style={{
            flex: 1,
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: wp(5),
          }}
        >
          <View
            style={{
              width: wp(3),
              height: "100%",
              backgroundColor: colors.primary,
            }}
          />
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: hp(12),
              color: colors.black,
              marginVertical: hp(4),
              marginLeft: wp(17),
              marginRight: wp(17),
            }}
          >
            {item.name}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(12),
            color: colors.black,
          }}
        >
          {item.measure}
        </Text>
      </View>
    );
  };

  const renderStep = (item) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: hp(15),
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
          {item.txt}
        </Text>
      </View>
    );
  };

  const renderStar = () => {
    return (
      <TouchableOpacity>
        <MaterialIcons name="star-outline" size={30} color={colors.darkGrey} />
      </TouchableOpacity>
    );
  };

  const renderHeader = (item) => {
    let rating = parseFloat(item.rating).toFixed(1);

    return (
      <View>
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
                <MaterialIcons
                  name="arrow-back"
                  size={30}
                  color={colors.white}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  <MaterialIcons
                    name="favorite-outline"
                    size={30}
                    color={colors.white}
                  />
                </TouchableOpacity>

                <Menu
                  visible={menu}
                  style={styles.menuWrap}
                  anchor={
                    <TouchableOpacity
                      style={{
                        width: wp(38),
                        height: wp(38),
                        borderRadius: wp(38) / 2,
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: wp(15),
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                      onPress={
                        item.userId === auth.currentUser.uid
                          ? () => setMenu(true)
                          : null
                      }
                    >
                      <MaterialIcons
                        name={
                          item.userId === auth.currentUser.uid
                            ? "more-vert"
                            : "share"
                        }
                        size={30}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  }
                  onRequestClose={() => setMenu(false)}
                >
                  <MenuItem
                    textStyle={styles.menuTxt}
                    onPress={() => {
                      setMenu(false);
                    }}
                  >
                    Share
                  </MenuItem>
                  <MenuItem
                    textStyle={styles.menuTxt}
                    onPress={() => {
                      setMenu(false);
                    }}
                  >
                    Edit Recipe
                  </MenuItem>
                  <MenuItem
                    textStyle={styles.menuTxt}
                    onPress={() => {
                      setMenu(false);
                    }}
                  >
                    Delete Recipe
                  </MenuItem>
                </Menu>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            paddingHorizontal: wp(27),
            paddingTop: hp(25),
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
            {item.userName}
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
              <View style={{ marginLeft: wp(10) }}>
                <Text
                  style={{
                    fontFamily: "Bold",
                    fontSize: hp(12),
                    color: colors.black,
                  }}
                >
                  {rating}
                </Text>
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(10),
                    color: colors.darkGrey,
                  }}
                >
                  Rating
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="timer" size={24} color={colors.black} />
              <View style={{ marginLeft: wp(10) }}>
                <Text
                  style={{
                    fontFamily: "Bold",
                    fontSize: hp(12),
                    color: colors.black,
                  }}
                >
                  {item.time}
                </Text>
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(10),
                    color: colors.darkGrey,
                  }}
                >
                  Time
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="speed" size={24} color={colors.black} />
              <View style={{ marginLeft: wp(10) }}>
                <Text
                  style={{
                    fontFamily: "Bold",
                    fontSize: hp(12),
                    color: colors.black,
                  }}
                >
                  {item.difficulty}
                </Text>
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(10),
                    color: colors.darkGrey,
                  }}
                >
                  Difficulty
                </Text>
              </View>
            </View>
          </View>
          <SectionBreak />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
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
              {item.ingredient.length} Items
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = (item) => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: wp(27),
          paddingBottom: hp(25),
        }}
      >
        <SectionBreak />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.black,
            }}
          >
            Step-By-Step
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            {item.step.length} Steps
          </Text>
        </View>
        <FlatList
          data={item.step}
          renderItem={({ item }) => renderStep(item)}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="always"
        />
        <SectionBreak />
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: hp(12),
            color: colors.black,
          }}
        >
          Rate this recipe
        </Text>
        <FlatList
          horizontal
          data={item.star}
          renderItem={({ item }) => renderStar(item)}
          keyExtractor={(item) => item.no}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: hp(15),
          }}
        />
      </View>
    );
  };

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
      <FlatList
        data={item.ingredient}
        renderItem={({ item }) => renderIngredient(item)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader(item)}
        ListFooterComponent={renderFooter(item)}
        keyboardShouldPersistTaps="always"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  menuWrap: {
    width: wp(160),
    backgroundColor: colors.white,
  },
  menuTxt: {
    fontFamily: "SemiBold",
    fontSize: hp(12),
    color: colors.black,
  },
});
