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
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { InputText } from "../../components";
import { useDoc } from "../../data/useDoc";
import { useCollection } from "../../data/useCollection";

export default function RecipeListScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const auth = getAuth();
  const userRef = doc(db, "users", auth.currentUser.uid);
  const recipeRef = collection(db, "recipe");
  const isFocused = useIsFocused();

  const { title, recipeData, focus } = route.params;
  const { loadingDoc, dataDoc } = useDoc(userRef);
  const { loadingCollection, dataCollection } = useCollection(recipeRef);
  const [data, setData] = useState(recipeData);
  const [dataHolder, setDataHolder] = useState(recipeData);
  const [recipeListData, setRecipeListData] = useState(recipeData);

  useEffect(() => {
    let tempData = [];

    tempData = _.intersectionBy(dataCollection, data, "id");

    _.forEach(tempData, (doc) => {
      if (_.find(dataDoc.favourite, (item) => item.id === doc.id)) {
        doc.favourite = true;
      }
    });

    setRecipeListData(tempData);
  }, [isFocused, dataCollection, dataDoc, dataDoc.favourite]);

  const searchFilter = (text) => {
    const filterData = dataHolder.filter((item) => {
      let itemData = "";

      itemData = `${item.title.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setData(filterData);
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

      var array = _.forEach(recipeListData, (doc) => {
        if (doc.id === item.id) {
          doc.favourite = !doc.favourite;
        }
      });

      setRecipeListData(array);
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
          }}
          onPress={() => navigation.pop()}
        >
          <MaterialIcons name="arrow-back" size={30} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>{title}</Text>
        <View style={{ width: wp(38) }} />
      </View>
      <InputText
        navigation={navigation}
        title="Search Recipe"
        addStyle={{ marginVertical: hp(25) }}
        onChangeText={(text) => searchFilter(text)}
        focus={focus}
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
          {data.length} Recipes
        </Text>
      </View>
      <FlatList
        data={recipeListData}
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
});
