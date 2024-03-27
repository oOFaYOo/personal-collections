import * as core from "express-serve-static-core";
import {customTry} from "./functions";
import {collectionsRepository, itemsRepository, usersRepository} from "./index";

export default (app: core.Express, initialization: Promise<void>) => {
    app.get('/api/main', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const tags = await itemsRepository.find({select: {tags: true}});

            let collections = await collectionsRepository.find({relations: {items: true}});
            collections = collections.sort((a, b) => b.items.length - a.items.length).slice(0, 5);
            collections.forEach(collection => {
                collection.items = []
            });

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

            const users = await usersRepository.find();

            for (let user of users) {
                const collections = await collectionsRepository.find({where: {user: user}});
                user.amountCollections = collections.length;
            }

            users.sort((a, b) => b.amountCollections - a.amountCollections)

            res.send({
                tags: tags.map(item => item.tags).join(' '),
                collections: collections,
                items: items,
                users: users.slice(0, 3)
            });
        }, next));
}