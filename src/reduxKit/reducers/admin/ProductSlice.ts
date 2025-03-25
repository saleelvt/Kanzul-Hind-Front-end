
import { createSlice } from "@reduxjs/toolkit";
import { AddProductAction,GetProductsAction } from "../../actions/admin/ProductActions";



interface document{
    error: string | null;
    loading: boolean;
}

const initialState:document={
    error: null,
    loading: false,
}

export const AddProductSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(AddProductAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(AddProductAction.fulfilled, (state, { payload }) => {
          console.log("product Adding form admin side  ", payload);
          state.loading = false;
          state.error = null;
        })
        .addCase(AddProductAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
      .addCase(GetProductsAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(GetProductsAction.fulfilled, (state, {payload}) => {
          console.log("get product slice payload ;",payload);
          
          state.loading = false;
          state.error = null;
        })
        .addCase(GetProductsAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= AddProductSlice.actions
  export default AddProductSlice