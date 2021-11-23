import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateProductScreen from "./src/screens/CreateProductScreen";
import DisplayProductScreen from "./src/screens/DisplayProductScreen";
import { setI18nConfig } from "./src/helpers/translations/translationConfig";
import { tokens } from "./src/helpers/translations/appStrings";
import { translate } from "./src/helpers/translations/translationConfig";
import ProductProvider from "./src/context/ProductContext";
import EditProductScreen from "./src/screens/EditProductScreen";

export default function App() {
  return (
    <ProductProvider>
      <MainNavigator />
    </ProductProvider>
  );
}

export const MainNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator();
  setI18nConfig();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DisplayProductScreen">
        <Stack.Screen
          name="CreateProductScreen"
          component={CreateProductScreen}
        />
        <Stack.Screen
          name="DisplayProductScreen"
          component={DisplayProductScreen}
        />
        <Stack.Screen
          name="EditProductScreen"
          component={EditProductScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
