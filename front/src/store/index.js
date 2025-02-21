import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';

import userReducer from "./userReducer";
import recipeReducer from "./recipeReducer";
import ownRecipeReducer from "./ownRecipeReducer";
import testRecipesReducer from "./testRecipeReducer";

const rootReducer = combineReducers({
    user: userReducer,
    recipes: recipeReducer,
    ownRecipes: ownRecipeReducer,
    testRecipes: testRecipesReducer
});

const store = configureStore({
    reducer: rootReducer,
})

export default store