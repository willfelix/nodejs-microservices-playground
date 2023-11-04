import { QUEUE_EVENTS } from "../../domain/constants";
import Queue from "../interface/service/queue";

export default class ProcessPaymentUsecase {
    constructor(readonly queue: Queue) {}

    async execute(input: Input): Promise<void> {
        console.log("processPayment", input);

        await this.queue.publish(QUEUE_EVENTS.PAYMENT_APPROVED, {
            orderId: input.orderId,
            status: "success"
        });
    }
}

export type Input = {
    orderId: string;
    amount: number;
    creditCardToken: string;
};

export type Output = {
    orderId: string;
    status: string;
};
