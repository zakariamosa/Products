import { Button } from "@react-native-material/core";
import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../helpers/types";
import {CreateProductScreen} from "./CreateProductScreen";


export interface IProductListScreen {
  productNam:String;
  productPric:String;
}
export const ProductListScreen: React.FC<
  NativeStackScreenProps<StackScreens, "ProductListScreen">
> = (props) => {
  return (
    
    <View>
    <Button
    title="Add"
    onPress={() => {
      props.navigation.navigate("CreateProductScreen");
    }}
  />
</View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    alignItems: 'center',
  },
});