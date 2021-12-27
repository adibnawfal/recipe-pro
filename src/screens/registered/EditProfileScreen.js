import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { wp, hp } from "../../config/dimensions";
import { colors } from "../../res/colors";
import { Button, InputText } from "../../components";

export default function EditProfileScreen({ navigation }) {
  let [fontsLoaded] = useFonts({
    Regular: require("../../assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("../../assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("../../assets/fonts/OpenSans-Bold.ttf"),
  });

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAwareScrollView
      enableAutomaticScroll
      style={{ backgroundColor: colors.white }}
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="always"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={{ alignItems: "center" }}>
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
            <InputText title="Full Name" addStyle={{ marginBottom: hp(15) }} />
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
            <InputText title="Email Address" />
          </View>
        </View>
        <Button title="Save Profile" navRoute={() => null} />
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
});
