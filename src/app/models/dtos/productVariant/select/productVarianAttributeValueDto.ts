export interface ProductVariantAttributeValueDto{
    productId:number,
    productVariantId:number,
    endProductVariantId:number,
    productName:string,
    categoryName:string,
    attributeName?:string,
    attributeValue:string,
    imagePath:string,
    price:number,
    kdv:number,
    netPrice:number
    quantity:number,
    
    isActiveAttribute:boolean //Urun detay da attribute aktif olup olmadıgını yonetmek icin db ile veya herhangi bir şey ile alakası yok
}