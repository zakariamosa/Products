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
      <Stack.Navigator initialRouteName="WeByte">
        <Stack.Screen
          name="CreateProduct"
          component={CreateProductScreen}
        />
        <Stack.Screen
          name="WeByte"
          component={DisplayProductScreen}
          options={{
            title: 'We Byte',
            headerStyle:{
              backgroundColor:"#8a2be2",
            },
            headerTintColor:'#fff',
            headerTitleStyle:{
              fontWeight:'bold',
            },
          }}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
