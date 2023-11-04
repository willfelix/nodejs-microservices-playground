import { OrderRepository, ProductRepository } from "../interface/repository";

type Output = {
    orderId: string;
    name: string;
    email: string;
    price: number;
    status: string;
    productTitle: string;
};

export class GetOrderUsecase {
    constructor(
        readonly orderRepository: OrderRepository,
        readonly productRepository: ProductRepository
    ) {}

    async execute(id: string): Promise<Output> {
        const order = await this.orderRepository.get(id);
        const product = await this.productRepository.get(order.productId);
        return {
            orderId: order.id,
            name: order.name,
            email: order.email,
            price: order.price,
            productTitle: product.title,
            status: order.getStatus().toString()
        };
    }
}
