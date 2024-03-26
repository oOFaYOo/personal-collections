import {ICollection} from "../CollectionRequests/type";
import {IItem} from "../ItemRequests/type";
import {IUserCredentials} from "../AuthRequests/type";
import {IResponse} from "../type";

export interface IMainPageRequests {
    getAll: () => Promise<IResponse<any>>;
    // getAllTags: () => Promise<IResponse<string>>;
    // getBiggestCollections: () => Promise<IResponse<ICollection[]>>;
    // getLastItems: () => Promise<IResponse<IItem[]>>;
    // getRandomUsers: () => Promise<IResponse<IUserCredentials[]>>;
}