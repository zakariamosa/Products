import React from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Button } from "@react-native-material/core";

const OPTIONS = ["Integrated", "Peripheral"];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

interface IModalPicker {
  toggleModalVisibility: (bool: boolean) => void;
  setModalData: (option: string) => void;
  setPriceValue: number;
  //toggleErrorVisibility : (option:string) => void;
}
const ModalPicker: React.FC<IModalPicker> = props => {
  console.log("inside Modal picker");
  const onPressItem = (option: string) => {
    props.toggleModalVisibility(false);
    props.setModalData(option);

    //props.toggleErrorVisibility(option);
  };
  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.item}>{item}</Text>
      </TouchableOpacity>
    );
  });
  return (
    <TouchableOpacity
      onPress={() => {
        props.toggleModalVisibility(false);
      }}
      style={styles.container}
    >
      <View style={[styles.modal, { width: WIDTH - 20, height: HEIGHT / 5.5 }]}>
        <Text style={styles.text}>Product Type</Text>
        <ScrollView>{option}</ScrollView>
        <Button style={styles.button} title="Cancel"></Button>
      </View>
    </TouchableOpacity>
  );
};

export default ModalPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingBottom: 10,
  },
  option: {
    alignItems: "flex-start",
  },
  item: {
    margin: 10,
    fontSize: 18,
  },
  text: {
    margin: 10,
    fontSize: 23,
    fontWeight: "bold",
  },
  button: {
    borderWidth: 1,
    width: 100,
    fontWeight: "bold",
    marginLeft: 290,
  },
});
