import * as core from "express-serve-static-core";
import {customTry} from "./functions";
import {commentsRepository, itemsRepository} from "./index";
import {NextFunction} from "express";

export default (app: core.Express, initialization: Promise<void>) => {
    app.get('/api/search', (req, res, next) =>
        customTry(async () => {
            await initialization;
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
                await initialization;
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
}