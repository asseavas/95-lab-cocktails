import React from 'react';
import { Cocktail } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { API_URL, CardItem, CardLinkItem } from '../../../constants';
import { CardMedia, Grid2, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface Props {
  cocktail: Cocktail;
  isDeleting?: boolean;
  onDelete?: VoidFunction;
  isPublication?: boolean;
  onPublish?: VoidFunction;
}

const CocktailCard: React.FC<Props> = ({ cocktail, isDeleting, onDelete, isPublication, onPublish }) => {
  const user = useAppSelector(selectUser);
  let cardImage = '';

  if (cocktail.image) {
    cardImage = `${API_URL}/${cocktail.image}`;
  }

  return (
    <CardItem
      sx={{
        height: user?.role === 'admin' ? '330px' : !cocktail.isPublished ? '315px' : '300px',
      }}
    >
      <CardLinkItem to={`/cocktails/${cocktail._id}`}>
        <Grid2 container direction="column" spacing={1}>
          <Grid2
            component={CardMedia}
            image={cardImage}
            sx={{
              width: 200,
              height: 200,
              borderRadius: '10px',
            }}
          />
        </Grid2>
        <Grid2>
          <Typography variant="h6" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
            {cocktail.name}
          </Typography>
          {!cocktail.isPublished && user?.role !== 'admin' && (
            <Typography
              variant="body2"
              sx={{
                padding: '6px 10px',
                marginTop: '15x',
                backgroundColor: '#d8d8d8',
                borderRadius: '6px',
                textAlign: 'center',
              }}
            >
              Unpublished
            </Typography>
          )}
        </Grid2>
      </CardLinkItem>
      {user?.role === 'admin' && (
        <Grid2 mt={2} container spacing={1}>
          {!cocktail.isPublished && (
            <Grid2>
              <LoadingButton
                loading={isPublication}
                color="info"
                variant="contained"
                onClick={onPublish}
                sx={{ width: '100%', height: '30px' }}
              >
                Publish
              </LoadingButton>
            </Grid2>
          )}
          <Grid2 ml="auto">
            <LoadingButton
              loading={isDeleting}
              color="error"
              variant="contained"
              onClick={onDelete}
              sx={{ width: '100%', height: '30px' }}
            >
              Delete
            </LoadingButton>
          </Grid2>
        </Grid2>
      )}
    </CardItem>
  );
};

export default CocktailCard;
