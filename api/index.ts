import "reflect-metadata";
import {DataSource} from "typeorm";
import {Collection, Comment, Item, Session, User, UserCredentials} from "./classes";

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from 'path';
import {sql} from '@vercel/postgres';
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import collection from "../src/pages/Collections/Collection";

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
    url:"postgres://default:SqLM6mDOP1wo@ep-dark-pond-a4yvj2b3-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
    type: "postgres",
    database: "verceldb",
    synchronize: true,
    logging: false,
    entities: [User, UserCredentials, Session, Collection, Item, Comment],
});

const usersRepository = AppDataSource.getRepository(User);
const userCredentialsRepository = AppDataSource.getRepository(UserCredentials);
const sessionsRepository = AppDataSource.getRepository(Session);
const collectionsRepository = AppDataSource.getRepository(Collection);
const itemsRepository = AppDataSource.getRepository(Item);
const commentsRepository = AppDataSource.getRepository(Comment);

async function getAuthedUser(cookies?: any) : Promise<User | null> {
    const sessionId = cookies?.sessionId;
    if (!sessionId)
        return null;

    const existingSessions = await sessionsRepository.find({where: {id: sessionId}});
    if (existingSessions.length === 0)
        return null;

    const users = await usersRepository.find({where: {id: existingSessions[0].userId}});
    if (!users.length)
        return null;

    return users[0];
}

app.use(express.static(path.join(__dirname, '../build')))

/////////////////////////////////////for user

app.post('/api/signup', async (req, res) => {
    const {email, password, name} = req.body;
    const existed = await userCredentialsRepository.find({where:{email: email}});
    if (existed.length > 0)
    {
        res.status(409);
        res.send("User already exists");
        return;
    }

    const user = new User();
    user.name = name;
    user.blocked = false;
    user.amountCollections = 0;
    user.amountItems = 0;
    user.isAdmin = false;
    user.picture = "";
    user.description = "";

    const credentials = new UserCredentials();
    credentials.email = email;
    credentials.password = password;
    credentials.user = user;

    await usersRepository.save(user);
    await userCredentialsRepository.save(credentials);

    res.end();
});

app.post('/api/signin', async (req, res) => {
    const {email, password} = req.body;
    let existed = await userCredentialsRepository.find({where: {email: email}, relations: {user: true}});
    if (existed.length === 0) {
        res.status(404);
        res.send("User with this email not found");
        return;
    }

    const credentials = existed[0];
    if (credentials.password !== password) {
        res.status(401);
        res.send("Wrong password!");
        return;
    }
    if (credentials.user.blocked) {
        res.status(403);
        res.send("User is blocked!");
        return;
    }

    const existingSession = (await sessionsRepository.find({where: {userId: credentials.user.id}}))[0];
    if (existingSession) {
        res.send(existingSession);
        return;
    }

    const session = new Session();
    session.userId = credentials.user.id;

    await sessionsRepository.save(session);

    res.send(session);
});

app.delete('/api/logout', async (req, res) => {
    const {id} = req.body;
    await sessionsRepository.delete({userId: id});
    res.status(200);
    res.end();
});

app.get('/api/users/current', async (req, res) => {
    const currentUser = await getAuthedUser(req.cookies);
    res.status(200);
    res.send(currentUser);
});

app.get('/api/users', async (req, res) => {
    const users = await usersRepository.find();

    for(let user of users) {
        const collections = await collectionsRepository.find({where: {user: user}});
        const items = await itemsRepository.find({where: {collection: collections}});

        user.amountItems = items.length;
        user.amountCollections = collections.length;
    }

    res.send(users);
});

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    const user = (await usersRepository.find({where: {id: id}}))[0];
    res.send(user);
});

app.delete('/api/users/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const id = req.params.id;
    const user = await usersRepository.find({where: {id: id}});
    const credentials = await userCredentialsRepository.find({where: {user: user[0]}, relations: {user: true}});
    await userCredentialsRepository.delete(credentials[0]);
    await usersRepository.delete(user[0]);
    await sessionsRepository.delete({userId: id});
    res.end();
});

app.post('/api/users/:id/block', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const id = req.params.id;
    const user = (await usersRepository.find({where: {id: id}}))[0];
    user.blocked = true;
    await usersRepository.save(user);
    await sessionsRepository.delete({userId: id});
    res.end();
});

app.post('/api/users/:id/unblock', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const id = req.params.id;
    const user = (await usersRepository.find({where: {id: id}}))[0];
    user.blocked = false;
    await usersRepository.save(user);
    res.end();
});

app.post('/api/users/:id/access', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const id = req.params.id;
    const {isAdmin} = req.body;
    const user = (await usersRepository.find({where: {id: id}}))[0];
    user.isAdmin = isAdmin;
    await usersRepository.save(user);
    res.end();
});

app.post('/api/users/:id/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.patch('/api/users/:id/edit', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const id = req.params.id;
    const {name, description} = req.body;
    const user = (await usersRepository.find({where: {id: id}}))[0];
    user.name = name;
    user.description = description;
    await usersRepository.save(user);
    res.end();
});

/////////////////////////////////////for main

app.get('/api/main/tags', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.get('/api/main/collections', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.get('/api/main/items', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.get('/api/main/users', async (req, res) => {
    const users = await usersRepository.find();

    for(let user of users) {
        const collections = await collectionsRepository.find({where: {user: user}});
        const items = await itemsRepository.find({where: {collection: collections}});

        user.amountItems = items.length;
        user.amountCollections = collections.length;
    }

    users.sort((a,b) => b.amountCollections-a.amountCollections)
    res.send(users.slice(0, 3));
});

//////////////////////////////////////////////////////for collections

app.get('/api/collections', async (req, res) => {
    const collections = await collectionsRepository.find();
    res.send(collections);
});

app.get('/api/user/collections/:id', async (req, res) => {
    const {id} = req.params;
    const user = (await usersRepository.find({where: {id: id}}))[0];
    const collections = await collectionsRepository.find({where: {user: user}});
    res.send(collections);
});

app.get('/api/collections/:id', async (req, res) => {
    const {id} = req.params;
    const collection = (await collectionsRepository.find({where: {id: id}, relations: {user: true}}))[0];
    const userId = collection.user.id;
    res.send({...collection, user:userId});
});

app.delete('/api/collections/:id', async (req, res) => {
    const {id} = req.params;
    const collection = (await collectionsRepository.find({where: {id: id}}))[0];
    await collectionsRepository.delete(collection);
    res.end();
});

app.post('/api/collections/create', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {id, collection} = req.body;
    delete collection.id;
    collection.user = (await usersRepository.find({where: {id: id}}))[0];
    await collectionsRepository.save(collection);
    res.end();
});

app.post('/api/collections/:id/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.patch('/api/collections/:id', async (req, res) => {
    const id = req.params.id;
    const {collection} = req.body;
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const updatedCollection = (await collectionsRepository.find({where: {id: id}}))[0];

    updatedCollection.name = collection.name;
    updatedCollection.description = collection.description;
    updatedCollection.text1 = collection.text1;
    updatedCollection.text2 = collection.text2;
    updatedCollection.text3 = collection.text3;
    updatedCollection.paragraph1 = collection.paragraph1;
    updatedCollection.paragraph2 = collection.paragraph2;
    updatedCollection.paragraph3 = collection.paragraph3;
    updatedCollection.number1 = collection.number1;
    updatedCollection.number2 = collection.number2;
    updatedCollection.number3 = collection.number3;
    updatedCollection.date1 = collection.date1;
    updatedCollection.date2 = collection.date2;
    updatedCollection.date3 = collection.date3;
    updatedCollection.checkbox1 = collection.checkbox1;
    updatedCollection.checkbox2 = collection.checkbox2;
    updatedCollection.checkbox3 = collection.checkbox3;

    await collectionsRepository.save(updatedCollection);

    const items = await itemsRepository.find({where: {collection: updatedCollection}});
    for(let item of  items){
        item.text1 = collection.text1.label === '' ? '' : item.text1;
        item.text2 = collection.text2.label === '' ? '' : item.text2;
        item.text3 = collection.text3.label === '' ? '' : item.text3;
        item.paragraph1 = collection.paragraph1.label === '' ? '' : item.paragraph1;
        item.paragraph2 = collection.paragraph2.label === '' ? '' : item.paragraph2;
        item.paragraph3 = collection.paragraph3.label === '' ? '' : item.paragraph3;
        item.number1 = collection.number1.label === '' ? '' : item.number1;
        item.number2 = collection.number2.label === '' ? '' : item.number2;
        item.number3 = collection.number3.label === '' ? '' : item.number3;
        item.date1 = collection.date1.label === '' ? '' : item.date1;
        item.date2 = collection.date2.label === '' ? '' : item.date2;
        item.date3 = collection.date3.label === '' ? '' : item.date3;
        item.checkbox1 = collection.checkbox1.label === '' ? false : item.checkbox1;
        item.checkbox2 = collection.checkbox2.label === '' ? false : item.checkbox2;
        item.checkbox3 = collection.checkbox3.label === '' ? false : item.checkbox3;
    }
    await itemsRepository.save(items);
    res.end();
});

///////////////////////////////////////////////////for item

app.get('/api/items', async (req, res) => {
    const items = await itemsRepository.find({relations: {collection:true}});
    for(let item of items){
        const collection = (await collectionsRepository.find({where:{ id: item.collection.id}, relations: {user: true}}))[0];
        item.userId = collection.user.id;
        item.userName = collection.user.name;
    }
    res.send(items);
});

app.get('/api/collection/items/:id', async (req, res) => {
    const {id} = req.params;
    const collection = (await collectionsRepository.find({where: {id: id}}))[0];
    const items = await itemsRepository.find({where: {collection: collection}});
    res.send(items);
});

app.get('/api/items/:id', async (req, res) => {
    const id = req.params.id;
    const item = (await itemsRepository.find({where:{id:id}, relations: {collection: true}}))[0];
    const collection = (await collectionsRepository.find({where:{ id: item.collection.id}, relations: {user: true}}))[0];
    item.userId = collection.user.id;
    item.userName = collection.user.name;
    res.send(item);
});

app.delete('/api/items/:id', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const id = req.params.id;
    const item = (await itemsRepository.find({where:{id:id}}))[0];
    await itemsRepository.delete(item);
    res.end();
});

app.post('/api/items', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {id, item} = req.body;
    delete item.id;

    item.collection = (await collectionsRepository.find({where:{id: id}}))[0];
    item.timestamp = new Date(Date.now());
    await itemsRepository.save(item);
    res.end();
});

app.post('/api/items/:id/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.patch('/api/items/:id', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {id} = req.params;
    const {item} = req.body;

    const updatedItem = (await itemsRepository.find({where:{id:id}}))[0];
    updatedItem.name = item.name;
    updatedItem.tags = item.tags;
    updatedItem.text1 = item.text1;
    updatedItem.text2 = item.text2;
    updatedItem.text3 = item.text3;
    updatedItem.paragraph1 = item.paragraph1;
    updatedItem.paragraph2 = item.paragraph2;
    updatedItem.paragraph3 = item.paragraph3;
    updatedItem.number1 = item.number1;
    updatedItem.number2 = item.number2;
    updatedItem.number3 = item.number3;
    updatedItem.date1 = item.date1;
    updatedItem.date2 = item.date2;
    updatedItem.date3 = item.date3;
    updatedItem.checkbox1 = item.checkbox1;
    updatedItem.checkbox2 = item.checkbox2;
    updatedItem.checkbox3 = item.checkbox3;

    await itemsRepository.save(updatedItem);
    res.end();
});

///////////////////////////////////////////////////////comment

app.get('/api/comments', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.delete('/api/comments/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/comments', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {id, comment} = req.body;
    delete comment.id;

    comment.user = (await usersRepository.find({where:{id: comment.userId}}))[0];
    comment.timestamp = new Date(Date.now());
    await commentsRepository.save(comment);
    res.end();
});

//////////////////////////////////////////////////likes

app.delete('/api/likes/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/likes/', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT);
    })
    .catch((error: Error) => console.log(error));
