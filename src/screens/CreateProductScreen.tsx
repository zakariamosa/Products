import React, { useState } from "react";
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

const CreateProductScreen: React.FC<
  NativeStackScreenProps<StackScreens, "CreateProductScreen">
> = props => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string | "">("");
  const priceNumber: number = parseFloat(productPrice);
  const [selectedProductType, setSelectedProductType] =
    useState<string>("Choose Type...");
  //const {showErrorVisible,toggleErrorVisible} = useToggleErrorVisible();
  //const [isModalVisible,setIsModalVisible] = useState(false);
  const { showModalVisible, toggleModalVisible } = useToggleModalVisible();

  const setModalData = (option: string) => {
    setSelectedProductType(option);
  };

  const validatePrice = () => {
    console.log("Inside validate Price", priceNumber, selectedProductType);
    if (selectedProductType == "Peripheral" && priceNumber < 0) {
      Alert.alert("Error", "Please enter Price > 0 dollars", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (
      selectedProductType == "Integrated" &&
      (priceNumber > 2600 || priceNumber < 1000)
    ) {
      Alert.alert("Error", "Please enter Price between 1000 and 2600 dollars", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerStyle}>Create New Product</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Product Name"
          style={styles.inputStyle}
          defaultValue={productName}
          onChangeText={text => setProductName(text)}
        />
        <MaterialIcons style={styles.icon} name="add-to-queue" size={30} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Product Price"
          style={styles.inputStyle}
          // defaultValue={productPrice}
          keyboardType="decimal-pad"
          onChangeText={text => setProductPrice(text)}
        />
        <MaterialIcons style={styles.icon} name="money" size={30} />
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
            setPriceValue={priceNumber}
          />
        </Modal>
      </View>
      <View>
        <Button
          style={styles.btnStyleSave}
          title="SAVE"
          onPress={() => {
            validatePrice();
          }}
        ></Button>
        <Feather
          style={styles.btwSaveIcon}
          name="download"
          size={22}
          color="black"
        />
      </View>
      <View>
        <Button
          style={styles.btnStyleCancel}
          title="Cancel"
          onPress={() => {
            props.navigation.navigate("ProductListScreen");
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
    width: 90,
  },
  btnStyleCancel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: -36,
    marginLeft: 78,
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
    right: 22,
    top: 14,
  },
  btwCancelIcon: {
    position: "absolute",
    right: 7,
    top: -29,
  },
  textStyle: {
    fontSize: 20,
  },
});
