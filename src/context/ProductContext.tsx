import React, { useState } from "react";

export interface IProducts  {
    id:number
    productName: string
    productPrice: number
    productType: string
  }

     export interface IProductContextType  {
    productsList?: IProducts[];
    saveProduct: (product: IProducts) => void;
    //updateProduct: (id: number) => void;
  }   


export const ProductContext = React.createContext<IProductContextType|undefined>(undefined);


 const ProductsProvider:React.FC = (props) => {
    const [productsList,setProductsList] = useState<IProducts[]>([])
    

     const saveProduct = (product:IProducts) => {
    console.log("Inside saveContext product object value: ",product.id,product.productName,product.productPrice,product.productType)
         const newProduct : IProducts = {
          id: product.id, 
          productName: product.productName,
          productPrice: product.productPrice,
          productType: product.productType,
        } 
        
        setProductsList((productsList) => [...productsList, newProduct]);
        productsList.map((p)=>{
          console.log("productlst in save context:", p.id,p.productName,p.productPrice,p.productType);
        }) 
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
            //updateProduct,
            
        }}>
            {props.children}
        </ProductContext.Provider>
        
    );


}

export default ProductsProvider