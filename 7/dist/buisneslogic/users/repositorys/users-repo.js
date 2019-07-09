"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
class UsersDemoRepository {
    save(obj) {
        throw new Error("Method not implemented.");
    }
    getById(id) {
        return UsersDemoRepository.users.find(u => u.email === id);
    }
    getAll() {
        throw new Error("Method not implemented.");
    }
    removeById(id) {
        throw new Error("Method not implemented.");
    }
    findBy(predicate) {
        throw new Error("Method not implemented.");
    }
}
UsersDemoRepository.users = [
    new user_1.User("Ura", "myPass", "ADMIN"),
    new user_1.User("Duka", "pass123", "USER")
];
exports.UsersDemoRepository = UsersDemoRepository;
//# sourceMappingURL=users-repo.js.map