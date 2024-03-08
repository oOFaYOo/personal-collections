import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IPersonalCollectionsState} from "./type";
import {IUser} from "../api_client/type";

export const initialState: IPersonalCollectionsState = {
    theme: localStorage.theme ? localStorage.theme : 'light',
    currentUser: null,
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
    },
});

export const {
    setTheme,
    setCurrentUser,
     } = PersonalCollectionsStoreSlice.actions;

export default PersonalCollectionsStoreSlice.reducer;