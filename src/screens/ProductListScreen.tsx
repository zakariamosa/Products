import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,} from "react-native";
import { FAB } from "react-native-paper";
import { StackScreens } from "../helpers/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    productname: 'First Item',
    producttype: 'first product type',
    productprice: 0,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    productname: 'Second Item',
    producttype: 'second product type',
    productprice: 0,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    productname: 'Third Item',
    producttype: 'third product type',
    productprice: 0,
  },
];



const ProductListScreen: React.FC<
  NativeStackScreenProps<StackScreens>
> = props => {
console.log("props", props)
  const [listData, setListData]=useState(DATA);



  return (
    <>


<FlatList 
  data={listData} 
  renderItem={
    ({item}) => <Text>{item.productname} --- {item.producttype}---{item.productprice}</Text>
  } 
  keyExtractor={(item, index) => index.toString()}
/>



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
    backgroundColor: "#8a2be2",
    borderRadius: 100,
  },
  textStyle: {
    fontSize: 25,
  },
});

export default ProductListScreen;
