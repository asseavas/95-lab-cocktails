import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import { StyledToolbarLink } from '../../constants';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box sx={{ flexGrow: 1, mt: 2, mb: 2 }}>
      <AppBar position="sticky" sx={{ background: 'none' }}>
        <Toolbar sx={{ margin: '0 24px' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <StyledToolbarLink to="/">Cocktails</StyledToolbarLink>
          </Typography>
          <Box>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
