/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import { userLanguageSlice } from "./reducers/auth/authSlice";
import { adminLanguageSlice } from "./reducers/admin/adminLanguage";
import ProductSlice from "./reducers/admin/ProductSlice";
import { cartSlice } from "./reducers/admin/cart";
export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        product:ProductSlice.reducer,
        userLanguage:userLanguageSlice.reducer,
        adminLanguage:adminLanguageSlice.reducer,
        cart:cartSlice.reducer
        
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type ExtendedAppDispatch = (action: any) => any;
export default store;