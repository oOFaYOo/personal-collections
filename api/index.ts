import "reflect-metadata";
import {DataSource} from "typeorm";
import {Collection, Session, User, UserCredentials} from "./classes";

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from 'path';
import {sql} from '@vercel/postgres';
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;

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
    entities: [User, UserCredentials, Session],
});

const usersRepository = AppDataSource.getRepository(User);
const userCredentialsRepository = AppDataSource.getRepository(UserCredentials);
const sessionsRepository = AppDataSource.getRepository(Session);

async function getAuthedUser(cookies?: any) : Promise<User | null> {
    const sessionId = cookies?.sessionId;
    console.log(cookies);
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
    user.picture = "https://sun9-27.userapi.com/impg/M2gNPOTpINWsFHVOpjc-RSk2rpNKlAfEriopig/ukWQzow150s.jpg?size=1024x1024&quality=96&sign=3908fb39593d5a5b7e8909ce936462bf&type=album";
    user.description = "description description description";

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
    console.log(req);
    const currentUser = await getAuthedUser(req.cookies);
    res.status(200);
    res.send(currentUser);
});

app.get('/api/users', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const users = await usersRepository.find();
    res.send(users);
});

app.get('/api/users/:id', async (req, res) => {

    const id = req.params.id;
    const user = (await usersRepository.find({where: {id: id}}))[0];
    res.send(user);
    // res.status(200);
    // res.send();
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
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

//////////////////////////////////////////////////////for collections

app.get('/api/collections', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.get('/api/collections/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.delete('/api/collections/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/collections/create', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.post('/api/collections/:id/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.patch('/api/collections/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

///////////////////////////////////////////////////for item

app.get('/api/items', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.get('/api/items/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.delete('/api/items/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/items', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.post('/api/items/:id/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.patch('/api/items/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
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
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
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
