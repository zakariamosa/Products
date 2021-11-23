import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from "react-native";
import { FAB } from "react-native-paper";
import ProductProvider, { ProductContext } from "../context/ProductContext";
import { StackScreens } from "../helpers/types";
import { Feather } from "@expo/vector-icons";
import { translate } from "i18n-js";
import { tokens } from "../helpers/translations/appStrings";
import { TextInput, Button } from "@react-native-material/core";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
const DisplayProductScreen: React.FC<
  NativeStackScreenProps<StackScreens, "DisplayProductScreen">
> = props => {
  //const { productsList,saveProduct,updateProduct } = useContext(ProductContext);
  const appContext = useContext(ProductContext);
  const [isRender, setIsRender] = useState(false);

  return (
    <>
      <View>
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
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                //onPress={() => navigation.navigate('Show', { id: item.id })}
                onPress={() => props.navigation.navigate("EditProductScreen")}
              >
                <View style={styles.row}>
                  <Text style={styles.title}>
                    {item.productName} - {item.productType} -{" "}
                    {item.productPrice}
                  </Text>
                  <TouchableOpacity /*onPress={() => deleteProductPost(item.id)}*/
                  >
                    <Feather style={styles.icon} name="trash" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          extraData={isRender}
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
  textStyle: {
    fontSize: 25,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalDesign: {
    borderWidth: 2,
    width: 350,
    height: 200,
  },
  inputStyle: {
    backgroundColor: "white",
    fontSize: 25,
    width: "80%",
    height: 50,
    borderRadius: 15,
    marginTop: 30,
    marginLeft: 30,
  },
  inputContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  save: {
    backgroundColor: "red",
    paddingHorizontal: 100,
    alignItems: "center",
    marginTop: 20,
  },
  headerStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    padding: 20,
  },
  btnStyleSave: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    width: 80,
  },
});
