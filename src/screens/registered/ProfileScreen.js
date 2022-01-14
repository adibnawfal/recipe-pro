import React, { useState } from "react";
import { db } from "../../config/Fire";
import { getAuth, signOut, deleteUser } from "firebase/auth";
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
import {
  Provider,
  Portal,
  Dialog,
  Button as PButton,
} from "react-native-paper";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { useDoc } from "../../data/useDoc";
import { useCollection } from "../../data/useCollection";

export default function ProfileScreen({ navigation }) {
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
  const [visible, setVisible] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleDeleteAccount = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        console.log("User Deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then()
      .catch((error) => {
        console.log(error);
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
          width: wp(190),
          height: hp(220),
          borderRadius: wp(10),
          marginRight: wp(15),
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

  const renderHeader = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: wp(38) }} />
          <Text style={styles.headerTxt}>Profile</Text>
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
                <MaterialIcons
                  name="more-vert"
                  size={30}
                  color={colors.black}
                />
              </TouchableOpacity>
            }
            onRequestClose={() => setMenu(false)}
          >
            <MenuItem
              textStyle={styles.menuTxt}
              onPress={() => {
                setMenu(false);
                handleSignOut();
              }}
            >
              Sign Out
            </MenuItem>
            <MenuItem
              textStyle={styles.menuTxt}
              onPress={() => {
                setMenu(false);
                navigation.navigate("EditProfile");
              }}
            >
              Edit Profile
            </MenuItem>
            <MenuItem
              textStyle={styles.menuTxt}
              onPress={() => {
                setMenu(false);
                navigation.navigate("ChangePassword");
              }}
            >
              Change Password
            </MenuItem>
            <MenuDivider />
            <MenuItem
              textStyle={styles.menuTxt}
              onPress={() => {
                setMenu(false);
                setVisible(true);
              }}
            >
              Delete Account
            </MenuItem>
          </Menu>
        </View>
        <View
          style={{
            width: wp(125),
            height: wp(125),
            borderRadius: wp(125) / 2,
            marginVertical: hp(25),
            justifyContent: "center",
          }}
        >
          <ImageBackground
            source={
              dataDoc.profilePicture != null
                ? { uri: dataDoc.profilePicture }
                : require("../../assets/images/profilepicture.jpg")
            }
            resizeMode="cover"
            style={{ flex: 1 }}
            imageStyle={{ borderRadius: wp(125) }}
          >
            <View
              style={{
                flex: 1,
                borderRadius: wp(125) / 2,
              }}
            />
          </ImageBackground>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.title}>{dataDoc.fullName}</Text>
          <Text style={styles.desc}>{auth.currentUser.email}</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: hp(40),
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>{myRecipeData.length}</Text>
            <Text style={styles.desc}>My Recipe</Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.title}>{favouriteCount}</Text>
            <Text style={styles.desc}>Favourite</Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.title, { fontSize: hp(12) }]}>My Recipe</Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("RecipeList", {
                  title: "My Recipe",
                  recipeData: myRecipeData,
                })
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
            data={myRecipeData}
            renderItem={({ item }) => renderRecipe(item)}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="always"
            style={styles.cardWrap}
          />
        </View>
      </View>
    );
  };

  if (!fontsLoaded || loadingDoc || loadingCollection) {
    return <AppLoading />;
  }

  let favouriteCount = 0;
  let myRecipeData = _.intersectionBy(dataCollection, dataDoc.myRecipe, "id");

  _.forEach(myRecipeData, (doc) => {
    if (_.find(dataDoc.favourite, (item) => item.id === doc.id)) {
      doc.favourite = true;
      favouriteCount++;
    }
  });

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => setVisible(false)}
            style={{ borderRadius: wp(10), backgroundColor: colors.white }}
          >
            <Dialog.Title style={styles.dialogTitleTxt}>
              Delete Account
            </Dialog.Title>
            <Dialog.Content
              style={{ paddingHorizontal: wp(20), alignItems: "center" }}
            >
              <Text style={styles.dialogParaTxt}>
                Are you sure you want to delete your account? This will
                permanently erase your account.
              </Text>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "space-between",
                paddingHorizontal: wp(20),
                paddingBottom: hp(15),
              }}
            >
              <PButton
                uppercase={false}
                color={colors.black}
                labelStyle={styles.dialogBtnTxt}
                style={{
                  width: wp(70),
                }}
                onPress={() => setVisible(false)}
              >
                Cancel
              </PButton>
              <PButton
                uppercase={false}
                color={colors.red}
                labelStyle={[styles.dialogBtnTxt, { color: colors.white }]}
                style={{
                  width: wp(70),
                  borderRadius: wp(5),
                  backgroundColor: colors.red,
                }}
                onPress={() => {
                  handleDeleteAccount();
                  setVisible(false);
                }}
              >
                Delete
              </PButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <FlatList
          ListHeaderComponent={renderHeader()}
          keyboardShouldPersistTaps="always"
        />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: wp(27),
    paddingTop: hp(10),
    paddingBottom: hp(25),
    backgroundColor: colors.white,
  },
  header: {
    width: "100%",
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
  cardWrap: {
    overflow: "hidden",
    marginTop: hp(15),
  },
  dialogTitleTxt: {
    fontFamily: "Bold",
    fontSize: hp(14),
    color: colors.black,
    textAlign: "center",
  },
  dialogParaTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    textAlign: "center",
  },
  dialogBtnTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
  },
});
