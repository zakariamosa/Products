import React, { useState } from "react";

export interface IProducts {
    id:number
    productName: string
    productPrice: number
    productType: string
    status:boolean
  }

    export interface IProductContextType  {
    productsList?: IProducts[];
    saveProduct: (product: IProducts) => void;
    updateProduct: (id: number) => void;
  }  


export const ProductContext = React.createContext<IProductContextType|undefined>(undefined);

 const ProductsProvider:React.FC = (props) => {
    const [productsList,setProductsList] = useState<IProducts[]>([])

    const saveProduct = (product: IProducts) => {
        const newProduct: IProducts = {
          id: Math.random(), 
          productName: product.productName,
          productPrice: product.productPrice,
          productType: product.productType,
          status: false
        }
        setProductsList([...productsList, newProduct])
      }
      
      const updateProduct = (id: number) => {
        productsList.filter((product: IProducts) => {
          if (product.id === id) {
            product.status = true
            setProductsList([...productsList])
          }
        })
      }

      return(
        
        <ProductContext.Provider value={{
            productsList,
            saveProduct,
            updateProduct,
            
        }}>
            {props.children}
        </ProductContext.Provider>
        
    );


}

export default ProductsProvider