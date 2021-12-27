import React, { useState, useEffect } from "react";
import { db } from "../../config/Fire";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";

export default function RegisterScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [error, setError] = useState(true);
  const [signUpError, setSignUpError] = useState(null);
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [terms, setTerms] = useState(false);
  const [visible, setVisible] = useState(false);
  const [registrationVisible, setRegistrationVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    if (!error) {
      if (terms != true) {
        setVisible(true);
        Keyboard.dismiss();
      } else {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async () => {
            try {
              await setDoc(doc(db, "users", auth.currentUser.uid), {
                fullName: fullName,
                profilePicture: null,
              });
              Keyboard.dismiss();
              setRegistrationVisible(true);
            } catch (error) {
              Keyboard.dismiss();
              setSignUpError(
                "Invalid email address and password or email address is already in use."
              );
              setRegistrationVisible(true);
            }
          })
          .catch(() => {
            Keyboard.dismiss();
            setSignUpError(
              "Invalid email address and password or email address is already in use."
            );
            setRegistrationVisible(true);
          });
      }
    }
  }, [error, fullNameError, emailError, passwordError, confirmPasswordError]);

  const handleSignUp = () => {
    setSignUpError(null);

    fullName != ""
      ? (setFullNameError(null), setError(false))
      : (setFullNameError("Full name is required."), setError(true));

    email != ""
      ? (setEmailError(null), setError(false))
      : (setEmailError("Please enter a valid email address."), setError(true));

    password != ""
      ? (setPasswordError(null), setError(false))
      : (setPasswordError("Password must be 8-16 characters."), setError(true));

    confirmPassword === password && confirmPassword != ""
      ? (setConfirmPasswordError(null), setError(false))
      : (setConfirmPasswordError("Password not match."), setError(true));

    if (terms != true) {
      setVisible(true);
      Keyboard.dismiss();
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (loading) {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <ScrollView contentContainerStyle={styles.container}>
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
                  Terms and Conditions
                </Dialog.Title>
                <Dialog.ScrollArea
                  style={{ height: hp(350), paddingHorizontal: 0 }}
                >
                  <ScrollView style={{ paddingHorizontal: wp(20) }}>
                    <Text style={styles.dialogParaTxt}>
                      Welcome to our application! Please read the terms and
                      policies before accepting so you are clear on what terms
                      we are imposing on you.
                    </Text>
                    <Text style={styles.dialogParaTxt}>
                      By using this application you are agreeing to be bound by
                      our term and conditions. If you disagree with any part of
                      the terms then you are not granted access to this
                      application.
                    </Text>
                    <Text style={styles.dialogHeadTxt}>Plagiarism</Text>
                    <Text style={styles.dialogParaTxt}>
                      The application and it's features are the product of hard
                      work of UTHM students. Therefore any intentions of or acts
                      of blatant plagiarism are strictly not allowed.
                    </Text>
                    <Text style={styles.dialogHeadTxt}>Privacy Policy</Text>
                    <Text style={styles.dialogParaTxt}>
                      This policy explains what information we collect when you
                      use the application and its' services.
                    </Text>
                    <Text style={styles.dialogParaTxt}>
                      Information we collect & how we use it:
                    </Text>
                    <Text style={styles.dialogParaTxt}>
                      {"\t\t"}1. Email address.{"\n\t\t"}2. Full Name.{"\n\t\t"}
                      3. Item data.
                    </Text>
                    <Text style={styles.dialogParaTxt}>
                      We don't make money from collecting these kind of
                      information from you so rest assured :). This policy only
                      exists to fulfill the requirements of our project.
                    </Text>
                    <Text
                      style={[styles.dialogParaTxt, { marginBottom: hp(15) }]}
                    >
                      The email address is used so you can reset your password
                      in case you forget it and the name is only to fill up data
                      in our database.
                    </Text>
                  </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions
                  style={{
                    justifyContent: "space-between",
                    paddingHorizontal: wp(20),
                    paddingVertical: hp(15),
                  }}
                >
                  <PButton
                    uppercase={false}
                    color={colors.primary}
                    labelStyle={styles.dialogBtnTxt}
                    style={{
                      width: wp(70),
                    }}
                    onPress={() => {
                      setTerms(false);
                      setVisible(false);
                    }}
                  >
                    Decline
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
                    onPress={() => {
                      setTerms(true);
                      setVisible(false);
                    }}
                  >
                    Accept
                  </PButton>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <Portal>
              <Dialog
                visible={registrationVisible}
                onDismiss={() => setRegistrationVisible(false)}
                style={{ borderRadius: wp(10), backgroundColor: colors.white }}
              >
                <Dialog.Title style={styles.dialogTitleTxt}>
                  {signUpError
                    ? "Registration Failed"
                    : "Registration Successful!"}
                </Dialog.Title>
                <Dialog.Content
                  style={{ paddingHorizontal: wp(20), alignItems: "center" }}
                >
                  {signUpError ? (
                    <Text style={styles.dialogRegistrationTxt}>
                      {signUpError}
                    </Text>
                  ) : (
                    <Text style={styles.dialogRegistrationTxt}>
                      Congratulations, your account has been successfully
                      created.
                    </Text>
                  )}
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
                      signUpError
                        ? setRegistrationVisible(false)
                        : (setRegistrationVisible(false),
                          navigation.navigate("SignIn"));
                    }}
                  >
                    {signUpError ? "Retry" : "Sign In"}
                  </PButton>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <View>
              <TouchableOpacity
                style={{ width: wp(38), justifyContent: "center" }}
                onPress={() => navigation.pop()}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={30}
                  color={colors.black}
                />
              </TouchableOpacity>
              <View style={{ marginVertical: hp(25) }}>
                <Text style={styles.title}>Create account,</Text>
                <Text style={styles.desc}>sign up to get started</Text>
              </View>
              <InputText
                title="Full Name"
                addStyle={{ marginBottom: hp(15) }}
                value={fullName}
                onChangeText={(fullname) => setFullName(fullname)}
              />
              {fullNameError && (
                <Text style={styles.errorTxt}>{fullNameError}</Text>
              )}
              <InputText
                title="Email Address"
                addStyle={{
                  marginTop: fullNameError ? hp(15) : null,
                  marginBottom: hp(15),
                }}
                value={email}
                onChangeText={(email) => setEmail(email)}
              />
              {emailError && <Text style={styles.errorTxt}>{emailError}</Text>}
              <InputText
                title="Password"
                addStyle={{
                  marginTop: emailError ? hp(15) : null,
                  marginBottom: hp(15),
                }}
                value={password}
                onChangeText={(password) => setPassword(password)}
              />
              {passwordError && (
                <Text style={styles.errorTxt}>{passwordError}</Text>
              )}
              <InputText
                title="Confirm Password"
                addStyle={{
                  marginTop: passwordError ? hp(15) : null,
                  marginBottom: confirmPasswordError ? hp(15) : null,
                }}
                value={confirmPassword}
                onChangeText={(confirmpassword) =>
                  setConfirmPassword(confirmpassword)
                }
              />
              {confirmPasswordError && (
                <Text style={styles.errorTxt}>{confirmPasswordError}</Text>
              )}
            </View>
            <View
              style={{ width: "100%", alignItems: "center", marginTop: hp(25) }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{ marginRight: wp(10) }}
                  onPress={() => setTerms(!terms)}
                >
                  <MaterialIcons
                    name={terms ? "toggle-on" : "toggle-off"}
                    size={30}
                    color={terms ? colors.primary : colors.black}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisible(true)}>
                  <Text style={styles.termsTxt}>
                    I accept the Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
              <Button
                title="Register"
                navRoute={() => null}
                addStyle={{ width: "100%", marginTop: hp(15) }}
                onPress={() => handleSignUp()}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAwareScrollView>
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
  },
  termsTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
  },
  dialogTitleTxt: {
    fontFamily: "Bold",
    fontSize: hp(14),
    color: colors.black,
    textAlign: "center",
  },
  dialogHeadTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.black,
    marginTop: hp(15),
  },
  dialogParaTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    marginTop: hp(15),
  },
  dialogBtnTxt: {
    fontFamily: "Bold",
    fontSize: hp(12),
    color: colors.primary,
  },
  dialogRegistrationTxt: {
    fontFamily: "Regular",
    fontSize: hp(12),
    color: colors.darkGrey,
    textAlign: "center",
  },
});
