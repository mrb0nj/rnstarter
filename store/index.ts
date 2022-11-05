import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './pokemon';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [pokemonApi.reducerPath]: pokemonApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
