import React from 'react'
import { View, Text, Dimensions, TouchableOpacity,StyleSheet, ScrollView } from 'react-native'

const OPTIONS = ['Integrated','Peripheral']
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

interface IModalPicker{
    toggleModalVisibility : (bool:boolean) => void;
    setModalData : (option:string) => void;
}
const ModalPicker : React.FC<IModalPicker> = (props) => {
    
    const onPressItem = (option:string) => {
        props.toggleModalVisibility(false);
        props.setModalData(option);

    }
    const option = OPTIONS.map((item,index)=>{
        return(
            <TouchableOpacity 
            style={styles.option}
            key={index}
            onPress={()=>onPressItem(item)}>
                <Text style={styles.text}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })
    return (
        <TouchableOpacity
        onPress={() => {props.toggleModalVisibility(false)}}
        style={styles.container}
        >
        
        
        <View style={[styles.modal,{width:WIDTH-20,height:HEIGHT/5}]}>
            <ScrollView>
                {option}
            </ScrollView>
        </View>
        </TouchableOpacity>
    )
}

export default ModalPicker

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modal:{
        backgroundColor:'blue',
        borderRadius:10,
    },
    option:{
        alignItems:'flex-start',

    },
    text:{
        margin:20,
        fontSize:16,
        fontWeight:'bold'
    }
})
