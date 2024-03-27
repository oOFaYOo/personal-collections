import * as core from "express-serve-static-core";
import {customTry, getAuthedUser} from "./functions";
import {commentsRepository, usersRepository} from "./index";

export default (app: core.Express, initialization: Promise<void>) => {
    app.get('/api/comments/:itemId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const {itemId} = req.params;
            const comments = await commentsRepository.find({where: {itemId: itemId}, relations: {user: true}});
            res.send(comments);
        }, next));

    app.delete('/api/comments/:commentId', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {commentId} = req.params;
            const comment = (await commentsRepository.find({where: {id: commentId}}))[0];
            await commentsRepository.delete(comment);
            res.end();
        }, next));

    app.post('/api/comments', (req, res, next) =>
        customTry(async () => {
            await initialization;
            const authedUser = await getAuthedUser(req.cookies);
            if (!authedUser) {
                res.status(401);
                res.end();
                return;
            }
            const {comment} = req.body;
            delete comment.id;

            comment.user = (await usersRepository.find({where: {id: comment.userId}}))[0];
            comment.timestamp = new Date(Date.now());
            await commentsRepository.save(comment);
            res.end();
        }, next));
}