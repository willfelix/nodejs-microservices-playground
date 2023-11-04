import { InMemoryDatabase } from "..";
import { Order } from "../../../../domain/model/order";
import { OrderRepository } from "../../../../application/interface/repository";

export class OrderRepositoryInMemory
    extends InMemoryDatabase
    implements OrderRepository
{
    async save(order: Order): Promise<void> {
        this.database.order.push(order);
    }

    async update(order: Order): Promise<void> {
        const index = this.database.order.findIndex((o) => o.id === order.id);
        const currentOrder = this.database.order[index];
        const newOrder = new Order(
            currentOrder.id,
            currentOrder.name,
            currentOrder.email,
            currentOrder.productId,
            currentOrder.price,
            order.getStatus()
        );
        this.database.order[index] = newOrder;
    }

    async get(orderId: string): Promise<Order> {
        return new Promise((resolve) => {
            const order = this.database.order.find((o) => o.id === orderId)!;
            resolve(order);
        });
    }
}
