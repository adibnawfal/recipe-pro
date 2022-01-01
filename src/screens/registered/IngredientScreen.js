import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";

export default function IngredientScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const { title, data } = route.params;
  const [ingredientData, setIngredientData] = useState(data);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [measure, setMeasure] = useState("");

  const handleIngredient = async () => {
    ingredientData.push({
      id: data.length,
      name: name,
      value: value,
      measure: measure,
    });

    await setIngredientData(ingredientData);

    navigation.pop();
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View>
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
          <TouchableOpacity
            style={{
              width: wp(38),
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <MaterialIcons
              name="delete-outline"
              size={30}
              color={colors.black}
            />
          </TouchableOpacity>
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
            Ingredient Name
          </Text>
          <InputText
            title="Flour"
            addStyle={{ marginBottom: hp(15) }}
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: hp(12),
              color: colors.black,
              marginBottom: hp(15),
            }}
          >
            Measurement
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ width: wp(145) }}>
              <InputText
                title="0.00"
                value={value}
                onChangeText={(value) => setValue(value)}
              />
            </View>
            <View style={{ width: wp(145) }}>
              <InputText
                title="Cup"
                value={measure}
                onChangeText={(measure) => setMeasure(measure)}
              />
            </View>
          </View>
        </View>
      </View>
      <Button title={title} onPress={() => handleIngredient()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: wp(27),
    paddingTop: hp(10),
    paddingBottom: hp(25),
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
