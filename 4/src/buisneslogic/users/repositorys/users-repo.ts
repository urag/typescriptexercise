import { ICrudRepository } from "../../../infrastractures/interfaces/repositorys/crud-repository-interface";
import { User } from "../model/user";

export class UsersDemoRepository implements ICrudRepository {

    private static users: User[] = [
        new User("Ura", "myPass", "ADMIN"),
        new User("Duka", "pass123", "USER")
    ];

    save(obj: any) {
        throw new Error("Method not implemented.");
    }

    getById(id: any) {
       return UsersDemoRepository.users.find(u => u.email === id)
    }
    getAll(): any[] {
        throw new Error("Method not implemented.");
    }
    removeById(id: any) {
        throw new Error("Method not implemented.");
    }
    findBy(predicate: (value: any, index: number, obj: any[]) => boolean): any[] {
        throw new Error("Method not implemented.");
    }


}