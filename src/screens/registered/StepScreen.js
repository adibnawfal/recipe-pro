import React, { useState, useEffect } from "react";
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
import { useIsFocused } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";

export default function StepScreen({ navigation, route }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const isFocused = useIsFocused();

  const { title, recipeEdit, data, editData, index } = route.params;
  const [stepData, setStepData] = useState(data);
  const [txt, setTxt] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Call only when screen open or when back on screen
    if (editData != null) {
      setTxt(editData.txt);
    }
  }, [isFocused, editData]);

  const handleStep = async () => {
    if (txt != "") {
      stepData.push({
        id: data.length,
        txt: txt,
      });

      await setStepData(stepData);

      navigation.pop();
    } else {
      Keyboard.dismiss();
      setVisible(true);
    }
  };

  const handleEditStep = async () => {
    const array = [...stepData];

    array[index].txt = txt;

    await setStepData(array);
    navigation.pop();
  };

  const handleDeleteStep = async () => {
    const data = recipeEdit;
    let count = 0;

    if (index !== -1) {
      data.step.splice(index, 1);
    }

    data.step.forEach((item) => {
      item.id = count++;
    });

    navigation.navigate({
      name: "EditRecipe",
      params: { recipeEdit: data },
      merge: true,
    });
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

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  let stepInputData = _.dropRight(data, data.length - index);

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
            {title === "Edit Step" ? (
              <TouchableOpacity
                style={{
                  width: wp(38),
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
                onPress={() => handleDeleteStep()}
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
          <FlatList
            data={stepInputData}
            renderItem={({ item, index }) => renderStep(item, index)}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="always"
          />
          <View
            style={{
              flexDirection: "row",
              marginBottom: hp(15),
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
              Step {index + 1}
            </Text>
          </View>
          <InputText
            title="Fry the chicken"
            addStyle={{
              height: null,
              paddingVertical: hp(15),
            }}
            value={txt}
            onChangeText={(txt) => setTxt(txt)}
            multiline={true}
          />
        </View>
        <Button
          title={title}
          onPress={() => {
            title === "Edit Step" ? handleEditStep() : handleStep();
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
