import {AdditionalColumnType} from "../components/Table/type";

export interface IApiClient {
    signUp: (name: string, mail: string, password: string) => void;
    signIn: (mail: string, password: string) => void;
//about user
    getUsers: () => Promise<null>;
    getUser: () => Promise<null>;
    deleteUser: () => Promise<null>;
    blockUser: () => Promise<null>;
    unblockUser: () => Promise<null>;
    changeAccessLevel: () => Promise<null>;
    uploadUserPicture: () => Promise<null>;
    editUserData: () => Promise<null>;
//for main page
    getAllTags: () => Promise<null>;
    getBiggestCollections: () => Promise<null>;
    getLastItems: () => Promise<null>;
    getRandomUsers: () => Promise<null>;
//collections
    getCollections: () => Promise<null>;
    getCollection: () => Promise<null>;
    deleteCollection: () => Promise<null>;
    addCollection: () => Promise<null>;
    uploadCollectionPicture: () => Promise<null>;
    editCollectionData: () => Promise<null>;
//items
    getItems: () => Promise<null>;
    getItem: () => Promise<null>;
    deleteItem: () => Promise<null>;
    addItem: () => Promise<null>;
    uploadItemPicture: () => Promise<null>;
    editItemData: () => Promise<null>;
}

export interface IUser {
    id: string;
    eMail: string;
    password: string;
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
    picture: string;
    name: string;
    author: { name: string, link: string };
    theme: 'anime' | 'game' | 'movie' | 'book';
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
    picture: string;
    name: string;
    author: { name: string, link: string };
    collection: string; //id
    theme: 'anime' | 'game' | 'movie' | 'book';
    tags: string;
    text1: string | null;
    text2: string | null;
    text3: string | null;
    paragraph1: string | null;
    paragraph2: string | null;
    paragraph3: string | null;
    number1: number | null;
    number2: number | null;
    number3: number | null;
    date1: string | null;
    date2: string | null;
    date3: string | null;
    checkbox1: boolean | null;
    checkbox2: boolean | null;
    checkbox3: boolean | null;
}

export interface IComment {
    id: string;
    userId: string;
    itemId: string;
    text: string;
    timestamp: string;
}

export interface ILike {
    id: string;
    userId: string;
    itemId: string;
}