import * as core from "express-serve-static-core";
import {customTry, getAuthedUser} from "./functions";
import {collectionsRepository, itemsRepository, usersRepository} from "./index";

export default (app: core.Express, initialization: Promise<void>) => {
    app.get('/api/collections', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const collections = await collectionsRepository.find();
            res.send(collections);
        }, next));

    app.get('/api/user/collections/:userId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const {userId} = req.params;
            const user = (await usersRepository.find({where: {id: userId}}))[0];
            const collections = await collectionsRepository.find({where: {user: user}});
            res.send(collections);
        }, next));

    app.get('/api/collections/:collectionId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const {collectionId} = req.params;
            const collection = (await collectionsRepository.find({where: {id: collectionId}, relations: {user: true}}))[0];
            const userId = collection.user.id;
            res.send({...collection, user: userId});
        }, next));

    app.delete('/api/collections/:collectionId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const {collectionId} = req.params;
            const collection = (await collectionsRepository.find({where: {id: collectionId}}))[0];
            await itemsRepository.delete({collection: collection});
            await collectionsRepository.delete(collection);
            res.end();
        }, next));

    app.post('/api/collections/create', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {userId, collection} = req.body;
            delete collection.id;
            collection.user = (await usersRepository.find({where: {id: userId}}))[0];
            await collectionsRepository.save(collection);
            res.end();
        }, next));

    // app.post('/api/collections/:collectionId/picture', async (req, res) => {
    //     // const sessionid = req.cookies?.sessionid;
    //     const {collectionId} = req.params;
    //     // res.status(200);
    //     // res.send();
    // });

    app.patch('/api/collections/:collectionId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }

            const {collectionId} = req.params;
            const {collection} = req.body;

            const updatedCollection = (await collectionsRepository.find({where: {id: collectionId}}))[0];

            updatedCollection.name = collection.name;
            updatedCollection.picture = collection.picture;
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
            for (let item of items) {
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
        }, next));
}