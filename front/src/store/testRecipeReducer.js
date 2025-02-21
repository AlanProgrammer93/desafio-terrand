import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../utils/axios";

export const fetchRecipes = createAsyncThunk("testRecipes/fetchRecipes", async () => {
  const { data } = await clientAxios.get("/recipe");
  return data.recipes;
});

const testRecipeSlice = createSlice({
  name: "testRecipes",
  initialState: {
    testRecipes: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateRecipe(state, action) {
      const { id, user, rating } = action.payload;

      const auxRecipes = [...state.testRecipes];
      const recipe = auxRecipes.find((item) => item._id === id);
      const ratingExist = recipe.ratings.find((rat) => rat.ratingBy._id === user._id);
      
      if (ratingExist) {
          ratingExist.rating = rating;
      } else {
          recipe.ratings = [...recipe.ratings, { rating: rating, ratingBy: user }]
      }
  },
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;

        if (JSON.stringify(state.testRecipes) !== JSON.stringify(action.payload)) {
          state.testRecipes = action.payload;
        }
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateRecipe } = testRecipeSlice.actions;

export default testRecipeSlice.reducer;
