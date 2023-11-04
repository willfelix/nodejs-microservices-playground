import axios from "axios";
import PaymentGateway, {
    Input,
    Output
} from "../../application/interface/gateway/payment.gateway";

export default class PaymentGatewayHttp implements PaymentGateway {
    async processPayment(input: Input): Promise<Output> {
        const response = await axios.post(
            "http://localhost:3001/process_payment",
            input
        );
        return response.data;
    }
}
