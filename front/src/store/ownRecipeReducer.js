import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    ownRecipes: [],
}

export const ownRecipeSlice = createSlice({
    name: "ownRecipes",
    initialState,
    reducers: {
        addOwnRecipes(state, action) {
            state.ownRecipes = action.payload;
        },
    },
});

export const { addOwnRecipes } = ownRecipeSlice.actions;

export default ownRecipeSlice.reducer;