import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../utils/axios";

export const fetchRecipes = createAsyncThunk("testRecipes/fetchRecipes", async () => {
  const { data } = await clientAxios.get("/recipe");
  console.log("HACE LA PETICION");
  return data.recipes;
});

const testRecipeSlice = createSlice({
  name: "testRecipes",
  initialState: {
    testRecipes: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
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

export default testRecipeSlice.reducer;
