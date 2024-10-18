import { Box, Grid2, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const API_URL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = '173228905555-gfni4oak02neknvi22lkoniq6arjk1to.apps.googleusercontent.com';

export const StyledToolbarLink = styled(Link)({
  color: 'white',
  fontWeight: 'bold',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit',
  },
});

export const ContentContainer = styled(Grid2)({
  borderRadius: '10px',
  paddingBottom: '32px',
  marginBottom: '30px',
});

export const CardItem = styled(Box)({
  padding: '15px',
  backgroundColor: 'white',
  display: 'inline-block',
  borderRadius: '15px',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    boxShadow: '0px 0px 8px 10px rgba(0, 0, 0, 0.03)',
  },
  cursor: 'pointer',
});

export const CardLinkItem = styled(Link)({
  textDecoration: 'none',
  color: 'black',
});
