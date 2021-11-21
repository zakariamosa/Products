import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";
import useToggleModalVisible from "../customhooks/useToggleModalVisible";
import ModalPicker from "../components/ModalPicker";

const CreateProductScreen: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedProductType, setSelectedProductType] = useState(
    "Choose Product Type"
  );
  //const [isModalVisible,setIsModalVisible] = useState(false);
  const { showModalVisible, toggleModalVisible } = useToggleModalVisible();

  const setModalData = (option: string) => {
    setSelectedProductType(option);
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
          defaultValue={productPrice}
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
    borderColor: "red",
    paddingBottom: 10,
  },
  pickerStyle: {
    paddingHorizontal: 10,
    alignSelf: "stretch",
    borderRadius: 10,
    borderColor: "black",
  },
  pickerText: {
    marginVertical: 10,
    fontSize: 18,
    borderWidth: 2,
  },
  icon: {
    position: "absolute",
    right: 50,
    top: 40,
  },
  textStyle: {
    fontSize: 20,
  },
});
