import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from './api';
import { accountSlice } from './accountSlice';
import { searchSlice } from "./searchSlice";


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [accountSlice.name]: accountSlice.reducer,
        [searchSlice.name]: searchSlice.reducer,


    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});

export const searchActions = searchSlice.actions;



setupListeners(store.dispatch);
