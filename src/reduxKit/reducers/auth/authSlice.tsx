/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from "@reduxjs/toolkit";

import { loginAdmin , adminLogout,userLanguageChange} from "../../actions/auth/authAction";


export interface UserState {

  error: string | null;
  loading: boolean;
  status?: string | null;
  isLogged: boolean;
  _id?: string | null;
}


const initialState: UserState = {
  error: null,
  loading: false,
  isLogged: localStorage.getItem("isLogged")
    ? JSON.parse(localStorage.getItem("isLogged")!)
    : false,
  status: localStorage.getItem("status")
    ? JSON.parse(localStorage.getItem("status")!)
    : null,
  _id: localStorage.getItem("_id")
    ? JSON.parse(localStorage.getItem("_id")!)
    : null,
};



export interface UserLanguageState {
  userLanguage:string|null
  error: string | null;
  loading: boolean;
}
const initialStateForLanguage: UserLanguageState = {
  userLanguage:JSON.parse(localStorage.getItem("userLanguage") || `"English"`),
  error: null,
  loading: false,
};



export const userLanguageSlice = createSlice({
  name: "/userLanguage",
  initialState: initialStateForLanguage,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(userLanguageChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLanguageChange.fulfilled, (state, { payload }) => {
        console.log("Payload after language change:", payload);
        state.loading = false;
        state.error = null;
       
        state.userLanguage = payload;
        localStorage.setItem("userLanguage", JSON.stringify(state.userLanguage));
      })
      .addCase(userLanguageChange.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});














export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        console.log("admin login payload ", payload);
        state.loading = false;
        state.error = null;
        state.isLogged = true;
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("status",JSON.stringify(state.status))

      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })





      .addCase(adminLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLogout.fulfilled, (state) => {
        state.loading=false
        state.isLogged = false,
          state.error = null,
        localStorage.clear();
      })
      .addCase(adminLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      
  },
});



export const {updateError}= authSlice.actions
export default authSlice
