import Product from "../../../domain/model/product";

export interface ProductRepository {
    get(id: string): Promise<Product>;
}
