import { SelectSubOrderDto } from "../../subOrder/select/selectSubOrderDto";

export interface SelectUserOrderDto{
    orderId:number,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    address:string,
    totalPrice:number,
    orderDate:Date,
    selectSubOrderDtos:SelectSubOrderDto[]
}