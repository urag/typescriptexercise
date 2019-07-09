/**
 * An interface of simple crud repository
 */
export interface ICrudRepository {
  // Saves changes in current object or add a new one depending on id
  save(obj: any): any | Promise<any>;
  getById(id: any): any | Promise<any>;
  getAll(): any[] | Promise<any[]>;
  removeById(id: any): any | Promise<any>;
  findBy(predicate: ((value: any, index: number, obj: any[]) => boolean)): any[] | Promise<any[]>;
}
