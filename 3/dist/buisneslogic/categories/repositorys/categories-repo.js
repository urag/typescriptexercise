"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categorie_1 = require("../model/categorie");
class CategorieDemeRepository {
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
CategorieDemeRepository.categories = [
    new categorie_1.Categorie("1", "Drinks"),
    new categorie_1.Categorie("2", "Food"),
    new categorie_1.Categorie("3", "Electronics")
];
exports.CategorieDemeRepository = CategorieDemeRepository;
//# sourceMappingURL=categories-repo.js.map