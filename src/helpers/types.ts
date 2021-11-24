import { IProducts } from "../context/ProductContext";

export type StackScreens = {
    CreateProduct: undefined;
    WeByte: undefined;
    EditProduct: {selectedProduct:IProducts};
  };