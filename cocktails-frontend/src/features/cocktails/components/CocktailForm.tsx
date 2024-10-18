import React, { useState } from 'react';
import { CocktailMutation } from '../../../types';
import { Button, Grid2, IconButton, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

interface Props {
  onSubmit: (cocktail: CocktailMutation) => void;
  isLoading: boolean;
}

const CocktailForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<CocktailMutation>({
    name: '',
    image: '',
    recipe: '',
    ingredients: [{ name: '', amount: '' }],
  });

  const addIngredient = async () => {
    setState((cocktail) => ({
      ...cocktail,
      ingredients: [...cocktail.ingredients, { name: '', amount: '' }],
    }));
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.name.trim() || !state.recipe.trim()) {
      setError('These fields cannot be empty or just whitespace.');
      return;
    }

    setError(null);
    onSubmit({ ...state });
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onIngredientChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    setState((prevState) => {
      const ingredientsCopy = [...prevState.ingredients];
      ingredientsCopy[index] = { ...ingredientsCopy[index], [name]: value };

      return {
        ...prevState,
        ingredients: ingredientsCopy,
      };
    });
  };

  const onIngredientDelete = (index: number) => {
    setState((prevState) => {
      return {
        ...prevState,
        ingredients: prevState.ingredients.filter((_, i) => i !== index),
      };
    });
  };

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={submitFormHandler}
    >
      <Grid2 width="100%">
        <TextField
          required
          label="Name"
          id="name"
          name="name"
          value={state.name}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
      </Grid2>
      <Grid2 width="100%">
        <TextField
          multiline
          label="Recipe"
          id="recipe"
          name="recipe"
          minRows={3}
          value={state.recipe}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        {state.ingredients.map((ingredient, index) => (
          <Grid2 key={`ingredient_${index}`} container spacing={2} mb={2}>
            <Grid2 size={8}>
              <TextField
                required
                label="Ingredient name"
                id="name"
                name="name"
                value={ingredient.name}
                onChange={(event) => onIngredientChange(event, index)}
                error={!!error}
                helperText={error}
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                required
                label="Amount"
                id="amount"
                name="amount"
                value={ingredient.amount}
                onChange={(event) => onIngredientChange(event, index)}
                error={!!error}
                helperText={error}
              />
            </Grid2>
            {index > 0 && (
              <Grid2 size={1}>
                <IconButton
                  type="button"
                  onClick={() => onIngredientDelete(index)}
                  sx={{
                    background: 'lightgray',
                    width: '90%',
                    height: '90%',
                    marginTop: '3px',
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Grid2>
            )}
          </Grid2>
        ))}
        <Button onClick={addIngredient} type="button">
          Add ingredient
        </Button>
      </Grid2>
      <Grid2 width="100%">
        <LoadingButton
          sx={{
            width: '100%',
            height: '45px',
            backgroundColor: error ? 'red' : 'primary.main',
            '&:hover': {
              backgroundColor: error ? 'darkred' : 'primary.dark',
            },
          }}
          type="submit"
          loading={isLoading}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Add
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default CocktailForm;
