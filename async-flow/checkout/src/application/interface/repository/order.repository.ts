import { Order } from "../../../domain/model/order";

export interface OrderRepository {
    get(id: string): Promise<Order>;
    save(order: Order): Promise<void>;
    update(order: Order): Promise<void>;
}
