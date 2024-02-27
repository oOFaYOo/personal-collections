import {configureStore} from '@reduxjs/toolkit'
import PersonalCollectionsReducer from './slice'

export const store = configureStore({
    reducer: {
        PersonalCollectionsStore: PersonalCollectionsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
