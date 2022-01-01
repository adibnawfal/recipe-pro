import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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

export default function ForgotPasswordScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);

  const auth = getAuth();

  const handleForgotPassword = () => {
    if (email != "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Keyboard.dismiss();
          setError(null);
          setVisible(true);
        })
        .catch(() => {
          Keyboard.dismiss();
          setError("Please enter a valid email address.");
        });
    } else {
      setError("Please enter a valid email address.");
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="always"
        >
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
                Reset Password Email Sent
              </Dialog.Title>
              <Dialog.Content
                style={{ paddingHorizontal: wp(20), alignItems: "center" }}
              >
                <Text style={styles.dialogParaTxt}>
                  An email has been send to your email address. Follow the
                  instructions to reset your password.
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
                  labelStyle={[styles.dialogBtnTxt, { color: colors.white }]}
                  style={{
                    width: wp(70),
                    borderRadius: wp(5),
                    backgroundColor: colors.primary,
                  }}
                  onPress={() => {
                    {
                      setVisible(false);
                      navigation.pop();
                    }
                  }}
                >
                  Done
                </PButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <View>
            <TouchableOpacity
              style={{ width: wp(38), justifyContent: "center" }}
              onPress={() => navigation.pop()}
            >
              <MaterialIcons name="arrow-back" size={30} color={colors.black} />
            </TouchableOpacity>
            <View style={{ marginVertical: hp(25) }}>
              <Text style={styles.title}>Forgot password,</Text>
              <Text style={styles.desc}>
                enter the email address associated with your account
              </Text>
            </View>
            <InputText
              title="Email Address"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            {error ? <Text style={styles.errorTxt}>{error}</Text> : null}
          </View>
          <Button
            title="Reset Password"
            onPress={() => handleForgotPassword()}
          />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: wp(27),
    paddingTop: hp(10),
    paddingBottom: hp(25),
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: "Bold",
    fontSize: hp(22),
    color: colors.black,
  },
  desc: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    marginTop: wp(5),
  },
  errorTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.red,
    marginVertical: hp(15),
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
