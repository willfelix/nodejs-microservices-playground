import { InMemoryDatabase } from "..";
import Product from "../../../../domain/model/product";
import { ProductRepository } from "../../../../application/interface/repository";

export class ProductRepositoryInMemory
    extends InMemoryDatabase
    implements ProductRepository
{
    async get(id: string): Promise<Product> {
        return new Promise((resolve) => {
            const product = this.database.product.find((p) => p.id === id)!;
            resolve(product);
        });
    }
}
