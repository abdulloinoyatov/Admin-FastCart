import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, axiosRequest } from "@/utils/url";

export const getBrand= createAsyncThunk(
    "barnd/getBrand",
    async () => {
        try {
            let { data } = await apiInstance.get(`/Brand/get-brands`);
            return data.data;
        } catch (error) {
            console.log(error);
        }
    },
);
export const getByIdBrand = createAsyncThunk(
    "barnd/getByIdBrand",
    async (id) => {
        try {
            let { data } = await apiInstance.get(`/Brand/get-brand-by-id?id=${id}`);
            return data.data
        } catch (error) {
            console.log(error);
        }
    },
);
export const deleteBrand = createAsyncThunk(
    "barnd/deleteBrand",
    async (id, { dispatch }) => {
        try {
            await axiosRequest.delete(
                `/Brand/delete-brand?id=${id}`,

            );

            dispatch(getBrand());
        } catch (error) {
            console.log(error);
        }
    }
);
export const addBrand= createAsyncThunk(
    "barnd/addBrand",
    async (brandAdd, { dispatch }) => {
        try {
            await axiosRequest.post(
                `/Brand/add-brand?BrandName=${brandAdd}`,
            );
            dispatch(getBrand());
        } catch (error) {
            console.log(error);
        }
    }
);

export const editBrand = createAsyncThunk(
    "barnd/editBrand",
    async ({  idx,editBrand }, { dispatch }) => {
        try {
            await axiosRequest.put(
                `/Brand/update-brand?Id=${idx}&BrandName=${editBrand}`,
            );
            dispatch(getBrand());
        } catch (error) {
            console.log(error);
        }
    }
);