import "reflect-metadata";
import {DataSource, Equal, FindOperator, Not} from "typeorm";
import {Collection, Comment, Item, Like, Session, User, UserCredentials} from "./classes";
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from 'path';
import {NextFunction, Request, Response} from "express";
import UserApi from "./UserApi";
import AuthApi from "./AuthApi";
import LikeApi from "./LikeApi";
import CommentApi from "./CommentApi";
import ItemApi from "./ItemApi";
import CollectionApi from "./CollectionApi";
import MainPageApi from "./MainPageApi";
import SearchApi from "./SearchApi";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
);

const PORT = process.env.PORT || 5000;

const AppDataSource = new DataSource({
    url: "postgres://default:SqLM6mDOP1wo@ep-dark-pond-a4yvj2b3-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
    type: "postgres",
    database: "verceldb",
    synchronize: true,
    logging: false,
    entities: [User, UserCredentials, Session, Collection, Item, Comment, Like],
});

const initialization = AppDataSource.initialize()
    .then(() => {
        app.listen(PORT);
    })
    .catch((error: Error) => console.log(error));

export const usersRepository = AppDataSource.getRepository(User);
export const userCredentialsRepository = AppDataSource.getRepository(UserCredentials);
export const sessionsRepository = AppDataSource.getRepository(Session);
export const collectionsRepository = AppDataSource.getRepository(Collection);
export const itemsRepository = AppDataSource.getRepository(Item);
export const commentsRepository = AppDataSource.getRepository(Comment);
export const likesRepository = AppDataSource.getRepository(Like);

app.use(express.static(path.join(__dirname, '../build')))

AuthApi(app, initialization);
UserApi(app, initialization);
MainPageApi(app, initialization);
CollectionApi(app, initialization);
ItemApi(app, initialization);
CommentApi(app, initialization);
LikeApi(app, initialization);
SearchApi(app, initialization)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

export default app;