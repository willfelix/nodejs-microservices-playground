import RabbitMQAdapter from "./infra/queue/rabbitmq";
import ProcessPayment from "./application/usecase/processPayment.usecase";
import { QUEUE_EVENTS } from "./domain/constants";

async function main() {
    const queue = new RabbitMQAdapter();
    await queue.connect();

    const processPayment = new ProcessPayment(queue);
    queue.consume(QUEUE_EVENTS.ORDER_CREATED, async (input: any) => {
        await processPayment.execute(input);
    });
}

main();
