import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TextInput,TouchableOpacity,Modal,Button, Alert } from 'react-native'
import ProductProvider, { ProductContext } from "../context/ProductContext";

const DisplayProductScreen : React.FC = (props:any) => {
    //const { productsList,saveProduct,updateProduct } = useContext(ProductContext);
    const appContext = useContext(ProductContext);
return(
<View>
    <View>
    <Button
    title="Add"
    onPress={() => {
      props.navigation.navigate("CreateProductScreen");
    }}
  />
</View>
<View>
    <Text>{appContext?.productsList?.map((productsList,i) => (
          <>
          <Text key={i}>{productsList.productName}</Text>
          <Text key={i}>{productsList.productPrice}</Text>
          <Text key={i}>{productsList.productType}</Text>
          </>
        ))}</Text>
</View>
</View>

)
}

export default DisplayProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
    })