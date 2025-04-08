import axios  from "axios";
import { URL,config } from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductForm } from "../../../interfaces/admin/Iproduct";
// import { MyObject } from "../../../interfaces/admin/addDoument";


export const axiosIn = axios.create({
    baseURL: URL,
  });
  
   interface cartData{
    quantity:number,
  product:ProductForm
  }


  export const AddToCartAction= createAsyncThunk(
    "/admin/AddToCartAction",
    async (adminCredentials:cartData,{rejectWithValue})=>{
        try {
          
            const response = adminCredentials
            return response ;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
              return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: "Something went wrong!" });
          }
    }
  )
  export const GetCartItemsAction= createAsyncThunk(
    "/admin/GetCartItemsAction",
    async (__,{rejectWithValue})=>{
        try {
            const response = await axiosIn.get(`/admin/getCartItems`,config);
            return response.data ;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
              return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: "Something went wrong!" });
          }
    }
  )


  export const RemoveCartItemAction= createAsyncThunk(
    "/admin/GetProductByIdAction",
    async (id:string,{rejectWithValue})=>{
        try {
            const response = await axiosIn.get(`/admin/getProductById/${id}`,config);
            return response.data ;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
              return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: "Something went wrong!" });
          }
    }
  )
