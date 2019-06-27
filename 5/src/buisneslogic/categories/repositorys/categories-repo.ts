import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { Categorie } from "../model/categorie";

export class CategorieDemeRepository implements ICrudRepository {
  private static categories: Categorie[] = [
    new Categorie("1", "Drinks"),
    new Categorie("2", "Food"),
    new Categorie("3", "Electronics")
  ];


  findBy(predicate: (value: any, index: number, obj: any[]) => boolean): any[] {
    return CategorieDemeRepository.categories.filter(predicate);
  }

  save(obj: Categorie): Categorie | undefined {
    var categorie = this.getById(obj.id);

    if (categorie) {
      console.log("Changing %s to %s", categorie, obj);
      categorie.id = obj.id;
      categorie.name = obj.name;
    } else {
      CategorieDemeRepository.categories.push(obj);
      console.log("Added %s to repository", obj);
      categorie = obj;
    }
    return categorie;
  }

  getById(id: any): Categorie | undefined {
    return CategorieDemeRepository.categories.find(p => p.id === id);
  }

  getAll(): any[] {
    return CategorieDemeRepository.categories;
  }

  removeById(id: any) {
    var categorie = this.getById(id);
    if (categorie) {
      console.log("Removing %s", categorie);
      CategorieDemeRepository.categories = CategorieDemeRepository.categories.filter(
        (val, index, arr) => {
          return val.id !== id;
        }
      );
    }
  }
}
