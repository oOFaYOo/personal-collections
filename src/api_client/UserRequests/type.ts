import {IResponse} from "../type";

export interface IUserRequests {
    getUsers: () => Promise<IResponse<IUser[]>>;
    getUser: (userId:string) => Promise<IResponse<IUser>>;
    deleteUser: (userId:string) => Promise<IResponse<void>>;
    blockUser: (userId:string) => Promise<IResponse<void>>;
    unblockUser: (userId:string) => Promise<IResponse<void>>;
    changeAccessLevel: (userId:string, isAdmin:boolean) => Promise<IResponse<void>>;
    uploadUserPicture: (userId:string, picture: File) => Promise<IResponse<void>>;
    editUserData: (userId:string, user:IUser) => Promise<IResponse<void>>;
}

export interface IUser {
    id: string;
    picture: string;
    name: string;
    description: string;
    blocked: boolean;
    isAdmin: boolean;
    amountCollections: number;
}