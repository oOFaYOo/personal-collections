import {NextFunction} from "express";
import {User} from "./classes";
import {sessionsRepository, usersRepository} from "./index";

export async function customTry(action: () => Promise<void>, next: NextFunction): Promise<void> {
    try {
        await action();
    } catch (e) {
        next(e);
    }
}

export async function getAuthedUser(cookies?: any): Promise<User | null> {
    const sessionId = cookies?.sessionId;
    if (!sessionId)
        return null;

    const existingSession = (await sessionsRepository.find({where: {id: sessionId}}))[0];
    if (!existingSession)
        return null;

    const user = (await usersRepository.find({where: {id: existingSession.userId}}))[0];
    if (!user)
        return null;

    return user;
}