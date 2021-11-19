import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import CreateScreen from './src/screens/createNewProduct/CreateScreen';

 const App : React.FC = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName="CreateScreen"> 
            <Stack.Screen name="CreateScreen" component={CreateScreen} />
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

