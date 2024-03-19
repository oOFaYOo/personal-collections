import {IResponse} from "../type";

export interface ILikeRequests {
    getLikes: (itemId:string) => Promise<IResponse<ILike>>;
    addLike:(like:ILike) => Promise<IResponse<void>>;
    deleteLike:(likeId:string) => Promise<IResponse<void>>;
}

export interface ILike {
    id: string;
    userId: string;
    itemId: string;
}