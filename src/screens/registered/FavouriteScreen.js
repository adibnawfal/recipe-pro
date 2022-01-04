import React, { useState, useEffect } from "react";
import { db } from "../../config/Fire";
import { getAuth } from "firebase/auth";
import {
  doc,
  collection,
  updateDoc,
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
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { InputText } from "../../components";
import { useDoc } from "../../data/useDoc";
import { useCollection } from "../../data/useCollection";

export default function FavouriteScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser.uid);
  const recipeRef = collection(db, "recipe");

  const { loadingDoc, dataDoc } = useDoc(userRef);
  const { loadingCollection, dataCollection } = useCollection(recipeRef);
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState([]);
  const [dataHolder, setDataHolder] = useState([]);

  useEffect(() => {
    let data = _.intersectionBy(dataCollection, dataDoc.favourite, "id");

    setData(data);
    setDataHolder(data);
  }, [dataDoc, dataCollection]);

  const searchFilter = (text) => {
    const filterData = dataHolder.filter((item) => {
      let itemData = "";

      itemData = `${item.title.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setData(filterData);
  };

  const handleClearFavourite = async () => {
    setMenu(false);

    await updateDoc(userRef, {
      favourite: [],
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

  const renderRecipe = (item) => {
    const rating = parseFloat(item.rating).toFixed(1);

    return (
      <TouchableOpacity
        style={{
          height: hp(89),
          borderRadius: wp(10),
          marginBottom: hp(15),
          backgroundColor: colors.lightGrey,
        }}
        onPress={() => navigation.navigate("Recipe", { recipeItem: item })}
      >
        <ImageBackground
          source={{ uri: item.image }}
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
                    {rating}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "SemiBold",
                    fontSize: hp(10),
                    color: colors.white,
                  }}
                >
                  <Text>{item.time + " Min"}</Text>
                  <Text> | </Text>
                  <Text>{item.difficulty}</Text>
                </Text>
                <TouchableOpacity onPress={() => handleFavourite(item)}>
                  <MaterialIcons
                    name={item.favourite ? "favorite" : "favorite-outline"}
                    size={24}
                    color={item.favourite ? colors.red : colors.white}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (!fontsLoaded || loadingDoc || loadingCollection) {
    return <AppLoading />;
  }

  let favouriteData = _.forEach(data, (doc) => {
    doc.favourite = true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.header}>
        <View style={{ width: wp(38) }} />
        <Text style={styles.headerTxt}>Favourite</Text>
        <Menu
          visible={menu}
          style={styles.menuWrap}
          anchor={
            <TouchableOpacity
              style={{
                width: wp(38),
                justifyContent: "center",
                alignItems: "flex-end",
              }}
              onPress={() => setMenu(true)}
            >
              <MaterialIcons name="more-vert" size={30} color={colors.black} />
            </TouchableOpacity>
          }
          onRequestClose={() => setMenu(false)}
        >
          <MenuItem
            textStyle={styles.menuTxt}
            onPress={() => handleClearFavourite()}
          >
            Clear Favourite
          </MenuItem>
        </Menu>
      </View>
      <InputText
        title="Search Recipe"
        addStyle={{ marginVertical: hp(25) }}
        onChangeText={(text) => searchFilter(text)}
      />
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
          Result
        </Text>
        <Text
          style={{
            fontFamily: "Bold",
            fontSize: hp(12),
            color: colors.darkGrey,
          }}
        >
          {favouriteData.length} Recipes
        </Text>
      </View>
      <FlatList
        data={favouriteData}
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
