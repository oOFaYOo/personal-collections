import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IPersonalCollectionsState} from "./type";
import {IUser, ThemeType} from "../api_client/type";

export const initialState: IPersonalCollectionsState = {
    theme: localStorage.theme ? localStorage.theme : 'light',
    currentUser: null,
    filterByTheme: [
        {collectionTheme:"Anime", filtered:false},
        {collectionTheme:"Game", filtered:false},
        {collectionTheme:"Movie", filtered:false},
    ]
};

export const PersonalCollectionsStoreSlice = createSlice({
    name: 'PersonalCollectionsStore',
    initialState,
    reducers: {
        setTheme : (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },
        setCurrentUser : (state, action: PayloadAction<IUser | null>) => {
            state.currentUser = action.payload
        },
        setFilterByTheme : (state, action: PayloadAction<{ collectionTheme:ThemeType, filtered:boolean }[]>) => {
            state.filterByTheme = action.payload
        },
    },
});

export const {
    setTheme,
    setCurrentUser,
    setFilterByTheme
     } = PersonalCollectionsStoreSlice.actions;

export default PersonalCollectionsStoreSlice.reducer;