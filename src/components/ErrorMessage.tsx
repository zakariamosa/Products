import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, TextInput,TouchableOpacity,Modal,Button, Alert } from 'react-native'

type IError = {
    setPriceValue :number;
    selectedProductType:string;
}

const ErrorMessage : React.FC<IError> = ({setPriceValue,selectedProductType}) => {

    console.log("inside Error Message component");
            if(selectedProductType == 'Peripheral' && setPriceValue < 0){
                return(
                    <View style={styles.container}>
                    <Text>Please enter Price greater than 0 dollars</Text>
                    </View>
                )
            }
            if(selectedProductType == 'Integrated' && (setPriceValue > 2600 || setPriceValue < 1000)){
                return(
                    <View style={styles.container}>
                    <Text>Please enter Price between 1000 and 2600 dollars</Text>
                    </View>
                )
            }
        return null;
    
}

export default ErrorMessage

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
})