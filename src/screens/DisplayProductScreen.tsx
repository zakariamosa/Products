import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from "react-native";
import { FAB } from "react-native-paper";
import ProductProvider, { ProductContext } from "../context/ProductContext";
import { StackScreens } from "../helpers/types";

const DisplayProductScreen: React.FC<
  NativeStackScreenProps<StackScreens, "DisplayProductScreen">
> = props => {
  //const { productsList,saveProduct,updateProduct } = useContext(ProductContext);
  const appContext = useContext(ProductContext);
  return (
    <>
      <View>
        <Text>
          {appContext?.productsList?.map((products, index) => (
            <>
              <Text key={index}>{products.productName},{products.productPrice},{products.productType}</Text>
            </>
          ))}
        </Text>
      </View>

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

export default DisplayProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
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
    backgroundColor: "#8a2be2",
    borderRadius: 100,
  },
  textStyle: {
    fontSize: 25,
  },
});
