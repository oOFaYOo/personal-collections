import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {IPersonalCollectionsState, ThemeType} from "./type";
import {IUser} from "../api_client/UserRequests/type";


const allTopics: ThemeType[] = ['Anime', 'Game', 'Movie'];

export const initialState: IPersonalCollectionsState = {
    theme: localStorage.theme ? localStorage.theme : 'light',
    currentUser: null,
    collectionTheme: allTopics,
    filterByTheme: allTopics.map(value => {
        return {collectionTheme: value, filtered: false}
    }),
    searchValue: '',
};

export const PersonalCollectionsStoreSlice = createSlice({
    name: 'PersonalCollectionsStore',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },
        setCurrentUser: (state, action: PayloadAction<IUser | null>) => {
            state.currentUser = action.payload
        },
        setFilterByTheme: (state, action: PayloadAction<{ collectionTheme: ThemeType, filtered: boolean }[]>) => {
            state.filterByTheme = action.payload
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
    },
});

export const {
    setTheme,
    setCurrentUser,
    setFilterByTheme,
    setSearchValue
} = PersonalCollectionsStoreSlice.actions;

export default PersonalCollectionsStoreSlice.reducer;