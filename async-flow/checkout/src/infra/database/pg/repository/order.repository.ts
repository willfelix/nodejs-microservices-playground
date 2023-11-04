import PgAdapter from "..";
import { Order } from "../../../../domain/model/order";
import { OrderRepository } from "../../../../application/interface/repository";

export class OrderRepositoryDatabase
    extends PgAdapter
    implements OrderRepository
{
    async save(order: Order): Promise<void> {
        await this.connection.query(
            "insert into branas.order (id, product_id, name, email, price, status) values ($1, $2, $3, $4, $5, $6)",
            [
                order.id,
                order.productId,
                order.name,
                order.email,
                order.price,
                order.getStatus()
            ]
        );

        await this.connection.$pool.end();
    }

    async update(order: Order): Promise<void> {
        await this.connection.query(
            "update branas.order set status = $1 where id = $2",
            [order.getStatus(), order.id]
        );
        await this.connection.$pool.end();
    }

    async get(orderId: string): Promise<Order> {
        const [orderData] = await this.connection.query(
            "select * from branas.order where id = $1",
            [orderId]
        );

        await this.connection.$pool.end();

        return new Order(
            orderData.order_id,
            orderData.product_id,
            orderData.name,
            orderData.email,
            parseFloat(orderData.price),
            orderData.status
        );
    }
}
