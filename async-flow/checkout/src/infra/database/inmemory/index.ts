import { Order } from "../../../domain/model/order";
import Product from "../../../domain/model/product";

export class InMemoryDatabase {
    database: { order: Order[]; product: Product[] };

    constructor() {
        this.database = {
            order: [],
            product: [new Product("123123", "The Product", 123)]
        };
    }
}
