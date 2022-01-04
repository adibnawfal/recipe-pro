import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import {
  Provider,
  Portal,
  Dialog,
  Button as PButton,
} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
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

  const isFocused = useIsFocused();

  const { title, recipeEdit, data, editData, index } = route.params;
  const [ingredientData, setIngredientData] = useState(data);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [measure, setMeasure] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Call only when screen open or when back on screen
    if (editData != null) {
      setName(editData.name);
      setValue(editData.value);
      setMeasure(editData.measure);
    }
  }, [isFocused, editData]);

  const handleIngredient = async () => {
    if (name != "" && value != "" && measure != "") {
      ingredientData.push({
        id: data.length,
        name: name,
        value: parseFloat(value),
        measure: measure,
      });

      await setIngredientData(ingredientData);

      navigation.pop();
    } else {
      Keyboard.dismiss();
      setVisible(true);
    }
  };

  const handleEditIngredient = async () => {
    const array = [...ingredientData];

    array[index].name = name;
    array[index].value = value;
    array[index].measure = measure;

    await setIngredientData(array);
    navigation.pop();
  };

  const handleDeleteIngredient = async () => {
    const data = recipeEdit;
    let count = 0;

    if (index !== -1) {
      data.ingredient.splice(index, 1);
    }

    data.ingredient.forEach((item) => {
      item.id = count++;
    });

    navigation.navigate({
      name: "EditRecipe",
      params: { recipeEdit: data },
      merge: true,
    });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
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
              Incomplete Details
            </Dialog.Title>
            <Dialog.Content
              style={{ paddingHorizontal: wp(20), alignItems: "center" }}
            >
              <Text style={styles.dialogIncompleteTxt}>
                Please complete your details to continue the add process.
              </Text>
            </Dialog.Content>
            <Dialog.Actions
              style={{
                justifyContent: "center",
                paddingHorizontal: wp(20),
                paddingBottom: hp(15),
              }}
            >
              <PButton
                uppercase={false}
                color={colors.primary}
                labelStyle={styles.dialogBtnTxt}
                style={{
                  borderRadius: wp(5),
                  backgroundColor: colors.primary,
                }}
                onPress={() => setVisible(false)}
              >
                Continue
              </PButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
            {title === "Edit Ingredient" ? (
              <TouchableOpacity
                style={{
                  width: wp(38),
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
                onPress={() => handleDeleteIngredient()}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={30}
                  color={colors.black}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: wp(38) }} />
            )}
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
                  value={value.toString()}
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
        <Button
          title={title}
          onPress={() => {
            title === "Edit Ingredient"
              ? handleEditIngredient()
              : handleIngredient();
          }}
        />
      </SafeAreaView>
    </Provider>
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
  dialogBtnTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.white,
  },
});
