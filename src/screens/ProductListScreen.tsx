import { Button } from "@react-native-material/core";
import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../helpers/types";
import { CreateProductScreen } from "./CreateProductScreen";

export interface ITask {
  productName: String;
  productPrice: String;
}

export const ProductListScreen: React.FC<ITask> = props => {
  return (
    <View>
      <View>
        <Button
          title="Add"
          onPress={() => {
            //props.navigation.navigate("CreateProductScreen");
          }}
        />
      </View>
      <View>
        <Text>{props.productName}</Text>
        {console.log("Hello")}
      </View>
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
    alignItems: "center",
  },
});
