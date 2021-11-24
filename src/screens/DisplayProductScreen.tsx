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
import { translate } from "../helpers/translations/translationConfig";
import { tokens } from "../helpers/translations/appStrings";

const DisplayProductScreen: React.FC<
  NativeStackScreenProps<StackScreens, "WeByte">
> = props => {
  //const { productsList,saveProduct,updateProduct } = useContext(ProductContext);
  const appContext = useContext(ProductContext);
  return (
    <>
      <View>
      <View>
          <Text style={styles.title}>{translate(tokens.screens.DisplayProductScreen.mainText)}</Text>
        </View>
        <View style={styles.titlerow}>
          <Text style={styles.prodName}>{translate(tokens.screens.DisplayProductScreen.productNameHeader)}</Text>
          <Text style={styles.prodType}>{translate(tokens.screens.DisplayProductScreen.productTypeHeader)}</Text>
          <Text style={styles.prodPrice}>{translate(tokens.screens.DisplayProductScreen.productPriceHeader)}</Text>
        </View>
        

        <FlatList
          data={appContext?.productsList}
          keyExtractor={product => product.productName}
          scrollEnabled={true}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.navigate("EditProduct", {
                    selectedProduct: item,
                  })
                }
              >
                <View style={styles.row}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.productType}>{item.productType}</Text>
                  <Text style={styles.productPrice}>${item.productPrice}</Text>
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
          props.navigation.navigate("CreateProduct");
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
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
    fontSize: 20,
    margin:10
  },
  productType: {
    fontSize: 20,
    margin: 10,
  },
  productPrice: {
    fontSize: 20,
    marginTop: 10,
    marginRight:5
  },
  icon: {
    fontSize: 24,
    marginTop:10,
    marginRight:2,
    paddingLeft: 0,
  },
  title: {
    fontSize: 26,
    width:'100%',
    alignSelf:'center',
    backgroundColor: "#8a2be2",
    
  },
  prodName: {
    fontSize: 24,
  },
  prodType: {
    fontSize: 24,
    marginRight: 30,
  },
  prodPrice: {
    fontSize: 24,
    marginRight: 30,
  },
});
