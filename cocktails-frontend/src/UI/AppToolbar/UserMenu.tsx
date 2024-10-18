import React, { useState } from 'react';
import { User } from '../../types';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { API_URL } from '../../constants';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/users/usersThunks';
import avatarNotFound from '../../assets/images/no-avatar.jpg';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let avatar = avatarNotFound;

  if (user.avatar) {
    if (user.avatar.startsWith('https://lh3.googleusercontent')) {
      avatar = user.avatar;
    } else {
      avatar = `${API_URL}/${user.avatar}`;
    }
  }

  if (user)
    return (
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Button
            component={Link}
            to="/cocktails/user"
            sx={{
              color: 'white',
            }}
          >
            Your cocktails
          </Button>
          <Typography>{user.displayName}</Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar alt={user.username} src={avatar} sx={{ width: 45, height: 45 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          keepMounted
          sx={{ mt: '55px' }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem component={Link} to="/cocktails/new">
            New cocktail
          </MenuItem>
          <MenuItem component={Button} onClick={handleLogout} sx={{ width: '100%', textTransform: 'none' }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    );
};

export default UserMenu;
