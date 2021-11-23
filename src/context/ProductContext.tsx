import React, { useState } from "react";
import { Alert } from "react-native";

 export interface IProducts  {
    id:number
    productName: string
    productPrice: number
    productType: string
    //statusAvailable:boolean
  } 

     export interface IProductContextType  {
    productsList?: IProducts[];
    saveProduct: (product: IProducts) => void;
    editProduct: (id: number,productName:string,productPrice:number,productType:string) => void;
    checkProduct : (productName:string) => boolean;
    deleteProduct : (productId:number) => void;
    isProductValidated:boolean;
  }   


export const ProductContext = React.createContext<IProductContextType|undefined>(undefined);


 const ProductsProvider:React.FC = (props) => {
    const [productsList,setProductsList] = useState<IProducts[]>([])
    const [isProductValidated,setIsProductValidated] = useState(false)
    

     const saveProduct = (product:IProducts) => {
        
    console.log("Inside saveContext product object value: ",product.id,product.productName,product.productPrice,product.productType)
         const newProduct : IProducts = {
          id: product.id, 
          productName: product.productName,
          productPrice: product.productPrice,
          productType: product.productType,
          //statusAvailable:product.statusAvailable
        } 
        setProductsList((productsList) => [...productsList, newProduct]);
        //setIsProductValidated(false)
      } 

    const checkProduct = (productName:string)=>{
        productsList.filter((products: IProducts) => {
          console.log("Products element array:",products.productName);
          if (products.productName == productName) 
          {
          
            setIsProductValidated(true);
            //console.log("duplicate product");
            
          }
          else{
            setIsProductValidated(false);
          }
        })

        if(isProductValidated == true)
        {
          console.log("IsProductValidated in if:",isProductValidated);
          Alert.alert("Error", "Duplicate Product Values", [
            
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          return false
        }

        else {
          console.log("isProductValidated in else:",isProductValidated)
          return true
        }
      }
      
    const editProduct = (id: number,productName:string,productPrice:number,productType:string) => {
      console.log("Inside Edit product in context");
        productsList.filter((product: IProducts) => {
          if (product.id === id) {
            let temp_state = [...productsList];
            console.log("temp_state array value:",temp_state);
            let temp_element = product;
            console.log("temp_element object value:",temp_element);
            temp_element.productName = productName;
            temp_element.productPrice = productPrice;
            temp_element.productType = productType;
            temp_state[product.id] = temp_element;
            setProductsList(temp_state);
          }
        })
      } 

      const deleteProduct = (productId:number) => {
        console.log("inside delete context function:",productId);
        
        setProductsList([...productsList.filter(e=>e.id !== productId)])

        console.log("New Product list Array:",productsList);

      }

      return(
        
        <ProductContext.Provider value={{
            productsList,
            saveProduct,
            editProduct,
            checkProduct,
            deleteProduct,
            isProductValidated 
        }}>
            {props.children}
        </ProductContext.Provider>
        
    );


}

export default ProductsProvider