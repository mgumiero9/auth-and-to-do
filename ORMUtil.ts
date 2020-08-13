import "reflect-metadata";
import {createConnection} from "typeorm";

class ORMUtil {

    private static CONNECTION: any;

    static async createDBConnection() {
        if (!this.CONNECTION) {
            return await createConnection()
                .then(connection => {
                    this.CONNECTION = connection;
                    return Promise.resolve(this.CONNECTION);
                })
                .catch(error => {
                    console.log(error)
                    return Promise.reject(error);
                });
        }
        return Promise.resolve(this.CONNECTION);
    }

}

export = ORMUtil;


