import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";

const rootReducer = combineReducers({
    auth: authReducer
})

const persistConfig ={
    key:'auth',
    version:1,
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


const store= configureStore({
reducer:persistedReducer,
middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
}),
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store;

export const persistor = persistStore(store);