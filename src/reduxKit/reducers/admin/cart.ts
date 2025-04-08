/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice } from "@reduxjs/toolkit";
import { AddToCartAction } from "../../actions/admin/cart";
import { ProductForm } from "../../../interfaces/admin/Iproduct";

export interface CartProduct extends ProductForm {
    quantity: number;
}


export interface CartState {
    quantity: number | null;
    total: string | null;
    error: string | null;
    loading: boolean;
    products: CartProduct[]; // ✅ Now includes quantity
}



  const initialStateForCart: CartState = {
 
    error: null,
    loading: false,
    quantity: localStorage.getItem("quantity") 
    ? JSON.parse(localStorage.getItem("quantity") as string) 
    : null,
    total:null,
    products: localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products") as string) : []

  };
  
 
  
  export const cartSlice = createSlice({
    name: "/cartSlice",
    initialState: initialStateForCart,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },

    extraReducers: (builder) => {
      builder
        .addCase(AddToCartAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(AddToCartAction.fulfilled, (state, { payload }) => {
            console.log("Payload after adding to cart:", payload);
            state.loading = false;
            state.error = null;
          
            if (!Array.isArray(state.products)) {
                state.products = []; // 🔹 Convert to an empty array if it's not an array
            }
        
            // Ensure state.products is an array and check for duplicates
            const existingProductIndex = state.products.findIndex(
                (product) => product._id === payload.product._id
            );
        
            if (existingProductIndex !== -1) {
                // If product already exists, update its quantity
                state.products[existingProductIndex].quantity += payload.quantity;
            } else {
                // Otherwise, add new product with quantity
                state.products.push({ ...payload.product, quantity: payload.quantity });
            }
        
            // Update localStorage
            localStorage.setItem("products", JSON.stringify(state.products));
            localStorage.setItem("quantity", JSON.stringify(state.products.length)); // Store cart count
        })
        
        .addCase(AddToCartAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        });
    },
  });
  
  
  
  