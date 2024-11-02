import { createSlice } from "@reduxjs/toolkit";

const SellerSlice = createSlice({
    name: "seller",
    initialState: {
        seller: [],
    },
    reducers: {
        addSeller(state, action) {
            state.seller.push(action.payload);
            }
    }
})



export const {addSeller} = SellerSlice.actions;
export default SellerSlice.reducer;
