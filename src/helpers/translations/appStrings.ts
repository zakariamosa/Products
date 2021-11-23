enum CreateProductScreen{
    mainText = "addProduct-main-text",
    productNameLabelText = "productName-label-text",
    productPriceLabelText = "productPrice-label-text",
    productTypeLabelText = "productType-label-text",
    saveButtonText = "save-button-text",
    cancelButtonText = "cancel-button-text",
}

enum EditProductScreen{
    mainText = "editProduct-main-text",
}



export const tokens = {
    screens:{
        AddProductScreen:CreateProductScreen,
        EditProductScreen:EditProductScreen
    }
}