import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { db } from "../../config/Fire";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AppLoading from "expo-app-loading";
import {
  ImageBackground,
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import uuid from "react-native-uuid";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";
import { useDoc } from "../../data/useDoc";
import { set } from "lodash";

export default function EditProfileScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const auth = getAuth();
  const storage = getStorage();
  const userRef = doc(db, "users", auth.currentUser.uid);

  const { loadingDoc, dataDoc } = useDoc(userRef);
  const [image, setImage] = useState(null);
  const [imageChange, setImageChange] = useState(false);
  const [fullName, setFullName] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setImage(dataDoc.profilePicture);
    setFullName(dataDoc.fullName);
  }, [dataDoc]);

  const handleEditProfile = async () => {
    const uploadUrl = imageChange ? await uploadImageAsync(image) : null;

    if (imageChange) {
      await updateDoc(userRef, {
        profilePicture: uploadUrl,
      });
    }

    await updateDoc(userRef, {
      fullName: fullName,
    }).then(() => {
      Keyboard.dismiss();
      setVisible(true);
    });
  };

  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const storageRef = ref(storage, "images/" + uuid.v4() + ".jpg");
    await uploadBytes(storageRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(storageRef);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageChange(true);
    }
  };

  if (!fontsLoaded || loadingDoc) {
    return <AppLoading />;
  }

  return (
    <Provider>
      <KeyboardAwareScrollView
        enableAutomaticScroll
        style={{ backgroundColor: colors.white }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="always"
      >
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
                Profile Edited
              </Dialog.Title>
              <Dialog.Content
                style={{ paddingHorizontal: wp(20), alignItems: "center" }}
              >
                <Text style={styles.dialogParaTxt}>
                  Your profile details have been successfully saved
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
          <View style={{ alignItems: "center" }}>
            <View style={styles.header}>
              <TouchableOpacity
                style={{
                  width: wp(38),
                  justifyContent: "center",
                }}
                onPress={() => navigation.pop()}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={30}
                  color={colors.black}
                />
              </TouchableOpacity>
              <Text style={styles.headerTxt}>Edit Profile</Text>
              <View style={{ width: wp(38) }} />
            </View>
            <TouchableOpacity
              style={{
                width: wp(125),
                height: wp(125),
                borderRadius: wp(125) / 2,
                marginVertical: hp(25),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.lightGrey,
              }}
              onPress={() => pickImage()}
            >
              <ImageBackground
                source={{ uri: image }}
                resizeMode="cover"
                style={{ flex: 1 }}
                imageStyle={{ borderRadius: wp(125) }}
              >
                <View
                  style={{
                    flex: 1,
                    width: wp(125),
                    height: wp(125),
                    borderRadius: wp(125) / 2,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: image ? "rgba(0, 0, 0, 0.3)" : null,
                  }}
                >
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
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: hp(12),
                  color: colors.black,
                  marginBottom: hp(15),
                }}
              >
                Full Name
              </Text>
              <InputText
                title="Full Name"
                addStyle={{ marginBottom: hp(15) }}
                value={fullName}
                onChangeText={(fullName) => setFullName(fullName)}
              />
              <Text
                style={{
                  fontFamily: "Bold",
                  fontSize: hp(12),
                  color: colors.black,
                  marginBottom: hp(15),
                }}
              >
                Email Address
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  height: hp(55),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: wp(10),
                  backgroundColor: colors.lightGrey,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontFamily: "Regular",
                    fontSize: hp(12),
                    color: colors.darkGrey,
                    marginLeft: wp(27),
                  }}
                >
                  {auth.currentUser.email}
                </Text>
              </View>
            </View>
          </View>
          <Button
            title="Save Profile"
            addStyle={{ marginTop: hp(25) }}
            onPress={() => handleEditProfile()}
          />
        </SafeAreaView>
      </KeyboardAwareScrollView>
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
