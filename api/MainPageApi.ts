import * as core from "express-serve-static-core";
import {customTry} from "./functions";
import {collectionsRepository, itemsRepository, usersRepository} from "./index";

export default (app: core.Express) => {
    app.get('/api/main/tags', (req, res, next) =>
        customTry(async () => {
            const tags = await itemsRepository.find({select: {tags: true}});
            res.send(tags.map(item => item.tags).join(' '));
        }, next));

    app.get('/api/main/collections', (req, res, next) =>
        customTry(async () => {
            let collections = await collectionsRepository.find({relations: {items: true}});
            collections = collections.sort((a, b) => b.items.length - a.items.length).slice(0, 5);
            collections.forEach(collection => {
                collection.items = []
            });
            res.send(collections);
        }, next));

    app.get('/api/main/items', (req, res, next) =>
        customTry(async () => {
            let items = await itemsRepository.find({relations: {collection: true}});
            items = items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 3);
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

    app.get('/api/main/users', (req, res, next) =>
        customTry(async () => {
            const users = await usersRepository.find();

            for (let user of users) {
                const collections = await collectionsRepository.find({where: {user: user}});
                user.amountCollections = collections.length;
            }

            users.sort((a, b) => b.amountCollections - a.amountCollections)
            res.send(users.slice(0, 3));
        }, next));
}