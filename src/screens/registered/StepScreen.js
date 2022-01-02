import React, { useState } from "react";
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

  const { title, data } = route.params;
  const [stepData, setStepData] = useState(data);
  const [txt, setTxt] = useState("");
  const [visible, setVisible] = useState(false);

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
            {title === "Edit Step" ? (
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
            ) : (
              <View style={{ width: wp(38) }} />
            )}
          </View>
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
              Step 1
            </Text>
          </View>
          <InputText
            title="Fry the chicken"
            value={txt}
            onChangeText={(txt) => setStep(txt)}
          />
        </View>
        <Button title={title} onPress={() => handleStep()} />
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
