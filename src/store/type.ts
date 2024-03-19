import {IUser, ThemeType} from "../api_client/type";

export interface IPersonalCollectionsState {
    theme: 'light' | 'dark';
    currentUser: IUser | null;
    filterByTheme: { collectionTheme:ThemeType, filtered:boolean }[];
    searchValue: string
}