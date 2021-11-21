import React, { useState } from 'react'
import { StyleSheet, View, Text, SafeAreaView, TextInput,TouchableOpacity,Modal,Button, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import useToggleModalVisible from '../customhooks/useToggleModalVisible'
import ModalPicker from '../components/ModalPicker'



const CreateProductScreen : React.FC = () => {
    const [productName,setProductName] = useState<string>("");
    const [productPrice,setProductPrice] = useState<string|''>("");
    const priceNumber : number = parseFloat(productPrice);
    const [selectedProductType, setSelectedProductType] = useState<string>('Choose Type...');
    //const {showErrorVisible,toggleErrorVisible} = useToggleErrorVisible();
    //const [isModalVisible,setIsModalVisible] = useState(false);
    const { showModalVisible, toggleModalVisible } = useToggleModalVisible();
    
    
    const setModalData = (option:string)=>{
        setSelectedProductType(option)
    }

    const validatePrice = () => {
        console.log("Inside validate Price",priceNumber,selectedProductType);
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
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Text style={styles.headerStyle}>Add New Product</Text>
            
            <View>
                <Text>Product Name</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput 
                style={styles.inputStyle}
                defaultValue={productName}
                onChangeText={(text)=>setProductName(text)} />
                <MaterialIcons style={styles.icon} name="add-to-queue" size={20} />
            </View>
            <View>
                <Text>Product Price</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputStyle}
                // defaultValue={productPrice}
                keyboardType="decimal-pad"
                onChangeText={(text)=>setProductPrice(text)} />
                <MaterialIcons style={styles.icon} name="money" size={20} />
            </View>
            <View>
                <Text>Product Type</Text>
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
                    setPriceValue={priceNumber}
                    />
                </Modal>
           </View>
           <View style={styles.btnStyle}>
                <Button  title="SAVE" color="white" onPress={()=>{
                    
                    validatePrice();
                    

                }}></Button>
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
        justifyContent: 'center',
        
      },
      headerStyle:{
        textAlign: 'center', 
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
        
      },
      btnStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf:"center",
        borderWidth:1,
        borderRadius:10,
        borderColor:'blue',
        backgroundColor:"blue",
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
      }
    })

