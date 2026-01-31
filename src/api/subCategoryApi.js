import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance, axiosRequest } from "@/utils/url";

export const getSubcategory = createAsyncThunk(
    "subCategory/getSubcategory",
    async () => {
        try {
            let { data } = await apiInstance.get(`/SubCategory/get-sub-category`);
            return data.data;
        } catch (error) {
            console.log(error);
        }
    },
);
export const getByIdSubCategory = createAsyncThunk(
    "subCategory/getByIdSubCategory",
    async (id) => {
        try {
            let { data } = await apiInstance.get(`/SubCategory/get-sub-category-by-id?id=${id}`);
            return data.data
        } catch (error) {
            console.log(error);
        }
    },
);
export const deleteSubCategory = createAsyncThunk(
    "subCategory/deleteSubCategory",
    async (id, { dispatch }) => {
        try {
            await axiosRequest.delete(
                `/SubCategory/delete-sub-category?id=${id}`,

            );

            dispatch(getSubcategory());
        } catch (error) {
            console.log(error);
        }
    }
);
export const addSubCategory = createAsyncThunk(
    "subCategory/addSubCategory",
    async ({ subCategoryAdd, idx }, { dispatch }) => {
        try {
            await axiosRequest.post(
                `/SubCategory/add-sub-category?CategoryId=${idx}&SubCategoryName=${subCategoryAdd}`,
            );
            dispatch(getSubcategory());
        } catch (error) {
            console.log(error);
        }
    }
);

export const editSubCategory = createAsyncThunk(
    "subCategory/editSubCategory",
    async ({  id1,id2,subCategoryEdit }, { dispatch }) => {
        try {
            await axiosRequest.put(
                `/SubCategory/update-sub-category?Id=${id1}&CategoryId=${id2}&SubCategoryName=${subCategoryEdit}`,
            );
            dispatch(getSubcategory());
        } catch (error) {
            console.log(error);
        }
    }
);