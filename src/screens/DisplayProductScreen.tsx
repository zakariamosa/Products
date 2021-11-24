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
  FlatList,
} from "react-native";
import { FAB } from "react-native-paper";
import ProductProvider, { ProductContext } from "../context/ProductContext";
import { StackScreens } from "../helpers/types";
import { Feather } from "@expo/vector-icons";

const DisplayProductScreen: React.FC<
  NativeStackScreenProps<StackScreens, "DisplayProductScreen">
> = props => {
  //const { productsList,saveProduct,updateProduct } = useContext(ProductContext);
  const appContext = useContext(ProductContext);
  return (
    <>
      <View>
        <View>
          <Text style={styles.title}>Product Lists</Text>
        </View>
        <View style={styles.titlerow}>
          <Text style={styles.prodName}>Name</Text>
          <Text style={styles.prodType}>Type</Text>
          <Text style={styles.prodPrice}>Price</Text>
        </View>
        {/* <Text>
          {appContext?.productsList?.map((products, index) => (
            <>
              <Text key={index}>{products.productName},{products.productPrice},{products.productType}</Text>
            </>
          ))}
        </Text> */}

        <FlatList
          data={appContext?.productsList}
          keyExtractor={product => product.productName}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.navigate("EditProductScreen", {
                    selectedProduct: item,
                  })
                }
              >
                <View style={styles.row}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.productType}>{item.productType}</Text>
                  <Text style={styles.productPrice}>{item.productPrice}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        "Warning",
                        "Do you want to delete the product",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => appContext?.deleteProduct(item.id),
                          },
                        ]
                      );
                    }}
                  >
                    <Feather style={styles.icon} name="trash" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderColor: "gray",
  },
  titlerow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingTop: 10,
  },
  productName: {
    paddingTop: 20,
    position: "absolute",
    fontSize: 22,
  },
  productType: {
    paddingTop: 20,
    position: "absolute",
    fontSize: 22,
    marginLeft: 150,
  },
  productPrice: {
    paddingTop: 20,
    position: "absolute",
    fontSize: 22,
    marginLeft: 300,
  },
  icon: {
    paddingTop: 20,
    position: "absolute",
    fontSize: 22,
    marginTop: -25,
    marginLeft: 380,
  },
  title: {
    fontSize: 28,
    backgroundColor: "#8a2be2",
  },
  prodName: {
    fontSize: 24,
  },
  prodType: {
    fontSize: 24,
  },
  prodPrice: {
    fontSize: 24,
    marginRight: 60,
  },
});
