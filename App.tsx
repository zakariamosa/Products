import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import CreateProductScreen from './src/screens/CreateProductScreen';
import { setI18nConfig } from './src/helpers/translations/translationConfig';
import { tokens } from './src/helpers/translations/appStrings'
import { translate } from './src/helpers/translations/translationConfig'

 const App : React.FC = () => {
  const Stack = createNativeStackNavigator();
  setI18nConfig();
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName="CreateProductScreen"> 
            <Stack.Screen name="CreateProductScreen" component={CreateProductScreen} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

