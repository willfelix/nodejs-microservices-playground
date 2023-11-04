export type Input = {
    orderId: string;
    price: number;
    creditCardToken: string;
};

export type Output = {
    orderId: string;
    status: string;
};

export default interface PaymentGateway {
    processPayment(input: Input): Promise<Output>;
}
