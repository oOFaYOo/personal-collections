import "reflect-metadata";
import {DataSource} from "typeorm";
import {Collection, User} from "./classes";
import {AdditionalColumnType} from "../src/components/Table/type";

export const AppDataSource = new DataSource({
    url:"postgres://default:SqLM6mDOP1wo@ep-dark-pond-a4yvj2b3-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
    type: "postgres",
    database: "verceldb",
    synchronize: true,
    logging: true,
    entities: [User],
})

AppDataSource.initialize()
    .then(() => {
        const user = new User();
        user.eMail = '';
        user.password = '';
        user.picture = '';
        user.name = '';
        user.description = '';
        user.blocked = false;
        user.isAdmin = true;
        user.amountCollections = 0;
        user.amountItems = 0;
        AppDataSource.manager.save(user);
    })
    .catch((error: Error) => console.log(error));

AppDataSource.initialize()
    .then(() => {
        const collection = new Collection();
        
        AppDataSource.manager.save(collection);
    })
    .catch((error: Error) => console.log(error));


export default {};