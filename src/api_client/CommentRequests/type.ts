import {IResponse} from "../type";

export interface ICommentRequests {
    getComments:(itemId:string) => Promise<IResponse<IComment[]>>;
    deleteComment:(commentId:string) => Promise<IResponse<void>>;
    addComment:(comment:IComment) => Promise<IResponse<void>>;
}

export interface IComment {
    id: string;
    user: string;
    userId: string;
    itemId: string;
    text: string;
    timestamp: string;
}