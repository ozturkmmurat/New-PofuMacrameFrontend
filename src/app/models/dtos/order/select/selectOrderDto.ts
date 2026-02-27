import { SelectSubOrderDto } from "../../subOrder/select/selectSubOrderDto";

export interface SelectUserOrderDto{
    orderId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    totalPrice: number;
    orderDate: Date;
    requestedDeliveryStart: Date;
    requestedDeliveryEnd: Date;
    orderStatus: number;
    selectSubOrderDtos: SelectSubOrderDto[];
}