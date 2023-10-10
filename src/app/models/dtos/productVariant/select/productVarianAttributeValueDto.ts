export interface ProductVariantAttributeValueDto{
    productId:number,
    productVariantId:number,
    endProductVariantId:number,
    attributeName?:string,
    attributeValue:string,
    imagePath:string,
    price:number,
    quantity:number

    isActiveAttribute:boolean //Urun detay da attribute aktif olup olmadıgını yonetmek icin db ile veya herhangi bir şey ile alakası yok
}