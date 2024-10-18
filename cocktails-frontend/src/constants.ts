import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const API_URL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = '173228905555-gfni4oak02neknvi22lkoniq6arjk1to.apps.googleusercontent.com';

export const StyledToolbarLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&hover': {
    color: 'inherit',
  },
});
