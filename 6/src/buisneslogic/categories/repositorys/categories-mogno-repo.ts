import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { DbEntityCollection } from "../../../infrastractures/db-entity-collection"
import { MongoClient, Db } from 'mongodb';
import { Categorie } from "../model/categorie";

export class CategoriesMongoRepository implements ICrudRepository {
    private collection: DbEntityCollection<Categorie>;

    constructor(
        db: Db,
    ) {
        this.collection = new DbEntityCollection(db.collection<Categorie>('categories'));
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