import PgAdapter from "..";
import Product from "../../../../domain/model/product";
import { ProductRepository } from "../../../../application/interface/repository";

export class ProductRepositoryDatabase
    extends PgAdapter
    implements ProductRepository
{
    async get(id: string): Promise<Product> {
        const [productData] = await this.connection.query(
            "select * from branas.product where product_id = $1",
            [id]
        );

        await this.connection.$pool.end();

        return new Product(
            productData.productId,
            productData.title,
            parseFloat(productData.amount)
        );
    }
}
