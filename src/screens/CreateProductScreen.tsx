import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { MaterialIcons, Foundation, Feather } from "@expo/vector-icons";
import useToggleModalVisible from "../customhooks/useToggleModalVisible";
import ModalPicker from "../components/ModalPicker";
import { TextInput, Button } from "@react-native-material/core";
import { StackScreens } from "../helpers/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { tokens } from "../helpers/translations/appStrings";
import { translate } from "../helpers/translations/translationConfig";
import { ProductContext } from "../context/ProductContext";
import ProductProvider, {
  IProductContextType,
  IProducts,
} from "../context/ProductContext";

const CreateProductScreen: React.FC<
  NativeStackScreenProps<StackScreens, "CreateProductScreen">
> = props => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string | "">("");
  let priceNumber: number = parseFloat(productPrice);
  const [selectedProductType, setSelectedProductType] = useState<string>(
    "Choose Product Type..."
  );
  const { showModalVisible, toggleModalVisible } = useToggleModalVisible();
  const [saveDisabled, setSaveDisabled] = useState(false);

  const [productsAdded, setProductsAdded] = React.useState<IProducts>();

  const appContext = React.useContext(ProductContext);

  const setModalData = (option: string) => {
    setSelectedProductType(option);
  };

  useEffect(() => {
    setSaveDisabled(
      productName.length === 0 ||
        productPrice.length === 0 ||
        selectedProductType == "Choose Product Type..."
    );
  }, [productName, productPrice, selectedProductType]);

  const validatePrice = () => {
    console.log("Inside validate Price", priceNumber);
    if (selectedProductType == "Peripheral" && priceNumber <= 0) {
      Alert.alert("Error", "Peripheral Products Price should be > 0 dollars", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else if (
      selectedProductType == "Integrated" &&
      (priceNumber > 2600 || priceNumber < 1000)
    ) {
      Alert.alert(
        "Error",
        "Integrated Producrs Price should be between 1000 and 2600 dollars",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    } else {
      saveProducts(priceNumber);
    }
  };

  const saveProducts = (priceNumber: number) => {
    const newAddedProduct: IProducts = {
      id: Math.random(),
      productName: productName,
      productPrice: priceNumber,
      productType: selectedProductType,
    };
    console.log("productfound pass", appContext?.checkProduct(productName, 0));
    if (appContext?.checkProduct(productName, 0) == true) {
      setProductsAdded(newAddedProduct);
      appContext?.saveProduct(newAddedProduct);
      console.log(
        "Productslist in after save in create screen:",
        newAddedProduct.id,
        newAddedProduct.productName,
        newAddedProduct.productPrice,
        newAddedProduct.productType
      );

      props.navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerStyle}>
        {translate(tokens.screens.AddProductScreen.mainText)}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          label={translate(
            tokens.screens.AddProductScreen.productNameLabelText
          )}
          style={styles.inputStyle}
          defaultValue={productName}
          onChangeText={text => setProductName(text)}
        />
        <MaterialIcons style={styles.icon} name="add-to-queue" size={30} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label={translate(
            tokens.screens.AddProductScreen.productPriceLabelText
          )}
          style={styles.inputStyle}
          // defaultValue={productPrice}
          keyboardType="decimal-pad"
          onChangeText={text => setProductPrice(text)}
        />
        <MaterialIcons style={styles.icon} name="money" size={30} />
      </View>
      <View>
        <Text>
          {translate(tokens.screens.AddProductScreen.productTypeLabelText)}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.pickerStyle}
          onPress={() => toggleModalVisible(true)}
        >
          <Text style={styles.pickerText}>{selectedProductType}</Text>
          <MaterialIcons
            style={styles.dropDownStyle}
            name="arrow-drop-down"
            size={30}
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="fade"
          visible={showModalVisible}
          onRequestClose={() => toggleModalVisible(false)}
        >
          <ModalPicker
            toggleModalVisibility={toggleModalVisible}
            setModalData={setModalData}
          />
        </Modal>
      </View>

      <View>
        <Button
          title={translate(tokens.screens.AddProductScreen.saveButtonText)}
          color={saveDisabled ? "grey" : "green"}
          style={styles.btnStyleSave}
          disabled={saveDisabled}
          onPress={() => {
            validatePrice();
            //saveProducts();
          }}
        ></Button>
        <Feather
          style={styles.btwSaveIcon}
          name="download"
          size={22}
          color={saveDisabled ? "black" : "white"}
        />
      </View>
      <View>
        <Button
          title={translate(tokens.screens.AddProductScreen.cancelButtonText)}
          color="white"
          style={styles.btnStyleCancel}
          onPress={() => {
            props.navigation.navigate("DisplayProductScreen");
          }}
        ></Button>
        <Foundation
          style={styles.btwCancelIcon}
          name="prohibited"
          size={22}
          color="black"
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    width: 200,
  },
  btnStyleSave: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: -120,
    width: 100,
  },
  btnStyleCancel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    backgroundColor: "#8a2be2",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: -38,
    marginLeft: 90,
    width: 105,
  },
  inputStyle: {
    flex: 1,
    backgroundColor: "white",
    fontSize: 25,
    width: "80%",
    height: 50,
    margin: 20,
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#000",
    paddingBottom: 10,
  },
  pickerStyle: {
    paddingHorizontal: 10,
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    borderColor: "black",
    justifyContent: "space-between",
  },
  pickerText: {
    marginVertical: 10,
    fontSize: 18,
  },
  dropDownStyle: {
    color: "black",
    marginTop: 8,
  },
  icon: {
    position: "absolute",
    right: 50,
    top: 40,
  },
  btwSaveIcon: {
    position: "absolute",
    right: 15,
    top: 14,
  },
  btwCancelIcon: {
    position: "absolute",
    right: 7,
    top: -31,
  },
  textStyle: {
    fontSize: 20,
  },
});
