import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { DbEntityCollection } from "../../../infrastractures/db-entity-collection"
import { MongoClient, Db } from 'mongodb';
import { Categorie } from "../model/categorie";

export class CategoriesMongoRepository implements ICrudRepository {
  
  
  
    save(obj: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    removeById(id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getById(id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<any[]> {
        throw new Error("Method not implemented.");
    }

  

    findBy(predicate: (value: any, index: number, obj: any[]) => boolean): Promise<any[]> {
        throw new Error("Method not implemented.");
    }
}