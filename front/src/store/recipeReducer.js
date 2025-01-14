import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    recipes: [],
}

export const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipes(state, action) {
            state.recipes = action.payload;
        },
    },
});

export const { addRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;