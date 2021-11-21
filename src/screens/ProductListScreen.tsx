import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FAB } from "react-native-paper";
import { StackScreens } from "../helpers/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const ProductListScreen: React.FC<
  NativeStackScreenProps<StackScreens, "ProductListScreen">
> = props => {
  return (
    <>
      <View>
        <Text style={styles.textStyle}>Product Lists</Text>
      </View>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          props.navigation.navigate("CreateProductScreen");
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: "violet",
    borderRadius: 100,
  },
  textStyle: {
    fontSize: 25,
  },
});

export default ProductListScreen;
