"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
class CategorieDemeRepository {
    constructor() {
        http.get('http://127.0.0.1:3000/static/categories.json', (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                CategorieDemeRepository.categories = JSON.parse(data);
                console.log("Got categories from static file ", CategorieDemeRepository.categories);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
    findBy(predicate) {
        return CategorieDemeRepository.categories.filter(predicate);
    }
    save(obj) {
        var categorie = this.getById(obj.id);
        if (categorie) {
            console.log("Changing %s to %s", categorie, obj);
            categorie.id = obj.id;
            categorie.name = obj.name;
        }
        else {
            CategorieDemeRepository.categories.push(obj);
            console.log("Added %s to repository", obj);
            categorie = obj;
        }
        return categorie;
    }
    getById(id) {
        return CategorieDemeRepository.categories.find(p => p.id === id);
    }
    getAll() {
        return CategorieDemeRepository.categories;
    }
    removeById(id) {
        var categorie = this.getById(id);
        if (categorie) {
            console.log("Removing %s", categorie);
            CategorieDemeRepository.categories = CategorieDemeRepository.categories.filter((val, index, arr) => {
                return val.id !== id;
            });
        }
    }
}
exports.CategorieDemeRepository = CategorieDemeRepository;
//# sourceMappingURL=categories-repo.js.map