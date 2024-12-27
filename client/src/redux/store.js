import {combineReducers} from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import userReducer from './userSlice.js'

const rootReducer=combineReducers({
    user:userReducer,
})

const persistConfig={
    key:'root',
    storage,
    version:1,
    whitelist:['user']
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persistor=persistStore(store)