import React, { useState, useEffect } from "react";
import { db } from "../../config/Fire";
import { collection } from "firebase/firestore";
import AppLoading from "expo-app-loading";
import _ from "lodash";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import {
  Provider,
  Portal,
  Dialog,
  Button as PButton,
} from "react-native-paper";
import RangeSlider from "react-native-range-slider-expo";
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";
import { useCollection } from "../../data/useCollection";
import { CATEGORY_DATA } from "../../data/CATEGORY_DATA";
import { CUISINETYPE_DATA } from "../../data/CUISINETYPE_DATA";

export default function GuestFilterSearchScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const recipeRef = collection(db, "recipe");
  const isFocused = useIsFocused();

  const { loadingCollection, dataCollection } = useCollection(recipeRef);
  const [categoryData, setCategoryData] = useState(CATEGORY_DATA);
  const [cuisineTypeData, setCuisineTypeData] = useState(CUISINETYPE_DATA);
  const [ingredientData, setIngredientData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [include, setInclude] = useState(true);
  const [exclude, setExclude] = useState(false);
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(5);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Call only when screen open or when back on screen
    let tempData = [];
    let count = 0;

    _.forEach(dataCollection, (doc) => {
      tempData = [...tempData, ...doc.ingredient];
    });

    _.forEach(tempData, (doc) => {
      tempData[count] = {
        ...doc,
        id: count++,
        selected: false,
      };
    });

    setIngredientData(tempData);
    setFilterData(tempData);
  }, [isFocused, dataCollection]);

  const handleAdvanceFilter = () => {
    let advanceFilterData = [];

    let filterCategory = _.filter(categoryData, "value");

    if (filterCategory.length === 0) {
      filterCategory = categoryData;
    }

    advanceFilterData = _.intersectionBy(
      dataCollection,
      filterCategory,
      "category"
    );

    let filterCuisineType = _.filter(cuisineTypeData, "value");

    if (filterCuisineType.length === 0) {
      filterCuisineType = cuisineTypeData;
    }

    advanceFilterData = _.intersectionBy(
      advanceFilterData,
      filterCuisineType,
      "cuisineType"
    );

    advanceFilterData = _.filter(advanceFilterData, (doc) => {
      return fromValue <= doc.rating && doc.rating <= toValue;
    });

    let filterIngredient = [];

    if (include) {
      filterIngredient = _.filter(ingredientData, "selected");

      if (filterIngredient.length === 0) {
        filterIngredient = ingredientData;
      }
    } else {
      filterIngredient = _.filter(ingredientData, ["selected", false]);

      if (filterIngredient.length === 0) {
        filterIngredient = ingredientData;
      }
    }

    let tempIngredientData = [];

    _.forEach(advanceFilterData, (item) => {
      _.forEach(item.ingredient, (doc) => {
        _.find(filterIngredient, (filter) => {
          if (filter.name === doc.name) {
            tempIngredientData = [...tempIngredientData, item];
          }
        });
      });
    });

    navigation.navigate("GuestRecipeList", {
      title: "Search Results",
      recipeData: tempIngredientData,
    });
  };

  const searchFilter = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const filterData = ingredientData.filter((item) => {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(filterData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilterData(ingredientData);
      setSearch(text);
    }
  };

  const handleReset = () => {
    let tempCategoryData = _.forEach(categoryData, (doc) => {
      doc.value = false;
    });

    let tempCuisineTypeData = _.forEach(cuisineTypeData, (doc) => {
      doc.value = false;
    });

    let tempIngredientData = _.forEach(ingredientData, (doc) => {
      doc.selected = false;
    });

    setCategoryData(tempCategoryData);
    setFromValue(0);
    setToValue(5);
    setCuisineTypeData(tempCuisineTypeData);
    setFilterData(tempIngredientData);
    setIngredientData(tempIngredientData);
    setSearch("");
    setVisible(false);
  };

  const toggleCategory = (index) => {
    const array = [...categoryData];

    array[index].value = !array[index].value;

    setCategoryData(array);
  };

  const toggleCuisineType = (index) => {
    const array = [...cuisineTypeData];

    array[index].value = !array[index].value;

    setCuisineTypeData(array);
  };

  const toggleIngredient = (index) => {
    const array = [...ingredientData];

    array[index].selected = !array[index].selected;

    setIngredientData(array);
  };

  const renderCategory = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(5),
          marginHorizontal: wp(25),
        }}
        onPress={() => toggleCategory(index)}
      >
        <MaterialIcons
          name={item.value ? "check-circle" : "radio-button-off"}
          size={24}
          color={item.value ? colors.primary : colors.black}
        />
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(12),
            color: colors.black,
            marginLeft: wp(15),
          }}
        >
          {item.category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderIngredient = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(5),
        }}
        onPress={() => toggleIngredient(index)}
      >
        {include ? (
          <MaterialIcons
            name={item.selected ? "add-circle" : "radio-button-off"}
            size={24}
            color={item.selected ? colors.primary : colors.black}
          />
        ) : (
          <MaterialIcons
            name={item.selected ? "remove-circle" : "radio-button-off"}
            size={24}
            color={item.selected ? colors.primary : colors.black}
          />
        )}
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(12),
            color: colors.black,
            marginLeft: wp(15),
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCuisineTypeFooter = () => {
    let ingredientCount = 0;

    _.forEach(ingredientData, (doc) => {
      if (doc.selected === true) {
        ingredientCount++;
      }
    });

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: hp(15),
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
            {ingredientCount > 0
              ? ingredientCount
              : "All" && include
              ? "All"
              : "No"}{" "}
            {include ? "Included" : "Excluded"}
          </Text>
        </View>
        <View
          style={{
            height: hp(35),
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: wp(2),
              borderTopLeftRadius: wp(5),
              borderBottomLeftRadius: wp(5),
              borderColor: colors.primary,
              backgroundColor: include ? colors.primary : colors.white,
            }}
            onPress={() => {
              setInclude(!include);
              setExclude(!exclude);
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(10),
                color: include ? colors.white : colors.primary,
              }}
            >
              + Include
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: wp(2),
              borderTopRightRadius: wp(5),
              borderBottomRightRadius: wp(5),
              borderColor: colors.primary,
              backgroundColor: exclude ? colors.primary : colors.white,
            }}
            onPress={() => {
              setInclude(!include);
              setExclude(!exclude);
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(10),
                color: exclude ? colors.white : colors.primary,
              }}
            >
              - Exclude
            </Text>
          </TouchableOpacity>
        </View>
        <InputText
          title="Search Ingredient"
          addStyle={{ marginVertical: hp(15) }}
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filterData}
          renderItem={({ item, index }) => renderIngredient(item, index)}
          keyExtractor={(item, index) => item.id + index}
          keyboardShouldPersistTaps="always"
        />
        <Button
          title="Apply"
          addStyle={{ marginTop: hp(25) }}
          onPress={() => handleAdvanceFilter()}
        />
      </View>
    );
  };

  const renderCuisineType = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(5),
        }}
        onPress={() => toggleCuisineType(index)}
      >
        <MaterialIcons
          name={item.value ? "check-circle" : "radio-button-off"}
          size={24}
          color={item.value ? colors.primary : colors.black}
        />
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(12),
            color: colors.black,
            marginLeft: wp(15),
          }}
        >
          {item.cuisineType}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    let categoryCount = 0;

    _.forEach(categoryData, (doc) => {
      if (doc.value === true) {
        categoryCount++;
      }
    });

    return (
      <View style={[styles.container, { paddingTop: hp(10) }]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              width: wp(50),
              justifyContent: "center",
            }}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons name="arrow-back" size={30} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>Filter</Text>
          <TouchableOpacity
            style={{
              width: wp(50),
              justifyContent: "center",
              alignItems: "flex-end",
            }}
            onPress={() => {
              setVisible(true);
              Keyboard.dismiss();
            }}
          >
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: hp(12),
                color: colors.primary,
              }}
            >
              Reset
            </Text>
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
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.black,
            }}
          >
            Category
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            {categoryCount > 0 ? categoryCount : "All"} Selected
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    let cuisineTypeCount = 0;

    _.forEach(cuisineTypeData, (doc) => {
      if (doc.value === true) {
        cuisineTypeCount++;
      }
    });

    return (
      <View style={[styles.container, { paddingBottom: hp(25) }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: hp(15),
          }}
        >
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.black,
            }}
          >
            Rating
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            {parseFloat(fromValue).toFixed(1)} -{" "}
            {parseFloat(toValue).toFixed(1)}
          </Text>
        </View>
        <RangeSlider
          min={0}
          max={5}
          step={0.1}
          fromValueOnChange={(value) => setFromValue(value)}
          toValueOnChange={(value) => setToValue(value)}
          styleSize="small"
          fromKnobColor={colors.primary}
          toKnobColor={colors.primary}
          inRangeBarColor={colors.primary}
          outOfRangeBarColor={colors.darkGrey}
          valueLabelsTextColor={colors.white}
          valueLabelsBackgroundColor={colors.primary}
          rangeLabelsTextColor={colors.darkGrey}
          initialFromValue={fromValue}
          initialToValue={toValue}
        />
        {/* <Slider
          style={{ height: hp(35) }}
          minimumValue={0}
          maximumValue={5}
          step={0.1}
          value={toValue}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.darkGrey}
          onSlidingComplete={(value) => setToValue(value)}
        /> */}
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
            Cuisine Type
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            {cuisineTypeCount > 0 ? cuisineTypeCount : "All"} Selected
          </Text>
        </View>
        <FlatList
          data={cuisineTypeData}
          renderItem={({ item, index }) => renderCuisineType(item, index)}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderCuisineTypeFooter()}
          keyboardShouldPersistTaps="always"
        />
      </View>
    );
  };

  if (!fontsLoaded || loadingCollection) {
    return <AppLoading />;
  }

  return (
    <Provider>
      <SafeAreaView style={{ backgroundColor: colors.white }}>
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
              Reset Changes
            </Dialog.Title>
            <Dialog.Content
              style={{ paddingHorizontal: wp(20), alignItems: "center" }}
            >
              <Text style={styles.dialogParaTxt}>
                Are you sure you want to reset changes made on this filter?
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
                color={colors.primary}
                labelStyle={styles.dialogBtnTxt}
                style={{
                  width: wp(70),
                }}
                onPress={() => handleReset()}
              >
                Reset
              </PButton>
              <PButton
                uppercase={false}
                color={colors.primary}
                labelStyle={[styles.dialogBtnTxt, { color: colors.white }]}
                style={{
                  width: wp(70),
                  borderRadius: wp(5),
                  backgroundColor: colors.primary,
                }}
                onPress={() => setVisible(false)}
              >
                Cancel
              </PButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <FlatList
          data={categoryData}
          renderItem={({ item, index }) => renderCategory(item, index)}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader()}
          ListFooterComponent={renderFooter()}
          keyboardShouldPersistTaps="always"
        />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(27),
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(40),
  },
  headerTxt: {
    fontFamily: "Bold",
    fontSize: hp(16),
    color: colors.black,
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
    color: colors.primary,
  },
});
