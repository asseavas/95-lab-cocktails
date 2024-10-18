import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneCocktail, selectOneCocktailFetching } from './cocktailsSlice';
import { API_URL } from '../../constants';
import { CardMedia, CircularProgress, Grid2, Typography } from '@mui/material';
import { fetchOneCocktail } from './cocktailsThunks';

const OneCocktail = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const oneCocktail = useAppSelector(selectOneCocktail);
  const isFetching = useAppSelector(selectOneCocktailFetching);

  let image = '';

  if (oneCocktail?.image) {
    image = `${API_URL}/${oneCocktail.image}`;
  }

  useEffect(() => {
    dispatch(fetchOneCocktail(id));
  }, [dispatch, id]);

  return (
    <Grid2
      container
      mt={2}
      sx={{
        background: 'rgb(255,255,255)',
        borderRadius: 4,
        padding: '30px',
        width: '70%',
        marginInline: 'auto',
      }}
    >
      {isFetching && (
        <Grid2 sx={{ marginInline: 'auto', marginTop: '8%' }}>
          <CircularProgress />
        </Grid2>
      )}
      {oneCocktail && (
        <Grid2 container direction="column">
          <Grid2 container spacing={4}>
            <Grid2 size={7}>
              <CardMedia
                component="img"
                sx={{ height: '380px', borderRadius: '10px' }}
                image={image}
                alt={oneCocktail.name}
              />
            </Grid2>
            <Grid2 size={5} direction="column">
              <Grid2 component={Typography} variant="h4" fontWeight={'bold'} mb={3} mt={2}>
                {oneCocktail.name}
              </Grid2>
              <Grid2 container spacing={1} direction="column">
                <Grid2 component={Typography} variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Ingredients
                </Grid2>
                {oneCocktail.ingredients.map((ingredient) => (
                  <Grid2 container spacing={2}>
                    <Grid2 component={Typography} sx={{ fontWeight: 'bold' }}>
                      {ingredient.name}
                    </Grid2>
                    <Grid2 component={Typography}>{ingredient.amount}</Grid2>
                  </Grid2>
                ))}
              </Grid2>
              {!oneCocktail.isPublished && (
                <Grid2
                  component={Typography}
                  sx={{
                    padding: '6px 10px',
                    marginTop: '30px',
                    backgroundColor: '#d8d8d8',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  Unpublished
                </Grid2>
              )}
            </Grid2>
          </Grid2>
          <Grid2 component={Typography} variant="h6" sx={{ fontWeight: 'bold', mt: 4, mb: 2 }}>
            Recipe
          </Grid2>
          <Grid2 component={Typography}>{oneCocktail.recipe}</Grid2>
        </Grid2>
      )}
    </Grid2>
  );
};

export default OneCocktail;
