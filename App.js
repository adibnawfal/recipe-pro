import React from "react";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";
import { useFonts } from "expo-font";

import { WelcomeScreen } from "./src/screens/welcome";
import {
  SignInScreen,
  RegisterScreen,
  ForgotPasswordScreen,
} from "./src/screens/authentication";
import {
  GuestHomeScreen,
  GuestTrendingRecipeScreen,
  GuestRecipeScreen,
} from "./src/screens/guest";
import {
  HomeScreen,
  AddRecipeScreen,
  FavouriteScreen,
  ProfileScreen,
  RecipeScreen,
  TrendingRecipeScreen,
} from "./src/screens/registered";
import { colors } from "./src/res/colors";
import { hp } from "./src/config/dimensions";

enableScreens();

const stackOption = () => ({
  headerShown: false,
});

const tabOption = ({ route }) => ({
  tabBarShowLabel: false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "AddRecipe") {
      iconName = focused ? "plus-circle" : "plus-circle-outline";
    } else if (route.name === "Favourite") {
      iconName = focused ? "heart" : "heart-outline";
    } else {
      iconName = focused ? "account" : "account-outline";
    }

    return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.darkGrey,
  tabBarStyle: {
    height: hp(60),
    backgroundColor: colors.lightGrey,
  },
});

const StackHome = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <StackHome.Navigator initialRouteName="HomeMain">
      <StackHome.Screen
        name="HomeMain"
        component={HomeScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="TrendingRecipe"
        component={TrendingRecipeScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="Recipe"
        component={RecipeScreen}
        options={stackOption}
      />
    </StackHome.Navigator>
  );
}

const StackAddRecipe = createNativeStackNavigator();

function AddRecipeNavigator() {
  return (
    <StackAddRecipe.Navigator initialRouteName="AddRecipeMain">
      <StackAddRecipe.Screen
        name="AddRecipeMain"
        component={AddRecipeScreen}
        options={stackOption}
      />
    </StackAddRecipe.Navigator>
  );
}

const StackFavourite = createNativeStackNavigator();

function FavouriteNavigator() {
  return (
    <StackFavourite.Navigator initialRouteName="FavouriteMain">
      <StackFavourite.Screen
        name="FavouriteMain"
        component={FavouriteScreen}
        options={stackOption}
      />
    </StackFavourite.Navigator>
  );
}

const StackProfile = createNativeStackNavigator();

function ProfileNavigator() {
  return (
    <StackProfile.Navigator initialRouteName="ProfileMain">
      <StackProfile.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={stackOption}
      />
    </StackProfile.Navigator>
  );
}

const TabRegistered = createBottomTabNavigator();

function RegisteredUserNavigator() {
  return (
    <TabRegistered.Navigator screenOptions={tabOption} initialRouteName="Home">
      <TabRegistered.Screen
        name="Home"
        component={HomeNavigator}
        options={stackOption}
      />
      <TabRegistered.Screen
        name="AddRecipe"
        component={AddRecipeNavigator}
        options={stackOption}
      />
      <TabRegistered.Screen
        name="Favourite"
        component={FavouriteNavigator}
        options={stackOption}
      />
      <TabRegistered.Screen
        name="Profile"
        component={ProfileNavigator}
        options={stackOption}
      />
    </TabRegistered.Navigator>
  );
}

// const StackRegistered = createNativeStackNavigator();

// function RegisteredUserNavigator() {
//   return (
//     <StackRegistered.Navigator initialRouteName="Home">
//       <StackRegistered.Screen
//         name="Home"
//         component={HomeNavigator}
//         options={stackOption}
//       />
//     </StackRegistered.Navigator>
//   );
// }

const StackGuest = createNativeStackNavigator();

function GuestUserNavigator() {
  return (
    <StackGuest.Navigator initialRouteName="GuestHome">
      <StackGuest.Screen
        name="GuestHome"
        component={GuestHomeScreen}
        options={stackOption}
      />
      <StackGuest.Screen
        name="GuestTrendingRecipe"
        component={GuestTrendingRecipeScreen}
        options={stackOption}
      />
      <StackGuest.Screen
        name="GuestRecipe"
        component={GuestRecipeScreen}
        options={stackOption}
      />
    </StackGuest.Navigator>
  );
}

const StackApp = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Regular: require("./src/assets/fonts/OpenSans-Regular.ttf"),
    SemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
    Bold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackApp.Navigator initialRouteName="Welcome">
          <StackApp.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={stackOption}
          />
          <StackApp.Screen
            name="SignIn"
            component={SignInScreen}
            options={stackOption}
          />
          <StackApp.Screen
            name="Register"
            component={RegisterScreen}
            options={stackOption}
          />
          <StackApp.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={stackOption}
          />
          <StackApp.Screen
            name="GuestUser"
            component={GuestUserNavigator}
            options={stackOption}
          />
          <StackApp.Screen
            name="RegisteredUser"
            component={RegisteredUserNavigator}
            options={stackOption}
          />
        </StackApp.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
