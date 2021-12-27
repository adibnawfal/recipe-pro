import React from "react";
import AppLoading from "expo-app-loading";
import { LogBox } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";
import { useFonts } from "expo-font";

import { WelcomeScreen } from "./src/screens/welcome";
import {
  AuthenticationScreen,
  SignInScreen,
  RegisterScreen,
  ForgotPasswordScreen,
} from "./src/screens/authentication";
import {
  GuestHomeScreen,
  GuestRecipeScreen,
  GuestRecipeListScreen,
} from "./src/screens/guest";
import {
  HomeScreen,
  AddRecipeScreen,
  FavouriteScreen,
  ProfileScreen,
  FilterSearchScreen,
  RecipeScreen,
  RecipeListScreen,
  IngredientScreen,
  StepScreen,
  EditProfileScreen,
  ChangePasswordScreen,
} from "./src/screens/registered";
import { colors } from "./src/res/colors";
import { hp } from "./src/config/dimensions";

LogBox.ignoreAllLogs();

enableScreens();

const stackOption = () => ({
  headerShown: false,
  safeAreaInsets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const tabOption = ({ route }) => ({
  tabBarShowLabel: false,
  tabBarIcon: ({ focused, color }) => {
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
  safeAreaInsets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const tabHide = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const tabHiddenRoutes = [
      "FilterSearch",
      "TrendingRecipe",
      "Recipe",
      "RecipeList",
      "Ingredient",
      "Step",
      "EditProfile",
      "ChangePassword",
    ];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          height: hp(60),
          backgroundColor: colors.lightGrey,
        },
      });
    }
  }, [navigation, route]);
};

const StackHome = createNativeStackNavigator();

function HomeNavigator({ navigation, route }) {
  tabHide({ navigation, route });

  return (
    <StackHome.Navigator initialRouteName="HomeMain">
      <StackHome.Screen
        name="HomeMain"
        component={HomeScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="FilterSearch"
        component={FilterSearchScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="Recipe"
        component={RecipeScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={stackOption}
      />
    </StackHome.Navigator>
  );
}

const StackAddRecipe = createNativeStackNavigator();

function AddRecipeNavigator({ navigation, route }) {
  tabHide({ navigation, route });

  return (
    <StackAddRecipe.Navigator initialRouteName="AddRecipeMain">
      <StackAddRecipe.Screen
        name="AddRecipeMain"
        component={AddRecipeScreen}
        options={stackOption}
      />
      <StackAddRecipe.Screen
        name="Ingredient"
        component={IngredientScreen}
        options={stackOption}
      />
      <StackAddRecipe.Screen
        name="Step"
        component={StepScreen}
        options={stackOption}
      />
    </StackAddRecipe.Navigator>
  );
}

const StackFavourite = createNativeStackNavigator();

function FavouriteNavigator({ navigation, route }) {
  tabHide({ navigation, route });

  return (
    <StackFavourite.Navigator initialRouteName="FavouriteMain">
      <StackFavourite.Screen
        name="FavouriteMain"
        component={FavouriteScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="Recipe"
        component={RecipeScreen}
        options={stackOption}
      />
    </StackFavourite.Navigator>
  );
}

const StackProfile = createNativeStackNavigator();

function ProfileNavigator({ navigation, route }) {
  tabHide({ navigation, route });

  return (
    <StackProfile.Navigator initialRouteName="ProfileMain">
      <StackProfile.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="Recipe"
        component={RecipeScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="RecipeList"
        component={RecipeListScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
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
        name="GuestRecipe"
        component={GuestRecipeScreen}
        options={stackOption}
      />
      <StackGuest.Screen
        name="GuestRecipeList"
        component={GuestRecipeListScreen}
        options={stackOption}
      />
      <StackHome.Screen
        name="FilterSearch"
        component={FilterSearchScreen}
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
        <StackApp.Navigator initialRouteName="Authentication">
          <StackApp.Screen
            name="Authentication"
            component={AuthenticationScreen}
            options={stackOption}
          />
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
