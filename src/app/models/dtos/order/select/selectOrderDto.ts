import { SelectSubOrderDto } from "../../subOrder/select/selectSubOrderDto";

export interface SelectUserOrderDto{
    orderId:number,
    address:string,
    totalPrice:number,
    orderDate:Date,
    selectSubOrderDtos:SelectSubOrderDto[]
}