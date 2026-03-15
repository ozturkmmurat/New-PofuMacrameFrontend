export interface Order {
  id: number;
  userId: number;
  extraPrice:number;
  totalPrice: number;
  orderCode: string;
  orderDate: Date;
  orderStatus: number;
  address: string;
  guid?: string;
}