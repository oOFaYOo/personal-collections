import {IResponse} from "../type";
import {ThemeType} from "../../store/type";
import {AdditionalColumnType} from "../../components/Table/type";

export interface ICollectionRequests {
    getCollections: () => Promise<IResponse<ICollection[]>>;
    getUserCollections: (userId:string) => Promise<IResponse<ICollection[]>>;
    getCollection: (collectionId:string) => Promise<IResponse<ICollection>>;
    deleteCollection: (collectionId:string) => Promise<IResponse<void>>;
    addCollection: (userId:string, collection:ICollection) => Promise<IResponse<void>>;
    uploadCollectionPicture: (collectionId:string) => Promise<IResponse<void>>;
    editCollectionData: (collectionId:string, collection:ICollection) => Promise<IResponse<void>>;
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