import * as core from "express-serve-static-core";
import {customTry, getAuthedUser} from "./functions";
import {likesRepository} from "./index";

export default (app: core.Express, initialization: Promise<void>) => {
    app.get('/api/likes/:itemId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const {itemId} = req.params;
            const likes = await likesRepository.find({where: {itemId: itemId}});
            res.send(likes);
        }, next));

    app.delete('/api/likes', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {likeId} = req.body;
            const like = (await likesRepository.find({where: {id: likeId}}))[0];
            await likesRepository.delete(like);
            res.end();
        }, next));

    app.post('/api/likes', (req, res, next) =>
        customTry(async () => {
            await initialization;
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
        }, next));
}