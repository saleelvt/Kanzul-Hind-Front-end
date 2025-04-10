import axios  from "axios";
import { URL,config,configWithTokenMultiPart } from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { MyObject } from "../../../interfaces/admin/addDoument";


export const axiosIn = axios.create({
    baseURL: URL,
  });
  

  export const AddProductAction= createAsyncThunk(
    "/admin/AddProduct",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
          
            const response = await axiosIn.post(`/admin/AddProduct`, adminCredentials,configWithTokenMultiPart());
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
  export const GetProductsAction= createAsyncThunk(
    "/admin/GetProductsAction",
    async (__,{rejectWithValue})=>{
        try {
            const response = await axiosIn.get(`/admin/getProduct`,config);
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
  export const GetProductByIdAction= createAsyncThunk(
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

  export const DeleteProductByIdAction= createAsyncThunk(
    "/admin/DeleteProductByIdAction",
    async (id:string,{rejectWithValue})=>{
        try {
            const response = await axiosIn.delete(`/admin/deleteProductById/${id}`,config);
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

  export const UpdateProductAction= createAsyncThunk(
    "/admin/UpdateProduct",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
          console.log("first prind ");
          
            const response = await axiosIn.post(`/admin/updateProductById`, adminCredentials,configWithTokenMultiPart());
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