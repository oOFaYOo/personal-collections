import {ICollection} from "../CollectionRequests/type";
import {ThemeType} from "../../store/type";
import {IResponse} from "../type";

export interface IItemRequests {
    getItems: () => Promise<IResponse<(IItem)[]>>;
    getCollectionItems: (collectionId: string) => Promise<IResponse<IItem[]>>;
    getItem: (itemId: string) => Promise<IResponse<IItem>>;
    deleteItem: (itemId: string) => Promise<IResponse<void>>;
    addItem: (collectionId: string, item: IItem) => Promise<IResponse<void>>;
    // uploadItemPicture: (itemId: string) => Promise<IResponse<void>>;
    editItemData: (itemId: string, item: IItem) => Promise<IResponse<void>>;
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