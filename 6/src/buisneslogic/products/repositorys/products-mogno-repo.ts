import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { Product } from "../models/product";
import { DbEntityCollection } from "../../../infrastractures/db-entity-collection"
import { MongoClient, Db } from 'mongodb';

export class ProductsMongoRepository implements ICrudRepository {
    private collection: DbEntityCollection<Product>;

    constructor(
        db: Db,
    ) {
        this.collection = new DbEntityCollection(db.collection<Product>('products'));
    }

    save(obj: any) {
        return this.collection.add([obj]);
    }

    getById(id: any) {
        return this.collection.findById(id, true);
    }

    getAll(): any[] | Promise<any[]> {
        return this.collection.all(true);
    }

    removeById(id: any) {
        return this.collection.deleteById(id);
    }

    findBy(predicate: (value: any, index: number, obj: any[]) => boolean): any[] | Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}