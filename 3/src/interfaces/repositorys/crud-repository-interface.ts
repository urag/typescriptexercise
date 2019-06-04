/**
 * An interface of simple crud repository
 */
export interface ICrudRepository {
  // Saves changes in current object or add a new one depending on id
  save(obj: any): any;
  getById(id: any): any;
  getAll(): any[];
  removeById(id: any): any;
}
