import "reflect-metadata";
import {DataSource, Equal, FindOperator, Not} from "typeorm";
import {Collection, Comment, Item, Like, Session, User, UserCredentials} from "./classes";
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from 'path';
import {NextFunction, Request, Response} from "express";
import {customTry, getAuthedUser} from "./functions";
import UserApi from "./UserApi";
import AuthApi from "./AuthApi";
import LikeApi from "./LikeApi";
import CommentApi from "./CommentApi";
import ItemApi from "./ItemApi";
import CollectionApi from "./CollectionApi";
import MainPageApi from "./MainPageApi";

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

AuthApi(app);
UserApi(app, initialization);
MainPageApi(app);
CollectionApi(app);
ItemApi(app);
CommentApi(app);
LikeApi(app);

app.get('/api/search', (req, res, next) =>
    customTry(async () => {
        const {value} = req.query;
        const searchPattern = (value as string).split(' ').filter(t => t).join('|');

        const items = await itemsRepository.createQueryBuilder()
            .select()
            .where(`(COALESCE(to_tsvector(name), '') || ' ' || COALESCE(to_tsvector(tags), '') || ' ' 
        || COALESCE(to_tsvector(text1), '') || ' ' || COALESCE(to_tsvector(text2), '') || ' ' || COALESCE(to_tsvector(text3), '')
        || COALESCE(to_tsvector(paragraph1), '') || ' ' || COALESCE(to_tsvector(paragraph2), '') || ' ' || COALESCE(to_tsvector(paragraph3), '') 
        || COALESCE(to_tsvector(number1), '') || ' ' || COALESCE(to_tsvector(number2), '') || ' ' || COALESCE(to_tsvector(number3), '')
        || COALESCE(to_tsvector(date1), '') || ' ' || COALESCE(to_tsvector(date2), '') || ' ' || COALESCE(to_tsvector(date3), '')) @@ to_tsquery('${searchPattern}')`)
            .getMany();

        const comments = await commentsRepository
            .createQueryBuilder()
            .select()
            .where(`to_tsvector(text) @@ to_tsquery('${searchPattern}')`)
            .getMany();

        let set = new Set<string>(items.map(i => i.id));
        let itemsFromCommentsIds = comments
            .map(c => c.itemId)
            .filter(c => !set.has(c))
            .map(c => {
                return {id: c}
            });

        let itemsFromComments = itemsFromCommentsIds.length ? await itemsRepository.find({
            where: itemsFromCommentsIds,
            relations: {collection: true}
        }) : [];

        let itemsWithRelations = await itemsRepository.find({
            where: items.map(i => {return {id:i.id}}),
            relations: {collection: true}
        });

        let allItems = itemsWithRelations.concat(itemsFromComments);

        res.send(allItems);
    }, next));


app.get('/api/search/tag', (req, res, next: NextFunction) =>
    customTry(
        async () => {
            const {value} = req.query;
            const searchPattern = (value as string).split(' ').filter(t => t).join('|');

            const items = await itemsRepository.createQueryBuilder()
                .select()
                .where(`to_tsvector(tags) @@ to_tsquery('${searchPattern}')`)
                .getMany();

            const itemForms = items.map(c => {
                return {id: c.id}
            });
            const itemsWithRelations = await itemsRepository.find({where: itemForms, relations: {collection: true}});

            res.send(itemsWithRelations);
        }, next));


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

export default app;