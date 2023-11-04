import { QUEUE_EVENTS } from "./domain/constants";
import RabbitMQAdapter from "./infra/queue/rabbitmq";
import { CheckoutUsecase, ConfirmOrderUsecase } from "./application/usecase";
import {
    OrderRepositoryInMemory,
    ProductRepositoryInMemory
} from "./infra/database/inmemory/repository";

async function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

async function main() {
    const queue = new RabbitMQAdapter();
    await queue.connect();

    const orderRepository = new OrderRepositoryInMemory();
    const productRepository = new ProductRepositoryInMemory();
    const checkoutUsecase = new CheckoutUsecase(
        orderRepository,
        productRepository,
        queue
    );

    await checkoutUsecase.execute({
        creditCardToken: "123123123",
        email: "willfelix93@gmail.com",
        name: "Will Felix",
        productId: "123123"
    });

    const confirmOrderUsecase = new ConfirmOrderUsecase(orderRepository);
    queue.consume(QUEUE_EVENTS.PAYMENT_APPROVED, async function (input: any) {
        await sleep(3000);
        await confirmOrderUsecase.execute(input);
    });
}

main();
