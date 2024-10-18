import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktailCreating } from './cocktailsSlice';
import { toast } from 'react-toastify';
import { CocktailMutation } from '../../types';
import { createCocktail } from './cocktailsThunks';
import { Container, Grid2, Typography } from '@mui/material';
import CocktailForm from './components/CocktailForm';

const NewCocktail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectCocktailCreating);

  const onFormSubmit = async (cocktailMutation: CocktailMutation) => {
    try {
      await dispatch(createCocktail(cocktailMutation));
      navigate('/');
      toast.success('New cocktail created');
    } catch (error) {
      toast.error('No new cocktail created');
    }
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          background: 'rgb(255,255,255)',
          borderRadius: 4,
          padding: '30px',
        }}
      >
        <Grid2 container direction="column">
          <Grid2>
            <Typography variant="h4" mb={4} fontWeight="bold">
              New cocktail
            </Typography>
          </Grid2>
          <Grid2 justifyContent="space-between">
            <CocktailForm onSubmit={onFormSubmit} isLoading={isCreating} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default NewCocktail;
