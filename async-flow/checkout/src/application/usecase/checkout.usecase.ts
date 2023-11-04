import { Order } from "../../domain/model/order";
import { QUEUE_EVENTS } from "../../domain/constants";
import Queue from "../interface/service/queue";
import { OrderRepository, ProductRepository } from "../interface/repository";

type Input = {
    name: string;
    email: string;
    productId: string;
    creditCardToken: string;
};

type Output = {
    orderId: string;
};

export class CheckoutUsecase {
    constructor(
        readonly orderRepository: OrderRepository,
        readonly productRepository: ProductRepository,
        readonly queueService: Queue
    ) {}

    async execute(input: Input): Promise<Output> {
        const product = await this.productRepository.get(input.productId);
        const order = Order.create({
            name: input.name,
            email: input.email,
            productId: input.productId,
            price: product.price
        });

        await this.orderRepository.save(order);

        await this.queueService.publish(QUEUE_EVENTS.ORDER_CREATED, {
            orderId: order.id,
            price: product.price,
            creditCardToken: input.creditCardToken
        });

        return {
            orderId: order.id
        };
    }
}
