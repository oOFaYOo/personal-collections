import * as core from "express-serve-static-core";
import {customTry, getAuthedUser} from "./functions";
import {collectionsRepository, itemsRepository} from "./index";

export default (app: core.Express) => {
    app.get('/api/items', (req, res, next) =>
        customTry(async () => {
            const items = await itemsRepository.find({relations: {collection: true}});
            for (let item of items) {
                const collection = (await collectionsRepository.find({
                    where: {id: item.collection.id},
                    relations: {user: true}
                }))[0];
                item.userId = collection.user.id;
                item.userName = collection.user.name;
            }
            res.send(items);
        }, next));

    app.get('/api/collection/items/:collectionId', (req, res, next) =>
        customTry(async () => {
            const {collectionId} = req.params;
            const collection = (await collectionsRepository.find({where: {id: collectionId}}))[0];
            const items = await itemsRepository.find({where: {collection: collection}});
            res.send(items);
        }, next));

    app.get('/api/items/:itemId', (req, res, next) =>
        customTry(async () => {
            const {itemId} = req.params;
            const item = (await itemsRepository.find({where: {id: itemId}, relations: {collection: true}}))[0];
            const collection = (await collectionsRepository.find({
                where: {id: item.collection.id},
                relations: {user: true}
            }))[0];
            item.userId = collection.user.id;
            item.userName = collection.user.name;
            res.send(item);
        }, next));

    app.delete('/api/items/:itemId', (req, res, next) =>
        customTry(async () => {
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {itemId} = req.params;
            await itemsRepository.delete({id: itemId});
            res.end();
        }, next));

    app.post('/api/items', (req, res, next) =>
        customTry(async () => {
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {collectionId, item} = req.body;
            delete item.id;

            item.collection = (await collectionsRepository.find({where: {id: collectionId}}))[0];
            item.timestamp = new Date(Date.now());
            await itemsRepository.save(item);
            res.end();
        }, next));

    app.post('/api/items/:itemId/picture', async (req, res) => {
        // const sessionid = req.cookies?.sessionid;
        const {itemId} = req.params;
        // res.status(200);
        // res.send();
    });

    app.patch('/api/items/:itemId', (req, res, next) =>
        customTry(async () => {
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {itemId} = req.params;
            const {item} = req.body;

            const updatedItem = (await itemsRepository.find({where: {id: itemId}}))[0];
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
        }, next));
}