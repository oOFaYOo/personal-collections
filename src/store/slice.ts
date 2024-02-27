import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {IPersonalCollectionsState} from "./type";

export const initialState: IPersonalCollectionsState = {
    theme: localStorage.theme ? localStorage.theme : 'light',
};

export const PersonalCollectionsStoreSlice = createSlice({
    name: 'PersonalCollectionsStore',
    initialState,
    reducers: {
        setTheme : (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },
    },
});

export const {
    setTheme,
     } = PersonalCollectionsStoreSlice.actions;

export default PersonalCollectionsStoreSlice.reducer;