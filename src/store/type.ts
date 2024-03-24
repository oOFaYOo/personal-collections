import {IUser} from "../api_client/UserRequests/type";

export interface IPersonalCollectionsState {
    theme: 'light' | 'dark';
    currentUser: IUser | null;
    filterByTheme: { collectionTheme:ThemeType, filtered:boolean }[];
    searchValue: string;
    searchTag: string;
    collectionTheme: ThemeType[];
}

export type ThemeType = 'Anime' | 'Games' | 'Movies' | 'Books';