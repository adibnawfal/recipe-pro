import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Menu, MenuItem } from "react-native-material-menu";
import { Provider, Dialog, Portal } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText, SectionBreak } from "../../components";
import { CATEGORY_DATA } from "../../data/CATEGORY_DATA";
import { CUISINETYPE_DATA } from "../../data/CUISINETYPE_DATA";
import { DIFFICULTY_DATA } from "../../data/DIFFICULTY_DATA";

export default function AddRecipeScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [menu, setMenu] = useState(false);
  const [image, setImage] = useState(null);
  const [visibleCategory, setVisibleCategory] = useState(false);
  const [visibleCuisineType, setVisibleCuisineType] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);
  const [visibleDifficulty, setVisibleDifficulty] = useState(false);
  const [category, setCategory] = useState(null);
  const [cuisineType, setCuisineType] = useState(null);
  const [time, setTime] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [difficulty, setDifficulty] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [36, 23],
      quality: 1,
    });

    console.log(result);

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

  const renderHeader = () => {
    return (
      <View>
        <TouchableOpacity onPress={() => pickImage()}>
          <ImageBackground
            source={{ uri: image }}
            resizeMode="cover"
            style={{
              height: hp(230),
              backgroundColor: colors.lightGrey,
            }}
          >
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: wp(27),
                paddingVertical: hp(10),
                backgroundColor: image ? "rgba(0, 0, 0, 0.3)" : null,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: wp(38) }} />
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
                        backgroundColor: image
                          ? "rgba(0, 0, 0, 0.5)"
                          : "rgba(0, 0, 0, 0.3)",
                      }}
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
                    onPress={() => setMenu(false)}
                  >
                    Clear Content
                  </MenuItem>
                </Menu>
              </View>
              {image ? (
                <View
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    borderRadius: wp(29) / 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: hp(12),
                      color: colors.white,
                      marginHorizontal: wp(10),
                      marginVertical: hp(5),
                    }}
                  >
                    Change Image
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(12),
                    color: colors.darkGrey,
                  }}
                >
                  Upload Image
                </Text>
              )}
              <View style={{ width: "100%", height: wp(38) }} />
            </SafeAreaView>
          </ImageBackground>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            paddingHorizontal: wp(27),
            paddingTop: hp(25),
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.black,
                marginBottom: hp(15),
              }}
            >
              Recipe Name
            </Text>
            <InputText title="Fried Chicken" />
          </View>
          <View style={{ marginVertical: hp(15) }}>
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.black,
                marginBottom: hp(15),
              }}
            >
              Category
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                height: hp(55),
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: wp(10),
                backgroundColor: colors.lightGrey,
                paddingHorizontal: wp(27),
              }}
              onPress={() => setVisibleCategory(true)}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: hp(12),
                  color: category === null ? colors.darkGrey : colors.black,
                }}
              >
                {category === null ? "Select Category" : category}
              </Text>
              <MaterialIcons
                name="expand-more"
                size={24}
                color={colors.darkGrey}
              />
            </TouchableOpacity>
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
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.black,
                marginBottom: hp(15),
              }}
            >
              Cuisine Type
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                height: hp(55),
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: wp(10),
                backgroundColor: colors.lightGrey,
                paddingHorizontal: wp(27),
              }}
              onPress={() => setVisibleCuisineType(true)}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: hp(12),
                  color: cuisineType === null ? colors.darkGrey : colors.black,
                }}
              >
                {cuisineType === null ? "Select Cuisine Type" : cuisineType}
              </Text>
              <MaterialIcons
                name="expand-more"
                size={24}
                color={colors.darkGrey}
              />
            </TouchableOpacity>
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
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: hp(15),
            }}
          >
            <View style={{ width: wp(145) }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: hp(12),
                  color: colors.black,
                  marginBottom: hp(15),
                }}
              >
                Time
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: hp(55),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: wp(10),
                  backgroundColor: colors.lightGrey,
                }}
                onPress={() => setVisibleTime(true)}
              >
                <MaterialIcons name="timer" size={24} color={colors.darkGrey} />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(12),
                    color: colors.darkGrey,
                    marginLeft: wp(5),
                  }}
                >
                  {time} Min
                </Text>
              </TouchableOpacity>
              <Portal>
                <Dialog
                  visible={visibleTime}
                  onDismiss={() => setVisibleTime(false)}
                >
                  <Dialog.ScrollArea
                    style={{
                      paddingHorizontal: 0,
                      paddingVertical: hp(25),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* <FlatList
                      data={CUISINETYPE_DATA}
                      renderItem={({ item }) => renderCuisineType(item)}
                      keyExtractor={(item) => item.id}
                      keyboardShouldPersistTaps="always"
                    /> */}
                    <Text
                      style={{
                        fontFamily: "Bold",
                        fontSize: hp(12),
                        color: colors.black,
                        marginBottom: hp(25),
                      }}
                    >
                      Cooking Time
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: wp(30),
                            height: wp(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: wp(5),
                            backgroundColor: colors.lightGrey,
                          }}
                          onPress={day === 30 ? null : () => setDay(day + 1)}
                        >
                          <MaterialIcons
                            name="expand-less"
                            size={24}
                            color={colors.darkGrey}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "Bold",
                            fontSize: hp(12),
                            color: colors.black,
                            marginVertical: hp(5),
                          }}
                        >
                          {day}
                        </Text>
                        <TouchableOpacity
                          style={{
                            width: wp(30),
                            height: wp(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: wp(5),
                            backgroundColor: colors.lightGrey,
                          }}
                          onPress={day === 0 ? null : () => setDay(day - 1)}
                        >
                          <MaterialIcons
                            name="expand-more"
                            size={24}
                            color={colors.darkGrey}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "Regular",
                            fontSize: hp(10),
                            color: colors.black,
                            marginTop: hp(5),
                          }}
                        >
                          Days
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginHorizontal: wp(15),
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: wp(30),
                            height: wp(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: wp(5),
                            backgroundColor: colors.lightGrey,
                          }}
                          onPress={hour === 24 ? null : () => setHour(hour + 1)}
                        >
                          <MaterialIcons
                            name="expand-less"
                            size={24}
                            color={colors.darkGrey}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "Bold",
                            fontSize: hp(12),
                            color: colors.black,
                            marginVertical: hp(5),
                          }}
                        >
                          {hour}
                        </Text>
                        <TouchableOpacity
                          style={{
                            width: wp(30),
                            height: wp(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: wp(5),
                            backgroundColor: colors.lightGrey,
                          }}
                          onPress={hour === 0 ? null : () => setHour(hour - 1)}
                        >
                          <MaterialIcons
                            name="expand-more"
                            size={24}
                            color={colors.darkGrey}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "Regular",
                            fontSize: hp(10),
                            color: colors.black,
                            marginTop: hp(5),
                          }}
                        >
                          Hours
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            width: wp(30),
                            height: wp(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: wp(5),
                            backgroundColor: colors.lightGrey,
                          }}
                          onPress={
                            minute === 60 ? null : () => setMinute(minute + 1)
                          }
                        >
                          <MaterialIcons
                            name="expand-less"
                            size={24}
                            color={colors.darkGrey}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "Bold",
                            fontSize: hp(12),
                            color: colors.black,
                            marginVertical: hp(5),
                          }}
                        >
                          {minute}
                        </Text>
                        <TouchableOpacity
                          style={{
                            width: wp(30),
                            height: wp(30),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: wp(5),
                            backgroundColor: colors.lightGrey,
                          }}
                          onPress={
                            minute === 0 ? null : () => setMinute(minute - 1)
                          }
                        >
                          <MaterialIcons
                            name="expand-more"
                            size={24}
                            color={colors.darkGrey}
                          />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "Regular",
                            fontSize: hp(10),
                            color: colors.black,
                            marginTop: hp(5),
                          }}
                        >
                          Mins
                        </Text>
                      </View>
                    </View>
                  </Dialog.ScrollArea>
                </Dialog>
              </Portal>
            </View>
            <View style={{ width: wp(145) }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: hp(12),
                  color: colors.black,
                  marginBottom: hp(15),
                }}
              >
                Difficulty
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  height: hp(55),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: wp(10),
                  backgroundColor: colors.lightGrey,
                }}
                onPress={() => setVisibleDifficulty(true)}
              >
                <MaterialIcons
                  name="speed"
                  size={24}
                  color={difficulty === null ? colors.darkGrey : colors.black}
                />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: hp(12),
                    color: difficulty === null ? colors.darkGrey : colors.black,
                    marginLeft: wp(5),
                  }}
                >
                  {difficulty === null ? "Easy" : difficulty}
                </Text>
              </TouchableOpacity>
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
            </View>
          </View>
          <SectionBreak />
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
              0 Items
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: hp(12),
                color: colors.darkGrey,
              }}
            >
              Add Ingredient
            </Text>
            <TouchableOpacity
              style={{
                width: wp(55),
                height: wp(55),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: wp(10),
                backgroundColor: colors.lightGrey,
              }}
              onPress={() =>
                navigation.navigate("Ingredient", {
                  title: "Add Ingredient",
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
            Step-By-Step
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            0 Steps
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            Add Step
          </Text>
          <TouchableOpacity
            style={{
              width: wp(55),
              height: wp(55),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: wp(10),
              backgroundColor: colors.lightGrey,
            }}
            onPress={() =>
              navigation.navigate("Step", {
                title: "Add Step",
              })
            }
          >
            <MaterialIcons name="add" size={30} color={colors.darkGrey} />
          </TouchableOpacity>
        </View>
        <Button
          title="Add Recipe"
          navRoute={() => null}
          addStyle={{ marginTop: hp(25) }}
        />
      </View>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider>
      <KeyboardAwareScrollView
        enableAutomaticScroll
        style={{ backgroundColor: colors.white }}
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <StatusBar
            barStyle={image ? "light-content" : "dark-content"}
            backgroundColor="transparent"
            translucent={true}
          />
          <FlatList
            ListHeaderComponent={() => renderHeader()}
            ListFooterComponent={() => renderFooter()}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </KeyboardAwareScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  menuWrap: {
    left: null,
    right: 0,
    width: wp(160),
    marginRight: wp(15),
    backgroundColor: colors.white,
  },
  menuTxt: {
    fontFamily: "SemiBold",
    fontSize: hp(12),
    color: colors.black,
  },
});
