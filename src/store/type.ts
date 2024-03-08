import {IUser} from "../api_client/type";

export interface IPersonalCollectionsState {
    theme: 'light' | 'dark';
    currentUser: IUser | null;
}