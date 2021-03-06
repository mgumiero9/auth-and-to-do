import "reflect-metadata";
import {createConnection} from "typeorm";
import {Users} from "./src/entity/Users";

class UserStuff {

    async createUser() {
        return await createConnection()
            .then(async connection => {
                console.log("Inserting a new user into the database...");
                const user = new Users();
                user.firstName = "Timber";
                user.lastName = "Saw";
                user.age = 25;
                await connection.manager.save(user);
                console.log("Saved a new user with id: " + user.id);

                console.log("Loading users from the database...");
                const users = await connection.manager.find(Users);
                console.log("Loaded users: ", users);

                console.log("Here you can setup and run express/koa/any other framework.");
                return Promise.resolve(users);
            })
            .catch(error => {
                console.log(error)
                return Promise.resolve(error);
            });
    }
}

export = UserStuff;


