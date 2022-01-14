import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import React, { useState, useRef } from "react";
import { db } from "../../config/Fire";
import { getAuth } from "firebase/auth";
import {
  doc,
  collection,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import AppLoading from "expo-app-loading";
import _ from "lodash";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { SectionBreak } from "../../components";
import { useDoc } from "../../data/useDoc";
import { useCollection } from "../../data/useCollection";

export default function RecipeScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser.uid);
  const recipeRef = collection(db, "recipe");

  const { recipeItem } = route.params;
  const { loadingDoc, dataDoc } = useDoc(userRef);
  const { loadingCollection, dataCollection } = useCollection(recipeRef);
  const [favourite, setFavourite] = useState(recipeItem.favourite);
  const [menu, setMenu] = useState(false);
  const viewShot = useRef();

  const captureAndShareScreenshot = () => {
    viewShot.current.capture().then((uri) => {
      console.log("do something with ", uri);
      Sharing.shareAsync("file://" + uri);
    }),
      (error) => console.error("Oops, snapshot failed", error);
  };

  const handleDeleteRecipe = async () => {
    await deleteDoc(doc(db, "recipe", recipeItem.id)).then(() => {
      Keyboard.dismiss();
      navigation.navigate("HomeMain");
    });
  };

  const handleFavourite = async (item) => {
    if (!item.favourite) {
      await updateDoc(userRef, {
        favourite: arrayUnion({
          id: item.id,
        }),
      });
    } else {
      await updateDoc(userRef, {
        favourite: arrayRemove({ id: item.id }),
      });
    }
  };

  const convertToFraction = (item) => {
    var gcd = function (a, b) {
      if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

      return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
    };

    var fraction = item;
    var len = fraction.toString().length - 2;

    var denominator = Math.pow(10, len);
    var numerator = fraction * denominator;

    var divisor = gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    return Math.floor(numerator) + "/" + Math.floor(denominator);
  };

  const renderIngredient = (item) => {
    let value = 0;

    Number.isInteger(item.value)
      ? (value = item.value.toString())
      : (value = convertToFraction(item.value));

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
          {value + " " + item.measure}
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
    const rating = parseFloat(item.rating).toFixed(1);
    let ingredientLength = 0;

    if (!_.isEmpty(item.ingredient)) {
      ingredientLength = item.ingredient.length;
    }

    return (
      <View>
        <ImageBackground
          source={{ uri: item.image }}
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
                  onPress={() => {
                    handleFavourite(item);
                    setFavourite(!favourite);
                  }}
                >
                  <MaterialIcons
                    name={favourite ? "favorite" : "favorite-outline"}
                    size={30}
                    color={favourite ? colors.red : colors.white}
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
                          : captureAndShareScreenshot
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
                    onPress={captureAndShareScreenshot}
                  >
                    Share
                  </MenuItem>
                  <MenuItem
                    textStyle={styles.menuTxt}
                    onPress={() => {
                      setMenu(false);
                      navigation.navigate("EditRecipe", {
                        title: "Edit Recipe",
                        recipeEdit: recipeData,
                      });
                    }}
                  >
                    Edit Recipe
                  </MenuItem>
                  <MenuItem
                    textStyle={styles.menuTxt}
                    onPress={() => {
                      {
                        handleDeleteRecipe();
                        setMenu(false);
                      }
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
                  {item.time + " Min"}
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
              {ingredientLength} Items
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = (item) => {
    let stepLength = 0;

    if (!_.isEmpty(item.ingredient)) {
      stepLength = item.step.length;
    }

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
            {stepLength} Steps
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
          keyExtractor={(item) => item.id}
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

  if (!fontsLoaded || loadingDoc || loadingCollection) {
    return <AppLoading />;
  }

  let recipeData = {};

  recipeData = _.find(dataCollection, (doc) => {
    return doc.id === recipeItem.id;
  });

  if (_.find(dataDoc.favourite, (item) => item.id === recipeData.id)) {
    recipeData.favourite = true;
  }

  return (
    <View style={styles.container}>
      <ViewShot ref={viewShot} options={{ format: "jpg", quality: 1 }}>
        <View style={{ backgroundColor: colors.white }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          {recipeData ? (
            <FlatList
              data={recipeData.ingredient}
              renderItem={({ item }) => renderIngredient(item)}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={renderHeader(recipeData)}
              ListFooterComponent={renderFooter(recipeData)}
              keyboardShouldPersistTaps="always"
            />
          ) : (
            <AppLoading />
          )}
        </View>
      </ViewShot>
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
