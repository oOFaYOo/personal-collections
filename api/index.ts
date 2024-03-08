import "reflect-metadata";
import {DataSource} from "typeorm";
import {Collection, User} from "./classes";

// export const AppDataSource = new DataSource({
//     url:"postgres://default:SqLM6mDOP1wo@ep-dark-pond-a4yvj2b3-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require",
//     type: "postgres",
//     database: "verceldb",
//     synchronize: true,
//     logging: true,
//     entities: [User],
// })
//
// AppDataSource.initialize()
//     .then(() => {
//         const user = new User();
//         user.eMail = '';
//         user.password = '';
//         user.picture = '';
//         user.name = '';
//         user.description = '';
//         user.blocked = false;
//         user.isAdmin = true;
//         user.amountCollections = 0;
//         user.amountItems = 0;
//         AppDataSource.manager.save(user);
//     })
//     .catch((error: Error) => console.log(error));
//
// AppDataSource.initialize()
//     .then(() => {
//         const collection = new Collection();
//
//         AppDataSource.manager.save(collection);
//     })
//     .catch((error: Error) => console.log(error));
//
//
// export default {};

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from 'path';
import {sql} from '@vercel/postgres';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../build')))

/////////////////////////////////////for user

app.post('/api/signup', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.post('/api/signin', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.get('/api/users', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;

    // res.status(200);
    // res.send();
});

app.get('/api/users/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.delete('/api/users/:id', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/users/:id/block', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/users/:id/unblock', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/users/:id/access', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.post('/api/users/:id/picture', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
});

app.patch('/api/users/:id/edit', async (req, res) => {
    // const sessionid = req.cookies?.sessionid;
    const id = req.params.id;
    // res.status(200);
    // res.send();
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
