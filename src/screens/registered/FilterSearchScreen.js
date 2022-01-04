import React, { useCallback, useState } from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Slider from "@react-native-community/slider";
import RangeSlider from "react-native-range-slider-expo";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";
import { CATEGORY_DATA } from "../../data/CATEGORY_DATA";
import { CUISINETYPE_DATA } from "../../data/CUISINETYPE_DATA";

export default function FilterSearchScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [category, setCategory] = useState(false);
  const [cuisineType, setCuisineType] = useState(false);
  const [include, setInclude] = useState(true);
  const [exclude, setExclude] = useState(false);
  const [toRating, setToRating] = useState(5);

  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(5);

  const renderCategory = (item) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(5),
          marginHorizontal: wp(25),
        }}
        onPress={() => setCategory(item.title)}
      >
        <MaterialIcons
          name={category === item.title ? "check-circle" : "radio-button-off"}
          size={24}
          color={category === item.title ? colors.primary : colors.black}
        />
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(12),
            color: colors.black,
            marginLeft: wp(15),
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
          flexDirection: "row",
          alignItems: "center",
          marginBottom: hp(5),
        }}
        onPress={() => setCuisineType(item.title)}
      >
        <MaterialIcons
          name={
            cuisineType === item.title ? "check-circle" : "radio-button-off"
          }
          size={24}
          color={cuisineType === item.title ? colors.primary : colors.black}
        />
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: hp(12),
            color: colors.black,
            marginLeft: wp(15),
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
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
            All Selected
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
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
        {/* <View>
          <RangeSlider
            min={0}
            max={5}
            step={0.1}
            fromValueOnChange={useCallback((value) => setFromValue(value), [])}
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
        </View> */}
        <Slider
          style={{ height: hp(35) }}
          minimumValue={0}
          maximumValue={5}
          step={0.1}
          value={toValue}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.darkGrey}
          onSlidingComplete={(value) => setToValue(value)}
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
            Cuisine Type
          </Text>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.darkGrey,
            }}
          >
            All Selected
          </Text>
        </View>
        <FlatList
          data={CUISINETYPE_DATA}
          renderItem={({ item }) => renderCuisineType(item)}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="always"
        />
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
            All {include ? "Included" : "Excluded"}
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
        />
        <Button
          title="Apply"
          addStyle={{ marginTop: hp(25) }}
          navRoute={() => null}
        />
      </View>
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <FlatList
        data={CATEGORY_DATA}
        renderItem={({ item }) => renderCategory(item)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter()}
        keyboardShouldPersistTaps="always"
      />
    </SafeAreaView>
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
});
