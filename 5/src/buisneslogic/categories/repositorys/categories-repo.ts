import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { Categorie } from "../model/categorie";
import { Response } from "express-serve-static-core";

const http = require('http');

export class CategorieDemeRepository implements ICrudRepository {
  private static categories: Categorie[];

  constructor() {
    http.get('http://127.0.0.1:3000/static/categories.json', (resp: Response) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk: any) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        CategorieDemeRepository.categories = JSON.parse(data);
        console.log("Got categories from static file ", CategorieDemeRepository.categories);
      });

    }).on("error", (err: Error) => {
      console.log("Error: " + err.message);
    });
  }

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
