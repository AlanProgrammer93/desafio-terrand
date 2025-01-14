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
        updateRecipe(state, action) {
            const { id, user, rating } = action.payload;

            const auxRecipes = [...state.recipes];
            const recipe = auxRecipes.find((item) => item._id === id);
            const ratingExist = recipe.ratings.find((rat) => rat.ratingBy._id === user._id);
            
            if (ratingExist) {
                ratingExist.rating = rating;
            } else {
                recipe.ratings = [...recipe.ratings, { rating: rating, ratingBy: user }]
            }
        },
    },
});

export const { addRecipes, updateRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;