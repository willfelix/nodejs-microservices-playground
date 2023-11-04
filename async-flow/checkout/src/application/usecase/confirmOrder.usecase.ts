import { OrderRepository } from "../interface/repository";

type Input = {
    orderId: string;
    status: string;
};

export class ConfirmOrderUsecase {
    constructor(readonly orderRepository: OrderRepository) {}

    async execute(input: Input): Promise<void> {
        console.log("ConfirmOrderUsecase", input);

        const order = await this.orderRepository.get(input.orderId);
        if (input.status === "success") {
            order.confirm();
            await this.orderRepository.update(order);
        }
    }
}
