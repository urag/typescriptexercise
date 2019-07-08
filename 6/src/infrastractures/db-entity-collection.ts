import { Collection, FilterQuery, ObjectID } from 'mongodb';


export interface DbEntity {
  id: string;
}

export class DbEntityCollection<T extends DbEntity> {
  constructor(
    private readonly collection: Collection,
  ) { }

  public async all(stripObjectId = true): Promise<T[]> {
    const projection = stripObjectId ? { _id: 0 } : undefined;
    return await this.collection.find({}, { projection }).toArray();
  }

  public async findById(id: string | ObjectID, stripObjectId = true): Promise<T | null> {
    const documentId = new ObjectID(id);
    return await this.findOne({ _id: documentId }, stripObjectId);
  }

  public async findOne(filter: FilterQuery<T>, stripObjectId = true): Promise<T | null> {
    const projection = stripObjectId ? { _id: 0 } : undefined;
    return await this.collection.findOne(filter, { projection });
  }

 
  public async add(entities: T[]): Promise<void> {
    const newEntities = entities.map(p => {
      const id = new ObjectID();
      p.id = id.toHexString();
      return Object.assign({}, p, {
        _id: id,
      }) as T & { _id: ObjectID };
    });

    await this.collection.insertMany(newEntities);
  }

  public async deleteById(id: string | ObjectID): Promise<boolean> {
    const documentId = new ObjectID(id);
    const result = await this.collection.deleteOne({ _id: documentId });
    return !!result.deletedCount;
  }

  public async replace(entity: T, upsert = false): Promise<boolean> {
    const documentId = new ObjectID(entity.id);
    const result = await this.collection.replaceOne(
      { _id: documentId },
      entity,
      { upsert },
    );

    return !!(result.modifiedCount + result.upsertedCount);
  }
}
