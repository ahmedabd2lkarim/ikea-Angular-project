import { IOrderItem } from "./iorder-item";
import { OrderStatus } from "./order-status";
import { PayMethod } from "./pay-method";

export interface ICart {
    _id: string;
    total: number;
    userID: string;
    status: OrderStatus;
    subTotal: number;
    orderItems: IOrderItem[];
    shippingFee: number;
    paymentMethod: PayMethod;
    createdAt: Date;
}
