import * as core from "express-serve-static-core";
import {
    collectionsRepository,
    commentsRepository,
    itemsRepository,
    likesRepository,
    sessionsRepository,
    userCredentialsRepository,
    usersRepository
} from "./index";
import {customTry, getAuthedUser} from "./functions";
import {In} from "typeorm";

export default (app: core.Express, initialization: Promise<void>) => {
    app.get('/api/users/current', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const currentUser = await getAuthedUser(req.cookies);
            res.send(currentUser);
        }, next))

    app.get('/api/users', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const users = await usersRepository.find();
            for (let user of users) {
                const collections = await collectionsRepository.find({where: {user: user}});
                user.amountCollections = collections.length;
            }
            res.send(users);
        }, next))

    app.get('/api/users/:userId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const {userId} = req.params;
            const user = (await usersRepository.find({where: {id: userId}}))[0];
            const collections = await collectionsRepository.find({where: {user: user}});
            res.send({user:user, collections:collections});
        }, next))

    app.delete('/api/users/:userId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {userId} = req.params;
            const user = (await usersRepository.find({where: {id: userId}}))[0];
            // const comments = await commentsRepository.find({where: {user: user}, relations: {user: true}});
            await commentsRepository.delete({user:user});

            const collections = await collectionsRepository.find({where: {user: user}, relations: {user: true}});

            await itemsRepository.delete({collection: In(collections)});

            await collectionsRepository.delete({user: user});

            await likesRepository.delete({userId: userId});

            await userCredentialsRepository.delete({user: user});

            await usersRepository.delete(user);
            await sessionsRepository.delete({userId: userId});
            res.end();
        }, next))

    app.post('/api/users/:userId/block', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
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
        }, next))

    app.post('/api/users/:userId/unblock', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {userId} = req.params;
            const user = (await usersRepository.find({where: {id: userId}}))[0];
            user.blocked = false;
            await usersRepository.save(user);
            res.end();
        }, next))

    app.post('/api/users/:userId/access', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
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
        }, next))

    // app.post('/api/users/:userId/picture', async (req, res, next) => {
    //     const {userId} = req.params;
    //     const imageType = req.header("Content-Type");
    //     // console.log(userId, imageType!.slice(imageType!.indexOf('/')+1))
    //     // await dbx.filesUpload({path: `/avatar/jjj/${imageType!.slice(imageType!.indexOf('/')+1)}`, contents: req.body})
    //
    //     // const size = +(req.header('Content-Size') ?? 0)
    //     // let fileContent = Buffer.alloc(200);
    //     // req.on('data', (content) => {
    //     //     fileContent += content;
    //     // });
    //     // req.on('end', async ()=>{
    //     //     await dbx.filesUpload({path: `/avatar/jjj.${imageType!.slice(imageType!.indexOf('/')+1)}`, contents: fileContent})
    //     // })
    //     // req.on('end', async () => {
    //     //     console.log(size)
    //     //     console.log(fileContent);
    //     //     const t = fs.createWriteStream("D:/a.jpg");
    //     //     t.write(fileContent);
    //     //     t.end();
    //     //     await dbx.filesUpload({path: `/avatar/${userId}/b.jpg`, contents: fileContent });
    //     //     res.end();
    //     // })
    //     res.end();
    // });

    app.patch('/api/users/:userId/edit', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {userId} = req.params;
            const {name, description, picture} = req.body;
            const user = (await usersRepository.find({where: {id: userId}}))[0];
            user.name = name;
            user.picture = picture;
            user.description = description;
            await usersRepository.save(user);
            res.end();
        }, next));
}