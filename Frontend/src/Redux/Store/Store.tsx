import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserReducer from '../Reducers/UserReducer/UserReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import  Workspaceselected  from '../Reducers/WorkspaceReducer/WorkspaceReducer'

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, UserReducer),
    wosp: persistReducer(persistConfig, Workspaceselected)
})


const store = configureStore({ reducer:rootReducer });
export const persistor = persistStore(store)

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;