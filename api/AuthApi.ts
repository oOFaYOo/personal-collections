import * as core from "express-serve-static-core";
import {
    sessionsRepository,
    userCredentialsRepository,
    usersRepository
} from "./index";
import {customTry} from "./functions";
import {Session, User, UserCredentials} from "./classes";

export default (app: core.Express) => {
    app.post('/api/signup', (req, res, next) =>
        customTry(async () => {
            const {email, password, name} = req.body;
            const existed = (await userCredentialsRepository.find({where: {email: email}}))[0];
            if (existed) {
                res.status(409);
                res.send("User already exists");
                return;
            }

            const user = new User();
            user.name = name;
            user.blocked = false;
            user.amountCollections = 0;
            user.isAdmin = false;
            user.picture = "";
            user.description = "";

            const credentials = new UserCredentials();
            credentials.email = email;
            credentials.password = password;
            credentials.user = user;

            await usersRepository.save(user);
            await userCredentialsRepository.save(credentials);

            res.end();
        }, next));

    app.post('/api/signin', (req, res, next) =>
        customTry(async () => {
            const {email, password} = req.body;
            let existed = (await userCredentialsRepository.find({where: {email: email}, relations: {user: true}}))[0];
            if (!existed) {
                res.status(404);
                res.send("User with this email not found");
                return;
            }

            const credentials = existed;
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
        }, next));

    app.delete('/api/logout', (req, res, next) =>
        customTry(async () => {
            const {userId} = req.body;
            await sessionsRepository.delete({userId: userId});
            res.status(200);
            res.end();
        }, next));
}