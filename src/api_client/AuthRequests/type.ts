import {IResponse} from "../type";

export interface IAuthRequests {
    signUp: (name: string, email: string, password: string) => Promise<IResponse<void>>;
    signIn: (email: string, password: string) => Promise<IResponse<ISession>>;
    logout: (userId: string) => Promise<IResponse<void>>;
    getCurrentUser: () => Promise<IResponse<IUserCredentials>>;
}

export interface IUserCredentials {
    id: string;
    eMail: string;
    password: string;
}

export interface ISession {
    id: string;
    userId: string;
}