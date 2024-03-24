import "reflect-metadata";
import {DataSource, Equal, FindOperator, Not} from "typeorm";
import {Collection, Comment, Item, Like, Session, User, UserCredentials} from "./classes";
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from 'path';
import {Simulate} from "react-dom/test-utils";
import * as _ from "lodash";
import {IItem} from "../src/api_client/ItemRequests/type";

const app = express();
// const dropBoxToken = process.env.token;
// const dbx = new Dropbox({ accessToken: ""});

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
    entities: [User, UserCredentials, Session, Collection, Item, Comment, Like],
});

const usersRepository = AppDataSource.getRepository(User);
const userCredentialsRepository = AppDataSource.getRepository(UserCredentials);
const sessionsRepository = AppDataSource.getRepository(Session);
const collectionsRepository = AppDataSource.getRepository(Collection);
const itemsRepository = AppDataSource.getRepository(Item);
const commentsRepository = AppDataSource.getRepository(Comment);
const likesRepository = AppDataSource.getRepository(Like);

async function getAuthedUser(cookies?: any) : Promise<User | null> {
    const sessionId = cookies?.sessionId;
    if (!sessionId)
        return null;

    const existingSession = (await sessionsRepository.find({where: {id: sessionId}}))[0];
    if (!existingSession)
        return null;

    const user = (await usersRepository.find({where: {id: existingSession.userId}}))[0];
    if (!user)
        return null;

    return user;
}

app.use(express.static(path.join(__dirname, '../build')))

/////////////////////////////////////for user

app.post('/api/signup', async (req, res) => {
    const {email, password, name} = req.body;
    const existed = (await userCredentialsRepository.find({where:{email: email}}))[0];
    if (existed){
        res.status(409);
        res.send("User already exists");
        return;
    }

    const user = new User();
    user.name = name;
    user.blocked = false;
    user.amountCollections = 0;
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
    let existed = (await userCredentialsRepository.find({where: {email: email}, relations: {user: true}}))[0];
    if (!existed) {
        res.status(404);
        res.send("User with this email not found");
        return;
    }

    const credentials = existed;
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
    if (existingSession){
        res.send(existingSession);
        return;
    }

    const session = new Session();
    session.userId = credentials.user.id;
    await sessionsRepository.save(session);

    res.send(session);
});

app.delete('/api/logout', async (req, res) => {
    const {userId} = req.body;
    await sessionsRepository.delete({userId: userId});
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
        user.amountCollections = collections.length;
    }

    res.send(users);
});

app.get('/api/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const user = (await usersRepository.find({where: {id: userId}}))[0];
    res.send(user);
});

app.delete('/api/users/:userId', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {userId} = req.params;
    const user = await usersRepository.find({where: {id: userId}});
    const credentials = await userCredentialsRepository.find({where: {user: user[0]}, relations: {user: true}});
    await userCredentialsRepository.delete(credentials[0]);
    await usersRepository.delete(user[0]);
    await sessionsRepository.delete({userId: userId});
    res.end();
});

app.post('/api/users/:userId/block', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {userId} = req.params;
    const user = (await usersRepository.find({where: {id: userId}}))[0];
    user.blocked = true;
    await usersRepository.save(user);
    await sessionsRepository.delete({userId: userId});
    res.end();
});

app.post('/api/users/:userId/unblock', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {userId} = req.params;
    const user = (await usersRepository.find({where: {id: userId}}))[0];
    user.blocked = false;
    await usersRepository.save(user);
    res.end();
});

app.post('/api/users/:userId/access', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {userId} = req.params;
    const {isAdmin} = req.body;
    const user = (await usersRepository.find({where: {id: userId}}))[0];
    user.isAdmin = isAdmin;
    await usersRepository.save(user);
    res.end();
});

app.post('/api/users/:userId/picture', async (req, res) => {
    const {userId} = req.params;
    const imageType = req.header("Content-Type");
    // console.log(userId, imageType!.slice(imageType!.indexOf('/')+1))
    // await dbx.filesUpload({path: `/avatar/jjj/${imageType!.slice(imageType!.indexOf('/')+1)}`, contents: req.body})

    // const size = +(req.header('Content-Size') ?? 0)
    // let fileContent = Buffer.alloc(200);
    // req.on('data', (content) => {
    //     fileContent += content;
    // });
    // req.on('end', async ()=>{
    //     await dbx.filesUpload({path: `/avatar/jjj.${imageType!.slice(imageType!.indexOf('/')+1)}`, contents: fileContent})
    // })
    // req.on('end', async () => {
    //     console.log(size)
    //     console.log(fileContent);
    //     const t = fs.createWriteStream("D:/a.jpg");
    //     t.write(fileContent);
    //     t.end();
    //     await dbx.filesUpload({path: `/avatar/${userId}/b.jpg`, contents: fileContent });
    //     res.end();
    // })
    res.end();
});

app.patch('/api/users/:userId/edit', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {userId} = req.params;
    const {name, description} = req.body;
    const user = (await usersRepository.find({where: {id: userId}}))[0];
    user.name = name;
    user.description = description;
    await usersRepository.save(user);
    res.end();
});

/////////////////////////////////////for main

app.get('/api/main/tags', async (req, res) => {
    const tags = await itemsRepository.find({select:{tags:true}});
    res.send(tags.map(item => item.tags).join(', '));
});

app.get('/api/main/collections', async (req, res) => {
    let collections = await collectionsRepository.find({relations: {items: true}});
    collections = collections.sort((a,b) => b.items.length - a.items.length).slice(0, 5);
    collections.forEach(collection => {collection.items = []});
    res.send(collections);
});

app.get('/api/main/items', async (req, res) => {
    let items = await itemsRepository.find({relations: {collection:true}});
    items = items.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0,3);
    for(let item of items){
        const collection = (await collectionsRepository.find({where:{ id: item.collection.id}, relations: {user: true}}))[0];
        item.userId = collection.user.id;
        item.userName = collection.user.name;
    }
    res.send(items);
});

app.get('/api/main/users', async (req, res) => {
    const users = await usersRepository.find();

    for(let user of users) {
        const collections = await collectionsRepository.find({where: {user: user}});
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

app.get('/api/user/collections/:userId', async (req, res) => {
    const {userId} = req.params;
    const user = (await usersRepository.find({where: {id: userId}}))[0];
    const collections = await collectionsRepository.find({where: {user: user}});
    res.send(collections);
});

app.get('/api/collections/:collectionId', async (req, res) => {
    const {collectionId} = req.params;
    const collection = (await collectionsRepository.find({where: {id: collectionId}, relations: {user: true}}))[0];
    const userId = collection.user.id;
    res.send({...collection, user:userId});
});

app.delete('/api/collections/:collectionId', async (req, res) => {
    const {collectionId} = req.params;
    const collection = (await collectionsRepository.find({where: {id: collectionId}}))[0];
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
    const {userId, collection} = req.body;
    delete collection.id;
    collection.user = (await usersRepository.find({where: {id: userId}}))[0];
    await collectionsRepository.save(collection);
    res.end();
});

app.post('/api/collections/:collectionId/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const {collectionId} = req.params;
    // res.status(200);
    // res.send();
});

app.patch('/api/collections/:collectionId', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }

    const {collectionId} = req.params;
    const {collection} = req.body;

    const updatedCollection = (await collectionsRepository.find({where: {id: collectionId}}))[0];

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

app.get('/api/collection/items/:collectionId', async (req, res) => {
    const {collectionId} = req.params;
    const collection = (await collectionsRepository.find({where: {id: collectionId}}))[0];
    const items = await itemsRepository.find({where: {collection: collection}});
    res.send(items);
});

app.get('/api/items/:itemId', async (req, res) => {
    const {itemId} = req.params;
    const item = (await itemsRepository.find({where:{id:itemId}, relations: {collection: true}}))[0];
    const collection = (await collectionsRepository.find({where:{ id: item.collection.id}, relations: {user: true}}))[0];
    item.userId = collection.user.id;
    item.userName = collection.user.name;
    res.send(item);
});

app.delete('/api/items/:itemId', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {itemId} = req.params;
    const item = (await itemsRepository.find({where:{id:itemId}}))[0];
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
    const {collectionId, item} = req.body;
    delete item.id;

    item.collection = (await collectionsRepository.find({where:{id: collectionId}}))[0];
    item.timestamp = new Date(Date.now());
    await itemsRepository.save(item);
    res.end();
});

app.post('/api/items/:itemId/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const {itemId} = req.params;
    // res.status(200);
    // res.send();
});

app.patch('/api/items/:itemId', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {itemId} = req.params;
    const {item} = req.body;

    const updatedItem = (await itemsRepository.find({where:{id:itemId}}))[0];
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

app.get('/api/comments/:itemId', async (req, res) => {
    const {itemId} = req.params;
    const comments = await commentsRepository.find({where:{itemId:itemId}, relations:{user:true}});
    res.send(comments);
});

app.delete('/api/comments', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {commentId} = req.body;
    const comment = (await commentsRepository.find({where:{id:commentId}}))[0];
    await commentsRepository.delete(comment);
    res.end();
});

app.post('/api/comments', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {comment} = req.body;
    delete comment.id;

    comment.user = (await usersRepository.find({where:{id: comment.userId}}))[0];
    comment.timestamp = new Date(Date.now());
    await commentsRepository.save(comment);
    res.end();
});

//////////////////////////////////////////////////likes

app.get('/api/likes/:itemId', async (req, res) => {
    const {itemId}= req.params;
    const likes = await likesRepository.find({where:{itemId:itemId}});
    res.send(likes);
});

app.delete('/api/likes', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser){
        res.status(401);
        res.end();
        return;
    }
    const {likeId} = req.body;
    const like = (await likesRepository.find({where:{id:likeId}}))[0];
    await likesRepository.delete(like);
    res.end();
});

app.post('/api/likes', async (req, res) => {
    const authedUser = await getAuthedUser(req.cookies);
    if (!authedUser) {
        res.status(401);
        res.end();
        return;
    }
    const {like} = req.body;
    delete like.id;
    await likesRepository.save(like);
    res.end();
});

app.get('/api/search', async (req, res)=>{
    const {value} = req.query;
    const searchPattern = (value as string).split(' ').filter(t => t).join('|');

    const items = await itemsRepository.createQueryBuilder()
        .select()
        .where(`to_tsvector(name) || ' ' || to_tsvector(tags) || ' ' 
        || to_tsvector(text1) || ' ' || to_tsvector(text2) || ' ' || to_tsvector(text3)
        || to_tsvector(paragraph1) || ' ' || to_tsvector(paragraph2) || ' ' || to_tsvector(paragraph3) 
        || to_tsvector(number1) || ' ' || to_tsvector(number2) || ' ' || to_tsvector(number3)
        || to_tsvector(date1) || ' ' || to_tsvector(date2) || ' ' || to_tsvector(date3) @@ to_tsquery('${searchPattern}')`)
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
        .map(c => {return {id: c}});

    let itemsFromComments = itemsFromCommentsIds.length ? await itemsRepository.find({where: itemsFromCommentsIds, relations:{collection:true}}) : [];

    let allItems = items.concat(itemsFromComments);

    res.send(allItems);
});

app.get('/api/search/tag', async (req, res)=>{
    const {value} = req.query;
    const searchPattern = (value as string).split(' ').filter(t => t).join('|');

    const items = await itemsRepository.createQueryBuilder()
        .select()
        .where(`to_tsvector(tags) @@ to_tsquery('${searchPattern}')`)
        .getMany();

    const itemForms = items.map(c => {return {id: c.id}});
    const itemsWithRelations = await itemsRepository.find({where: itemForms, relations:{collection:true}});

    res.send(itemsWithRelations);
});

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT);
    })
    .catch((error: Error) => console.log(error));
