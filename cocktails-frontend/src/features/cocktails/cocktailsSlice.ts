import { createSlice } from '@reduxjs/toolkit';
import { Cocktail } from '../../types';
import { createCocktail, deleteCocktail, fetchCocktails, fetchOneCocktail, publishCocktail } from './cocktailsThunks';

export interface CocktailsState {
  items: Cocktail[];
  cocktail: Cocktail | null;
  itemsFetching: boolean;
  oneFetching: boolean;
  isCreating: boolean;
  deletingCocktailId: string | null;
  isDeleting: boolean;
  publishCocktailId: string | null;
  isPublication: boolean;
}

const initialState: CocktailsState = {
  items: [],
  cocktail: null,
  itemsFetching: false,
  oneFetching: false,
  isCreating: false,
  deletingCocktailId: null,
  isDeleting: false,
  publishCocktailId: null,
  isPublication: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.itemsFetching = false;
        state.items = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.itemsFetching = false;
      });

    builder
      .addCase(fetchOneCocktail.pending, (state) => {
        state.cocktail = null;
        state.oneFetching = true;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, { payload: cocktail }) => {
        state.cocktail = cocktail;
        state.oneFetching = false;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.oneFetching = false;
      });

    builder
      .addCase(createCocktail.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createCocktail.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createCocktail.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(deleteCocktail.pending, (state, action) => {
        state.deletingCocktailId = action.meta.arg;
        state.isDeleting = true;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.deletingCocktailId = null;
        state.isDeleting = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.isDeleting = false;
      });

    builder
      .addCase(publishCocktail.pending, (state, action) => {
        state.publishCocktailId = action.meta.arg;
        state.isPublication = true;
      })
      .addCase(publishCocktail.fulfilled, (state) => {
        state.publishCocktailId = null;
        state.isPublication = false;
      })
      .addCase(publishCocktail.rejected, (state) => {
        state.isPublication = false;
      });
  },
  selectors: {
    selectCocktails: (state) => state.items,
    selectCocktailsFetching: (state) => state.itemsFetching,
    selectOneCocktail: (state) => state.cocktail,
    selectOneCocktailFetching: (state) => state.oneFetching,
    selectCocktailCreating: (state) => state.isCreating,
    selectCocktailDeleting: (state) => state.isDeleting,
    selectCocktailPublication: (state) => state.isPublication,
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;

export const {
  selectCocktails,
  selectCocktailsFetching,
  selectOneCocktail,
  selectOneCocktailFetching,
  selectCocktailCreating,
  selectCocktailDeleting,
  selectCocktailPublication,
} = cocktailsSlice.selectors;
