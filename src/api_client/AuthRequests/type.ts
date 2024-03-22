import {IResponse} from "../type";

export interface IAuthRequests {
    signUp: (data:FormData) => Promise<IResponse<void>>;
    signIn: (data:FormData) => Promise<IResponse<ISession>>;
    logout: (userId: string) => Promise<IResponse<void>>;
    getCurrentUser: () => Promise<IResponse<IUserCredentials>>;
}

export interface IUserCredentials {
    id: string;
    email: string;
    password: string;
}

export interface ISession {
    id: string;
    userId: string;
}