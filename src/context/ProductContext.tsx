import React, { useState } from "react";

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
    //updateProduct: (id: number) => void;
    checkProduct : (product:IProducts) => boolean;
    isProductValidated:boolean;
  }   


export const ProductContext = React.createContext<IProductContextType|undefined>(undefined);


 const ProductsProvider:React.FC = (props) => {
    const [productsList,setProductsList] = useState<IProducts[]>([])
    const [isProductValidated,setIsProductValidated] = useState(false)
    

     const saveProduct = (product:IProducts) => {

      /* if(productsList.map((item)=>item.productName === product.productName))
      {
            console.log("Product Name already exists");
      } */
        
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

    const checkProduct = (product:IProducts)=>{
        productsList.filter((products: IProducts) => {
          if (products.productName === product.productName) 
          {
            //product.statusAvailable = true
             
            setIsProductValidated(true);
            console.log("duplicate product");
            //return false
          }
        })

        if(isProductValidated){return false}
        else {return true};
      }
      
      /* const updateProduct = (id: number) => {
        productsList.filter((product: IProducts) => {
          if (product.id === id) {
            product.status = true
            setProductsList([...productsList])
          }
        })
      } */

      return(
        
        <ProductContext.Provider value={{
            productsList,
            saveProduct,
            checkProduct,
            isProductValidated
            //updateProduct,
            
        }}>
            {props.children}
        </ProductContext.Provider>
        
    );


}

export default ProductsProvider