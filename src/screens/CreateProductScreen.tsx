import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TextInput,TouchableOpacity,Modal,Button, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import useToggleModalVisible from '../customhooks/useToggleModalVisible'
import ModalPicker from '../components/ModalPicker'
import ErrorMessage from '../components/ErrorMessage'
import { tokens } from '../helpers/translations/appStrings'
import { translate } from '../helpers/translations/translationConfig'





const CreateProductScreen : React.FC = () => {
    const [productName,setProductName] = useState<string>("");
    const [productPrice,setProductPrice] = useState<string|''>("");
    const priceNumber : number = parseFloat(productPrice);
    const [selectedProductType, setSelectedProductType] = useState<string>('Choose Type...');
    const { showModalVisible, toggleModalVisible } = useToggleModalVisible();
    const [saveDisabled,setSaveDisabled] = useState(false);
    
    const setModalData = (option:string)=>{
        setSelectedProductType(option)
    }

    useEffect(() => {
      setSaveDisabled(productName.length === 0 || productPrice.length === 0 || selectedProductType.length === 0);
    
    }, [productName,productPrice,selectedProductType])

    const validatePrice = () => {
        // console.log("Inside validate Price",priceNumber,selectedProductType);
        if(selectedProductType == 'Peripheral' && priceNumber < 0){
            Alert.alert("Error",
            "Please enter Price > 0 dollars",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
          if(selectedProductType == 'Integrated' && (priceNumber > 2600 || priceNumber < 1000)){
            Alert.alert("Error",
            "Please enter Price between 1000 and 2600 dollars",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );

        } 

        // <ErrorMessage setPriceValue={priceNumber} selectedProductType={selectedProductType} />   
      }

      

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerStyle}>{translate(tokens.screens.AddProductScreen.mainText)}</Text>
            
            <View style={styles.titletext}>
                <Text>{translate(tokens.screens.AddProductScreen.productNameLabelText)}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                style={styles.inputStyle}
                defaultValue={productName}
                onChangeText={(text)=>setProductName(text)} />
                <MaterialIcons style={styles.icon} name="add-to-queue" size={20} />
            </View>
            <View style={styles.titletext}>
                <Text>{translate(tokens.screens.AddProductScreen.productPriceLabelText)}</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStyle}
                // defaultValue={productPrice}
                keyboardType="decimal-pad"
                onChangeText={(text)=>setProductPrice(text)} />
                <MaterialIcons style={styles.icon} name="money" size={20} />
            </View>
            <View style={styles.titletext}>
                <Text>{translate(tokens.screens.AddProductScreen.productTypeLabelText)}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.pickerStyle}
                onPress={()=>toggleModalVisible(true)}>
                    <Text style={styles.pickerText}>{selectedProductType}</Text>
                    <MaterialIcons style={styles.dropDownStyle} name='arrow-drop-down' size={30} />
                </TouchableOpacity>
                <Modal 
                transparent={true}
                animationType='fade'
                visible={showModalVisible}
                onRequestClose={()=>toggleModalVisible(false)}>
                    
                    <ModalPicker 
                    toggleModalVisibility={toggleModalVisible}
                    setModalData={setModalData}
                    
                    />
                </Modal>
           </View>
           
           <View style={styles.saveBtnStyle} >
                <Button 
                  title={translate(tokens.screens.AddProductScreen.saveButtonText)} 
                  color={saveDisabled ? "grey" : 'blue'} 
                  disabled={saveDisabled}
                  onPress={()=>{
                    validatePrice();
                }}></Button>
                <MaterialIcons name="file-download" size={30} color={saveDisabled ? "grey" : 'blue'} />
            </View>
            <View style={styles.cancelBtnStyle}>
                <Button  
                title={translate(tokens.screens.AddProductScreen.cancelButtonText)} 
                color="white" 
                onPress={()=>{
                        console.log("Cancel clicked");
                    }}></Button>
                <MaterialIcons name="cancel" size={30} color="white" />
            </View>
        </SafeAreaView>
    )
}

export default CreateProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      headerStyle:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
        width: 200,
      },
      titletext:{
        fontWeight:'bold',
        fontSize:18,
        margin:5,
        textAlign:'left'
      },
      saveBtnStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:"center",
        borderWidth:1,
        borderRadius:10,
        borderColor:'blue',
        width:'80%',
        color:'white',
        margin:10,
        textAlign:'center'
  },
  cancelBtnStyle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf:"center",
    borderWidth:1,
    borderRadius:10,
    borderColor:'blue',
    width:'80%',
    backgroundColor:'blue',
    color:'white',
    textAlign:'center'
},
      inputStyle:{
        flex:1,
        backgroundColor:'white',
        fontSize:25,
        borderColor:'black',
        borderWidth:2,
        height:50,
        margin:5,
        borderRadius:15,
    },
    inputContainer: {
        flexDirection: 'row',
        borderColor: '#000',
        paddingBottom: 10,
      },
      pickerStyle:{
          paddingHorizontal:10,
          alignSelf:'stretch',
          borderRadius:10,
          borderWidth:1,
          flexDirection:'row',
          borderColor:'black',
          justifyContent:'space-between'
      },
      pickerText:{
          marginVertical:10,
          fontSize:18
      },
      dropDownStyle:{
          color:'black',
          marginTop:8

      },
      icon:{
        position: 'absolute',
        right: 10,
        top:10
      },
      buttonStyle:{ 
        borderRadius:5, 
        paddingVertical:10, 
        paddingHorizontal:30, 
        flexDirection: 'row', 
        backgroundColor: '#3578E5' 
      },
      buttonText:{ 
        marginLeft: 10, 
        color: '#fff', 
        fontWeight: 'bold' 
      }
    })

