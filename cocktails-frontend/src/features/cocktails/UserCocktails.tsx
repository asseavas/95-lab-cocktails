import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCocktails, selectCocktailsFetching } from './cocktailsSlice';
import { selectUser } from '../users/usersSlice';
import { fetchCocktails } from './cocktailsThunks';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import CocktailCard from './components/CocktailCard';
import { ContentContainer } from '../../constants';

const UserCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const isFetching = useAppSelector(selectCocktailsFetching);
  const user = useAppSelector(selectUser);

  let content: React.ReactNode = (
    <Grid2 container sx={{ marginInline: 'auto', marginTop: '10%' }}>
      <Grid2 component={Typography} variant="body1" color="text.secondary">
        You haven't added any cocktails yet!
      </Grid2>
    </Grid2>
  );

  if (isFetching) {
    content = (
      <Grid2 sx={{ marginInline: 'auto', marginTop: '10%' }}>
        <CircularProgress />
      </Grid2>
    );
  } else if (cocktails.length > 0) {
    const visibleCocktails = cocktails.filter((cocktail) => {
      return user && cocktail.user === user._id;
    });

    if (visibleCocktails.length > 0) {
      content = visibleCocktails.map((cocktail) => <CocktailCard key={cocktail._id} cocktail={cocktail} />);
    }
  }

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <ContentContainer container direction="column" spacing={3} sx={{ paddingInline: '25px', pt: 1 }}>
      <Grid2>
        <Typography variant="h4">Your cocktails</Typography>
      </Grid2>
      <Grid2 container>{content}</Grid2>
    </ContentContainer>
  );
};

export default UserCocktails;
