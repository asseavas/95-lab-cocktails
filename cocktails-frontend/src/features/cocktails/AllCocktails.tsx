import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import {
  selectCocktailDeleting,
  selectCocktailPublication,
  selectCocktails,
  selectCocktailsFetching,
} from './cocktailsSlice';
import { deleteCocktail, fetchCocktails, publishCocktail } from './cocktailsThunks';
import { toast } from 'react-toastify';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import { ContentContainer } from '../../constants';
import CocktailCard from './components/CocktailCard';

const AllCocktails = () => {
  const dispatch = useAppDispatch();
  const cocktails = useAppSelector(selectCocktails);
  const isFetching = useAppSelector(selectCocktailsFetching);
  const isDeleting = useAppSelector(selectCocktailDeleting);
  const isPublication = useAppSelector(selectCocktailPublication);
  const user = useAppSelector(selectUser);

  const handleDeleteCocktail = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this cocktail?')) {
        await dispatch(deleteCocktail(id)).unwrap();
        await dispatch(fetchCocktails());
        toast.success('Cocktail has been deleted!');
      }
    } catch (error) {
      toast.error('Cocktail has not been deleted!');
    }
  };

  const handlePublishCocktail = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to publish this cocktail?')) {
        await dispatch(publishCocktail(id)).unwrap();
        await dispatch(fetchCocktails());
        toast.success('Cocktail has been published!');
      }
    } catch (error) {
      toast.error('Cocktail has not been published!');
    }
  };

  let content: React.ReactNode = (
    <Grid2 container>
      <Grid2
        component={Typography}
        variant="body1"
        color="text.secondary"
        sx={{ marginInline: 'auto', marginTop: '10%' }}
      >
        There are no cocktails here!
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
      return cocktail.isPublished || (user && user.role === 'admin');
    });

    if (visibleCocktails.length > 0) {
      content = visibleCocktails.map((cocktail) => (
        <CocktailCard
          key={cocktail._id}
          cocktail={cocktail}
          isDeleting={isDeleting}
          onDelete={() => handleDeleteCocktail(cocktail._id)}
          isPublication={isPublication}
          onPublish={() => handlePublishCocktail(cocktail._id)}
        />
      ));
    }
  }

  useEffect(() => {
    dispatch(fetchCocktails());
  }, [dispatch]);

  return (
    <ContentContainer container direction="column" spacing={3} sx={{ paddingInline: '25px', pt: 1 }}>
      <Grid2>
        <Typography variant="h4">All cocktails</Typography>
      </Grid2>
      <Grid2 container>{content}</Grid2>
    </ContentContainer>
  );
};

export default AllCocktails;
