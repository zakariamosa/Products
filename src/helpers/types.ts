import { IProducts } from "../context/ProductContext";

export type StackScreens = {
    CreateProductScreen: undefined;
    DisplayProductScreen: undefined;
    EditProductScreen: {selectedProduct:IProducts};
  };