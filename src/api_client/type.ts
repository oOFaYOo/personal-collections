import {AdditionalColumnType} from "../components/Table/type";

export interface IApiClient {

}

export interface IUser {
    id: string;
    eMail: string;
    password: string;
    picture: string;
    name: string;
    description: string;
    blocked:boolean;
    isAdmin:boolean;
    amountCollections: number;
    amountItems: number;
}

export interface ICollection {
    id: string;
    picture: string;
    name:string;
    author:{name:string, link:string};
    theme: 'anime' | 'game' | 'movie' | 'book';
    description: string;
    text1: {id:'text1', label:string, type: AdditionalColumnType};
    text2: {id:'text2', label:string, type: AdditionalColumnType};
    text3: {id:'text3', label:string, type: AdditionalColumnType};
    paragraph1: {id:'paragraph1', label:string, type: AdditionalColumnType};
    paragraph2: {id:'paragraph2', label:string, type: AdditionalColumnType};
    paragraph3: {id:'paragraph3', label:string, type: AdditionalColumnType};
    number1: {id:'number1', label:string, type: AdditionalColumnType};
    number2: {id:'number2', label:string, type: AdditionalColumnType};
    number3: {id:'number3', label:string, type: AdditionalColumnType};
    date1: {id:'date1', label:string, type: AdditionalColumnType};
    date2: {id:'date2', label:string, type: AdditionalColumnType};
    date3: {id:'date3', label:string, type: AdditionalColumnType};
    checkbox1: {id:'checkbox1', label:string, type: AdditionalColumnType};
    checkbox2: {id:'checkbox2', label:string, type: AdditionalColumnType};
    checkbox3: {id:'checkbox3', label:string, type: AdditionalColumnType};
}

export interface IItem {
    id:string;
    picture: string;
    name:string;
    author:{name:string, link:string};
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