import crypto from "crypto";

enum STATUS {
    WAITING_PAYMENT,
    CONFIRMED,
    CANCELED
}

export class Order {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly productId: string,
        readonly price: number,
        private status: STATUS
    ) {}

    static create(data: {
        name: string;
        email: string;
        productId: string;
        price: number;
    }) {
        const id = crypto.randomUUID();
        const status = STATUS.WAITING_PAYMENT;

        return new Order(
            id,
            data.name,
            data.email,
            data.productId,
            data.price,
            status
        );
    }

    getStatus() {
        return this.status;
    }

    confirm() {
        this.status = STATUS.CONFIRMED;
    }
}
