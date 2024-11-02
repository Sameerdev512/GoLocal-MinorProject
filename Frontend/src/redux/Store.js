import { configureStore } from "@reduxjs/toolkit"
import SellerSlice from './slices/SellerSlice'

const Store = configureStore({
    reducer:{
        seller:SellerSlice  
    }
})

export default Store;