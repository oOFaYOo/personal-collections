import {AdditionalColumnType} from "../components/Table/type";

export interface IApiClient {
    signUp: (name: string, email: string, password: string) => Promise<IResponse<void>>;
    signIn: (email: string, password: string) => Promise<IResponse<ISession>>;
    logout: (userId: string) => Promise<IResponse<void>>;
    getCurrentUser: () => Promise<IResponse<IUserCredentials>>;
//about user
    getUsers: () => Promise<IResponse<IUser[]>>;
    getUser: (userId:string) => Promise<IResponse<IUser>>;
    deleteUser: (userId:string) => Promise<IResponse<void>>;
    blockUser: (userId:string) => Promise<IResponse<void>>;
    unblockUser: (userId:string) => Promise<IResponse<void>>;
    changeAccessLevel: (userId:string, isAdmin:boolean) => Promise<IResponse<void>>;
    uploadUserPicture: (userId:string) => Promise<IResponse<void>>;
    editUserData: (userId:string, user:IUser) => Promise<IResponse<void>>;
//for main page
    getAllTags: () => Promise<IResponse<string>>;
    getBiggestCollections: () => Promise<IResponse<ICollection[]>>;
    getLastItems: () => Promise<IResponse<IItem[]>>;
    getRandomUsers: () => Promise<IResponse<IUserCredentials[]>>;
//collections
    getCollections: () => Promise<IResponse<ICollection[]>>;
    getUserCollections: (userId:string) => Promise<IResponse<ICollection[]>>;
    getCollection: (collectionId:string) => Promise<IResponse<ICollection>>;
    deleteCollection: (collectionId:string) => Promise<IResponse<void>>;
    addCollection: (userId:string, collection:ICollection) => Promise<IResponse<void>>;
    uploadCollectionPicture: (collectionId:string) => Promise<IResponse<void>>;
    editCollectionData: (collectionId:string, collection:ICollection) => Promise<IResponse<void>>;
//items
    getItems: () => Promise<IResponse<(IItem & ILikeGeneral)[]>>;
    getCollectionItems: (collectionId:string) => Promise<IResponse<IItem[]>>;
    getItem: (itemId:string) => Promise<IResponse<IItem & ILikeGeneral>>;
    deleteItem: (itemId:string) => Promise<IResponse<void>>;
    addItem: (collectionId:string, item:IItem) => Promise<IResponse<void>>;
    uploadItemPicture: (itemId:string) => Promise<IResponse<void>>;
    editItemData: (itemId:string, item:IItem) => Promise<IResponse<void>>;
//comment
    getComments:(itemId:string) => Promise<IResponse<IComment[]>>;
    deleteComment:(commentId:string) => Promise<IResponse<void>>;
    addComment:(comment:IComment) => Promise<IResponse<void>>;
//like
    getLikes: (itemId:string) => Promise<IResponse<ILike>>;
    addLike:(like:ILike) => Promise<IResponse<void>>;
    deleteLike:(likeId:string) => Promise<IResponse<void>>;
}

export interface IResponse<T> {
    status: number;
    data?: T;
}

export interface IUserCredentials {
    id: string;
    eMail: string;
    password: string;
}

export interface IUser {
    id: string;
    picture: string;
    name: string;
    description: string;
    blocked: boolean;
    isAdmin: boolean;
    amountCollections: number;
    amountItems: number;
}

export interface ICollection {
    id: string;
    user: string;
    picture: string;
    name: string;
    theme: ThemeType;
    description: string;
    text1: { id: 'text1', label: string, type: AdditionalColumnType };
    text2: { id: 'text2', label: string, type: AdditionalColumnType };
    text3: { id: 'text3', label: string, type: AdditionalColumnType };
    paragraph1: { id: 'paragraph1', label: string, type: AdditionalColumnType };
    paragraph2: { id: 'paragraph2', label: string, type: AdditionalColumnType };
    paragraph3: { id: 'paragraph3', label: string, type: AdditionalColumnType };
    number1: { id: 'number1', label: string, type: AdditionalColumnType };
    number2: { id: 'number2', label: string, type: AdditionalColumnType };
    number3: { id: 'number3', label: string, type: AdditionalColumnType };
    date1: { id: 'date1', label: string, type: AdditionalColumnType };
    date2: { id: 'date2', label: string, type: AdditionalColumnType };
    date3: { id: 'date3', label: string, type: AdditionalColumnType };
    checkbox1: { id: 'checkbox1', label: string, type: AdditionalColumnType };
    checkbox2: { id: 'checkbox2', label: string, type: AdditionalColumnType };
    checkbox3: { id: 'checkbox3', label: string, type: AdditionalColumnType };
}

export interface IItem {
    id: string;
    userId: string;
    userName: string;
    collection: string | ICollection; //id
    theme: ThemeType;
    picture: string;
    name: string;
    tags: string;
    text1: string;
    text2: string;
    text3: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    number1: string;
    number2: string;
    number3: string;
    date1: string;
    date2: string;
    date3: string;
    checkbox1: boolean;
    checkbox2: boolean;
    checkbox3: boolean;
}

export interface IComment {
    id: string;
    user: string;
    userId: string;
    itemId: string;
    text: string;
    timestamp: string;
}

export interface ISession {
    id: string;
    userId: string;
}

export interface ILikeGeneral {
    amountLikes: number;
    yourLike:boolean;
}

export interface ILike {
    id: string;
    userId: string;
    itemId: string;
}

export type ThemeType = 'Anime' | 'Game' | 'Movie';