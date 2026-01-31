import { configureStore } from '@reduxjs/toolkit'
import colorSlice from '@/reducers/colorsSlice/colorSlice'
import authSlice from '@/reducers/authSlice/authSlice'
import subCategorySlice from '@/reducers/subCategorySlice/subCategorySlice'
import categotySlice  from '@/reducers/categotySlice/categorySlice'
import  productSlice  from '@/reducers/productsSlice/productsSlice'
import brandSlice  from '@/reducers/brandSlice/brandSlice'
import profileSlice from '@/reducers/profileSlice/profileSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    color:colorSlice,
    subCategory:subCategorySlice,
    category:categotySlice,
    product:productSlice,
    brand:brandSlice,
    profile:profileSlice
  },
})