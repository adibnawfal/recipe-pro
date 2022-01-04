import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { db } from "../../config/Fire";
import { getAuth } from "firebase/auth";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AppLoading from "expo-app-loading";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Menu, MenuItem } from "react-native-material-menu";
import {
  Provider,
  Portal,
  Dialog,
  Button as PButton,
} from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import uuid from "react-native-uuid";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText, SectionBreak } from "../../components";
import { useDoc } from "../../data/useDoc";
import { useCollection } from "../../data/useCollection";
import { CATEGORY_DATA } from "../../data/CATEGORY_DATA";
import { CUISINETYPE_DATA } from "../../data/CUISINETYPE_DATA";
import { DIFFICULTY_DATA } from "../../data/DIFFICULTY_DATA";

export default function AddRecipeScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const auth = getAuth();
  const storage = getStorage();
  const userRef = doc(db, "users", auth.currentUser.uid);
  const recipeRef = collection(db, "recipe");
  const isFocused = useIsFocused();

  const { title, recipeEdit } = route.params;
  const { loadingDoc, dataDoc } = useDoc(userRef);
  const { loadingCollection, dataCollection } = useCollection(recipeRef);
  const [menu, setMenu] = useState(false);
  const [image, setImage] = useState(null);
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState(null);
  const [cuisineType, setCuisineType] = useState(null);
  const [time, setTime] = useState("");
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [ingredient, setIngredient] = useState([]);
  const [step, setStep] = useState([]);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [visibleCuisineType, setVisibleCuisineType] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [visibleDifficulty, setVisibleDifficulty] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Call only when screen open or when back on screen
    if (recipeEdit != null) {
      setImage(recipeEdit.image);
      setRecipeName(recipeEdit.title);
      setCategory(recipeEdit.category);
      setCuisineType(recipeEdit.cuisineType);
      setTime(recipeEdit.time);
      setDifficulty(recipeEdit.difficulty);
      setIngredient(recipeEdit.ingredient);
      setStep(recipeEdit.step);
    }
  }, [isFocused, recipeEdit]);

  const handleClearContent = () => {
    setImage(null);
    setRecipeName("");
    setCategory(null);
    setCuisineType(null);
    setTime("");
    setDifficulty(null);
    setIngredient([]);
    setStep([]);
    Keyboard.dismiss();
    setMenu(false);
  };

  const handleAddRecipe = async () => {
    if (
      image != null &&
      recipeName != "" &&
      category != null &&
      cuisineType != null &&
      time != "" &&
      difficulty != null &&
      ingredient.length != 0 &&
      step.length != 0
    ) {
      const uploadUrl = await uploadImageAsync(image);
      const docRef = await addDoc(recipeRef, {
        userId: auth.currentUser.uid,
        userName: dataDoc.fullName,
        title: recipeName,
        image: uploadUrl,
        category: category,
        cuisineType: cuisineType,
        time: time,
        difficulty: difficulty,
        rating: 5,
        ratingCount: 0,
        ingredient: ingredient,
        step: step,
        star: [
          { id: 0, bool: false },
          { id: 1, bool: false },
          { id: 2, bool: false },
          { id: 3, bool: false },
          { id: 4, bool: false },
        ],
      });

      await updateDoc(userRef, {
        myRecipe: arrayUnion({
          id: docRef.id,
        }),
      }).then(() => {
        setImage(null);
        setRecipeName("");
        setCategory(null);
        setCuisineType(null);
        setTime("");
        setDifficulty(null);
        setIngredient([]);
        setStep([]);
        navigation.navigate("HomeMain");
      });

      Keyboard.dismiss();
    } else {
      Keyboard.dismiss();
      setVisible(true);
    }
  };

  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, "images/" + uuid.v4() + ".jpg");
    await uploadBytes(storageRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(storageRef);
  };

  const handleTime = () => {
    setVisibleTime(false);
    setTime(minute);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [36, 23],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const renderCategory = (item) => {
    return (
      <TouchableOpacity
        style={{
          height: hp(55),
          justifyContent: "center",
          paddingLeft: wp(27),
          borderBottomWidth: item.title === "Low Calorie" ? 0 : 1,
          borderBottomColor: colors.darkGrey,
          backgroundColor:
            category === item.title ? colors.primary : colors.white,
        }}
        onPress={() => {
          setCategory(item.title);
          setVisibleCategory(false);
        }}
      >
        <Text
          style={{
            fontFamily: category === item.title ? "Bold" : "Regular",
            fontSize: hp(12),
            color: category === item.title ? colors.white : colors.black,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCuisineType = (item) => {
    return (
      <TouchableOpacity
        style={{
          height: hp(55),
          justifyContent: "center",
          paddingLeft: wp(27),
          borderBottomWidth: item.title === "Other Cuisine" ? 0 : 1,
          borderBottomColor: colors.darkGrey,
          backgroundColor:
            cuisineType === item.title ? colors.primary : colors.white,
        }}
        onPress={() => {
          setCuisineType(item.title);
          setVisibleCuisineType(false);
        }}
      >
        <Text
          style={{
            fontFamily: cuisineType === item.title ? "Bold" : "Regular",
            fontSize: hp(12),
            color: cuisineType === item.title ? colors.white : colors.black,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderDifficulty = (item) => {
    return (
      <TouchableOpacity
        style={{
          height: hp(55),
          justifyContent: "center",
          paddingLeft: wp(27),
          borderBottomWidth: item.title === "Hard" ? 0 : 1,
          borderBottomColor: colors.darkGrey,
          backgroundColor:
            difficulty === item.title ? colors.primary : colors.white,
        }}
        onPress={() => {
          setDifficulty(item.title);
          setVisibleDifficulty(false);
        }}
      >
        <Text
          style={{
            fontFamily: difficulty === item.title ? "Bold" : "Regular",
            fontSize: hp(12),
            color: difficulty === item.title ? colors.white : colors.black,
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
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

  const renderIngredient = (item, index) => {
    let value;

    Number.isInteger(item.value)
      ? (value = item.value.toString())
      : (value = convertToFraction(item.value));

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: hp(15),
        }}
        onPress={() =>
          navigation.navigate("EditIngredient", {
            title: "Edit Ingredient",
            recipeEdit: recipeEdit,
            data: ingredient,
            editData: item,
            index: index,
          })
        }
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
      </TouchableOpacity>
    );
  };

  const renderStep = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginBottom: hp(15),
        }}
        onPress={() =>
          navigation.navigate("EditStep", {
            title: "Edit Step",
            recipeEdit: recipeEdit,
            data: step,
            editData: item,
            index: index,
          })
        }
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
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => pickImage()}>
          <ImageBackground
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.imgWrap}
          >
            <SafeAreaView
              style={[
                styles.imgBody,
                { backgroundColor: image ? "rgba(0, 0, 0, 0.3)" : null },
              ]}
            >
              <View style={styles.headerWrap}>
                {title === "Edit Recipe" ? (
                  <TouchableOpacity
                    style={[
                      styles.menuBtn,
                      {
                        backgroundColor: image
                          ? "rgba(0, 0, 0, 0.5)"
                          : "rgba(0, 0, 0, 0.3)",
                      },
                    ]}
                    onPress={() => navigation.pop()}
                  >
                    <MaterialIcons
                      name="arrow-back"
                      size={30}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{ width: wp(38) }} />
                )}
                <Menu
                  visible={menu}
                  style={styles.menuWrap}
                  anchor={
                    <TouchableOpacity
                      style={[
                        styles.menuBtn,
                        {
                          backgroundColor: image
                            ? "rgba(0, 0, 0, 0.5)"
                            : "rgba(0, 0, 0, 0.3)",
                        },
                      ]}
                      onPress={() => setMenu(true)}
                    >
                      <MaterialIcons
                        name="more-vert"
                        size={30}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  }
                  onRequestClose={() => setMenu(false)}
                >
                  <MenuItem
                    textStyle={styles.menuTxt}
                    onPress={() => handleClearContent()}
                  >
                    Clear Content
                  </MenuItem>
                </Menu>
              </View>
              {image ? (
                <View style={styles.changeImgWrap}>
                  <Text style={styles.changeImgTxt}>Change Image</Text>
                </View>
              ) : (
                <Text style={styles.uploadImgTxt}>Upload Image</Text>
              )}
              <View style={{ width: "100%", height: wp(38) }} />
            </SafeAreaView>
          </ImageBackground>
        </TouchableOpacity>
        <View style={styles.bodyWrap}>
          <View>
            <Text style={styles.recipeNameTxt}>Recipe Name</Text>
            <InputText
              title="Fried Chicken"
              value={recipeName}
              onChangeText={(recipeName) => setRecipeName(recipeName)}
            />
          </View>
          <View style={{ marginVertical: hp(15) }}>
            <Text style={styles.categoryTxt}>Category</Text>
            <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() => setVisibleCategory(true)}
            >
              <Text
                style={[
                  styles.categoryBtnTxt,
                  { color: category === null ? colors.darkGrey : colors.black },
                ]}
              >
                {category === null ? "Select Category" : category}
              </Text>
              <MaterialIcons
                name="expand-more"
                size={24}
                color={colors.darkGrey}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.cuisineTypeTxt}>Cuisine Type</Text>
            <TouchableOpacity
              style={styles.cuisineTypeBtn}
              onPress={() => setVisibleCuisineType(true)}
            >
              <Text
                style={[
                  styles.cuisineTypeBtnTxt,
                  {
                    color:
                      cuisineType === null ? colors.darkGrey : colors.black,
                  },
                ]}
              >
                {cuisineType === null ? "Select Cuisine Type" : cuisineType}
              </Text>
              <MaterialIcons
                name="expand-more"
                size={24}
                color={colors.darkGrey}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeDifficultyWrap}>
            <View style={{ width: wp(145) }}>
              <Text style={styles.timeTxt}>Time</Text>
              <View style={styles.timeBtn}>
                <MaterialIcons
                  name="timer"
                  size={24}
                  color={time != "" ? colors.black : colors.darkGrey}
                />
                <TextInput
                  placeholder="0"
                  placeholderTextColor={colors.darkGrey}
                  keyboardType="numeric"
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(12),
                    color: colors.black,
                  }}
                  textAlign="center"
                  value={time}
                  onChangeText={(time) => setTime(time)}
                />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(12),
                    color: time != "" ? colors.black : colors.darkGrey,
                  }}
                >
                  Min
                </Text>
              </View>
              {/* <TouchableOpacity
                style={styles.timeBtn}
                onPress={() => setVisibleTime(true)}
              >
                <MaterialIcons name="timer" size={24} color={colors.darkGrey} />
                <Text style={styles.timeBtnTxt}>{time} Min</Text>
              </TouchableOpacity> */}
            </View>
            <View style={{ width: wp(145) }}>
              <Text style={styles.timeTxt}>Difficulty</Text>
              <TouchableOpacity
                style={styles.timeBtn}
                onPress={() => setVisibleDifficulty(true)}
              >
                <MaterialIcons
                  name="speed"
                  size={24}
                  color={difficulty === null ? colors.darkGrey : colors.black}
                />
                <Text
                  style={[
                    styles.timeBtnTxt,
                    {
                      color:
                        difficulty === null ? colors.darkGrey : colors.black,
                    },
                  ]}
                >
                  {difficulty === null ? "Easy" : difficulty}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <SectionBreak />
          <View style={styles.ingredientWrap}>
            <Text style={styles.ingredientTxt}>Ingredients</Text>
            <Text style={styles.ingredientCountTxt}>
              {ingredient.length} Items
            </Text>
          </View>
          {ingredient.length > 0 ? (
            <FlatList
              data={ingredient}
              renderItem={({ item, index }) => renderIngredient(item, index)}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="always"
            />
          ) : null}
          <View style={styles.addIngredientWrap}>
            <Text style={styles.addIngredientTxt}>Add Ingredient</Text>
            <TouchableOpacity
              style={styles.addIngredientBtn}
              onPress={() =>
                navigation.navigate("Ingredient", {
                  title: "Add Ingredient",
                  data: ingredient,
                })
              }
            >
              <MaterialIcons name="add" size={30} color={colors.darkGrey} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerWrap}>
        <SectionBreak />
        <View style={styles.stepWrap}>
          <Text style={styles.stepTxt}>Step-By-Step</Text>
          <Text style={styles.stepCountTxt}>{step.length} Steps</Text>
        </View>
        {step.length > 0 ? (
          <FlatList
            data={step}
            renderItem={({ item, index }) => renderStep(item, index)}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="always"
          />
        ) : null}
        <View style={styles.addStepWrap}>
          <Text style={styles.addStepTxt}>Add Step</Text>
          <TouchableOpacity
            style={styles.addStepBtn}
            onPress={() =>
              navigation.navigate("Step", {
                title: "Add Step",
                data: step,
                index: step.length,
              })
            }
          >
            <MaterialIcons name="add" size={30} color={colors.darkGrey} />
          </TouchableOpacity>
        </View>
        <Button
          title="Add Recipe"
          addStyle={{ marginTop: hp(25) }}
          onPress={() => handleAddRecipe()}
        />
      </View>
    );
  };

  if (!fontsLoaded || loadingDoc || loadingCollection) {
    return <AppLoading />;
  }

  return (
    <Provider>
      <View style={styles.container}>
        <StatusBar
          barStyle={image ? "light-content" : "dark-content"}
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
              Incomplete Details
            </Dialog.Title>
            <Dialog.Content
              style={{ paddingHorizontal: wp(20), alignItems: "center" }}
            >
              <Text style={styles.dialogIncompleteTxt}>
                Please complete your details to continue the add process.
              </Text>
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogActions}>
              <PButton
                uppercase={false}
                color={colors.primary}
                labelStyle={styles.dialogBtnTxt}
                style={styles.dialogBtn}
                onPress={() => setVisible(false)}
              >
                Continue
              </PButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={visibleCategory}
            onDismiss={() => setVisibleCategory(false)}
          >
            <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
              <FlatList
                data={CATEGORY_DATA}
                renderItem={({ item }) => renderCategory(item)}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="always"
              />
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={visibleCuisineType}
            onDismiss={() => setVisibleCuisineType(false)}
          >
            <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
              <FlatList
                data={CUISINETYPE_DATA}
                renderItem={({ item }) => renderCuisineType(item)}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="always"
              />
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={visibleTime} onDismiss={() => handleTime()}>
            <Dialog.ScrollArea style={styles.dialogTimeWrap}>
              <Text style={styles.dialogTimeTxt}>Cooking Time</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.dialogCountWrap}>
                  <TouchableOpacity
                    style={styles.dialogCountBtn}
                    onPress={day === 30 ? null : () => setDay(day + 1)}
                  >
                    <MaterialIcons
                      name="expand-less"
                      size={24}
                      color={colors.darkGrey}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dialogCountTxt}>{day}</Text>
                  <TouchableOpacity
                    style={styles.dialogCountBtn}
                    onPress={day === 0 ? null : () => setDay(day - 1)}
                  >
                    <MaterialIcons
                      name="expand-more"
                      size={24}
                      color={colors.darkGrey}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dialogCountTitleTxt}>Days</Text>
                </View>
                <View
                  style={[
                    styles.dialogCountWrap,
                    {
                      marginHorizontal: wp(15),
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={styles.dialogCountBtn}
                    onPress={hour === 24 ? null : () => setHour(hour + 1)}
                  >
                    <MaterialIcons
                      name="expand-less"
                      size={24}
                      color={colors.darkGrey}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dialogCountTxt}>{hour}</Text>
                  <TouchableOpacity
                    style={styles.dialogCountBtn}
                    onPress={hour === 0 ? null : () => setHour(hour - 1)}
                  >
                    <MaterialIcons
                      name="expand-more"
                      size={24}
                      color={colors.darkGrey}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dialogCountTitleTxt}>Hours</Text>
                </View>
                <View style={styles.dialogCountWrap}>
                  <TouchableOpacity
                    style={styles.dialogCountBtn}
                    onPress={minute === 60 ? null : () => setMinute(minute + 1)}
                  >
                    <MaterialIcons
                      name="expand-less"
                      size={24}
                      color={colors.darkGrey}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dialogCountTxt}>{minute}</Text>
                  <TouchableOpacity
                    style={styles.dialogCountBtn}
                    onPress={minute === 0 ? null : () => setMinute(minute - 1)}
                  >
                    <MaterialIcons
                      name="expand-more"
                      size={24}
                      color={colors.darkGrey}
                    />
                  </TouchableOpacity>
                  <Text style={styles.dialogCountTitleTxt}>Mins</Text>
                </View>
              </View>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={visibleDifficulty}
            onDismiss={() => setVisibleDifficulty(false)}
          >
            <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
              <FlatList
                data={DIFFICULTY_DATA}
                renderItem={({ item }) => renderDifficulty(item)}
                keyExtractor={(item) => item.id}
                keyboardShouldPersistTaps="always"
              />
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <FlatList
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={renderFooter()}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imgWrap: {
    height: hp(230),
    backgroundColor: colors.lightGrey,
  },
  imgBody: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(27),
    paddingVertical: hp(10),
  },
  headerWrap: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuWrap: {
    width: wp(160),
    backgroundColor: colors.white,
  },
  menuBtn: {
    width: wp(38),
    height: wp(38),
    borderRadius: wp(38) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTxt: {
    fontFamily: "SemiBold",
    fontSize: hp(12),
    color: colors.black,
  },
  changeImgWrap: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: wp(29) / 2,
  },
  changeImgTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.white,
    marginHorizontal: wp(10),
    marginVertical: hp(5),
  },
  uploadImgTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
  },
  bodyWrap: {
    flex: 1,
    paddingHorizontal: wp(27),
    paddingTop: hp(25),
  },
  recipeNameTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
    marginBottom: hp(15),
  },
  categoryTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
    marginBottom: hp(15),
  },
  categoryBtn: {
    flexDirection: "row",
    height: hp(55),
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: wp(10),
    backgroundColor: colors.lightGrey,
    paddingHorizontal: wp(27),
  },
  categoryBtnTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
  },
  cuisineTypeTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
    marginBottom: hp(15),
  },
  cuisineTypeBtn: {
    flexDirection: "row",
    height: hp(55),
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: wp(10),
    backgroundColor: colors.lightGrey,
    paddingHorizontal: wp(27),
  },
  cuisineTypeBtnTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
  },
  timeDifficultyWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(15),
  },
  timeTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
    marginBottom: hp(15),
  },
  timeBtn: {
    flexDirection: "row",
    height: hp(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
    backgroundColor: colors.lightGrey,
  },
  timeBtnTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    marginLeft: wp(5),
  },
  ingredientWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(15),
  },
  ingredientTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
  },
  ingredientCountTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.darkGrey,
  },
  addIngredientWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addIngredientTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
  },
  addIngredientBtn: {
    width: wp(55),
    height: wp(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
    backgroundColor: colors.lightGrey,
  },
  footerWrap: {
    flex: 1,
    paddingHorizontal: wp(27),
    paddingBottom: hp(25),
  },
  stepWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(15),
  },
  stepTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
  },
  stepCountTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.darkGrey,
  },
  addStepWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addStepTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
  },
  addStepBtn: {
    width: wp(55),
    height: wp(55),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
    backgroundColor: colors.lightGrey,
  },
  dialogTimeWrap: {
    paddingHorizontal: 0,
    paddingVertical: hp(25),
    justifyContent: "center",
    alignItems: "center",
  },
  dialogTimeTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
    marginBottom: hp(25),
  },
  dialogCountWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  dialogCountBtn: {
    width: wp(30),
    height: wp(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(5),
    backgroundColor: colors.lightGrey,
  },
  dialogCountTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
    marginVertical: hp(5),
  },
  dialogCountTitleTxt: {
    fontFamily: "Regular",
    fontSize: hp(10),
    color: colors.black,
    marginTop: hp(5),
  },
  dialogTitleTxt: {
    fontFamily: "Bold",
    fontSize: hp(14),
    color: colors.black,
    textAlign: "center",
  },
  dialogIncompleteTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    textAlign: "center",
  },
  dialogActions: {
    justifyContent: "center",
    paddingHorizontal: wp(20),
    paddingBottom: hp(15),
  },
  dialogBtn: {
    borderRadius: wp(5),
    backgroundColor: colors.primary,
  },
  dialogBtnTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.white,
  },
});
