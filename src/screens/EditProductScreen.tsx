import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { StackScreens } from "../helpers/types";
import { Button } from "@react-native-material/core";
import { MaterialIcons, Foundation, Feather } from "@expo/vector-icons";
import useToggleModalVisible from "../customhooks/useToggleModalVisible";
import ModalPicker from "../components/ModalPicker";
import { tokens } from "../helpers/translations/appStrings";
import { translate } from "../helpers/translations/translationConfig";
import { ProductContext } from "../context/ProductContext";
import ProductProvider, {
  IProductContextType,
  IProducts,
} from "../context/ProductContext";

interface IProps
  extends NativeStackScreenProps<StackScreens, "EditProductScreen"> {}
const EditProductScreen: React.FC<IProps> = props => {
  const params = props.route.params;
  console.log("selected product id:", params?.selectedProduct);

  const [productName, setProductName] = useState<string>(
    params.selectedProduct.productName
  );
  const [productPrice, setProductPrice] = useState<string | "">(
    params.selectedProduct.productPrice.toString()
  );
  let priceNumber: number = parseFloat(productPrice);
  const [selectedProductType, setSelectedProductType] = useState<string>(
    params.selectedProduct.productType
  );
  const { showModalVisible, toggleModalVisible } = useToggleModalVisible();
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [productId, setProductId] = useState<number>(params.selectedProduct.id);

  const setModalData = (option: string) => {
    setSelectedProductType(option);
  };

  const appContext = React.useContext(ProductContext);

  useEffect(() => {
    setSaveDisabled(productName.length === 0 || productPrice.length === 0);
  }, [productName, productPrice]);

  const validatePrice = () => {
    console.log("Inside validate Price", priceNumber);
    if (selectedProductType == "Peripheral" && priceNumber < 0) {
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
        "Integrated Products Price should be between 1000 and 2600 dollars",
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
      updateProduct(priceNumber);
    }
  };

  const updateProduct = (priceNumber: number) => {
    console.log(
      "productfound pass",
      appContext?.checkProduct(productName, productId)
    );
    if (
      appContext?.checkProduct(productName, params.selectedProduct.id) == true
    ) {
      appContext?.editProduct(
        params.selectedProduct.id,
        productName,
        priceNumber,
        selectedProductType
      );
      props.navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerStyle}>
        {translate(tokens.screens.EditProductScreen.mainText)}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={translate(
            tokens.screens.AddProductScreen.productNameLabelText
          )}
          style={styles.inputStyle}
          defaultValue={params.selectedProduct.productName}
          onChangeText={text => setProductName(text)}
        />
        <MaterialIcons style={styles.icon} name="add-to-queue" size={30} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={translate(
            tokens.screens.AddProductScreen.productPriceLabelText
          )}
          style={styles.inputStyle}
          defaultValue={params.selectedProduct.productPrice.toString()}
          keyboardType="decimal-pad"
          onChangeText={text => setProductPrice(text)}
        />
        <MaterialIcons style={styles.icon} name="money" size={30} />
      </View>
      <View>
        <Text style={styles.productTypeLabel}>
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
export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    padding: 20,
  },
  inputStyle: {
    backgroundColor: "lightgrey",
    fontSize: 25,
    width: "80%",
    height: 50,
    marginTop: 30,
    borderBottomWidth: 1,
  },
  btnStyleSave: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    width: 100,
    marginLeft: -150,
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "#000",
    paddingBottom: 10,
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
    right: 30,
    top: 25,
  },
  btwCancelIcon: {
    position: "absolute",
    right: 7,
    top: -31,
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
  productTypeLabel: {
    marginTop: 15,
    fontSize: 18,
  },
});
