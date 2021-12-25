import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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

export default function RegisterScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [terms, setTerms] = useState(false);
  const [visible, setVisible] = useState(false);

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
              Terms and Conditions
            </Dialog.Title>
            <Dialog.ScrollArea
              style={{ height: hp(350), paddingHorizontal: 0 }}
            >
              <ScrollView style={{ paddingHorizontal: wp(20) }}>
                <Text style={styles.dialogParaTxt}>
                  Welcome to our application! Please read the terms and policies
                  before accepting so you are clear on what terms we are
                  imposing on you.
                </Text>
                <Text style={styles.dialogParaTxt}>
                  By using this application you are agreeing to be bound by our
                  term and conditions. If you disagree with any part of the
                  terms then you are not granted access to this application.
                </Text>
                <Text style={styles.dialogHeadTxt}>Plagiarism</Text>
                <Text style={styles.dialogParaTxt}>
                  The application and it's features are the product of hard work
                  of UTHM students. Therefore any intentions of or acts of
                  blatant plagiarism are strictly not allowed.
                </Text>
                <Text style={styles.dialogHeadTxt}>Privacy Policy</Text>
                <Text style={styles.dialogParaTxt}>
                  This policy explains what information we collect when you use
                  the application and its' services.
                </Text>
                <Text style={styles.dialogParaTxt}>
                  Information we collect & how we use it:
                </Text>
                <Text style={styles.dialogParaTxt}>
                  {"\t\t"}1. Email address.{"\n\t\t"}2. Full Name.{"\n\t\t"}3.
                  Item data.
                </Text>
                <Text style={styles.dialogParaTxt}>
                  We don't make money from collecting these kind of information
                  from you so rest assured :). This policy only exists to
                  fulfill the requirements of our project.
                </Text>
                <Text style={[styles.dialogParaTxt, { marginBottom: hp(15) }]}>
                  The email address is used so you can reset your password in
                  case you forget it and the name is only to fill up data in our
                  database.
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
        <View>
          <TouchableOpacity
            style={{ width: wp(38), justifyContent: "center" }}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons name="arrow-back" size={30} color={colors.black} />
          </TouchableOpacity>
          <View style={{ marginVertical: hp(25) }}>
            <Text style={styles.title}>Create account,</Text>
            <Text style={styles.desc}>sign up to get started</Text>
          </View>
          <InputText title="Full Name" />
          <InputText title="Email Address" addStyle={{ marginTop: hp(15) }} />
          <InputText title="Password" addStyle={{ marginVertical: hp(15) }} />
          <InputText title="Confirm Password" />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
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
          />
        </View>
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
});
