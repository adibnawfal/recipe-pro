import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppLoading from "expo-app-loading";

export default function AuthenticationScreen({ navigation }) {
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onAuthStateChanged(auth, (user) => {
        navigation.replace(user ? "RegisteredUser" : "Welcome");
      });
    });

    return unsubscribe;
  }, []);

  return <AppLoading />;
}
