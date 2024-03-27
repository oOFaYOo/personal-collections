import {ICollection} from "../CollectionRequests/type";
import {IItem} from "../ItemRequests/type";
import {IResponse} from "../type";
import {IUser} from "../UserRequests/type";

export interface IMainPageRequests {
    getMain: () => Promise<IResponse<{users: IUser[], collections:ICollection[], items:IItem[], tags:string}>>;
}