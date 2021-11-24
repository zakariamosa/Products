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

enum DisplayProductScreen{
    mainText = "displayProducts-main-text",
    productNameHeader = "display-header-name",
    productPriceHeader = "display-header-price",
    productTypeHeader = "display-header-type"
}
export const tokens = {
    screens:{
        AddProductScreen:CreateProductScreen,
        EditProductScreen:EditProductScreen,
        DisplayProductScreen:DisplayProductScreen
    }
}