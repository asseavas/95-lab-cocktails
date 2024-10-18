import AppToolbar from './UI/AppToolbar/AppToolbar';
import { Container, Typography } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';
import { selectUser } from './features/users/usersSlice';
import { useAppSelector } from './app/hooks';
import Error404 from './UI/errors/Error404';
import AllCocktails from './features/cocktails/AllCocktails';
import NewCocktail from './features/cocktails/NewCocktail';
import UserCocktails from './features/cocktails/UserCocktails';

const App = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const hideToolbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideToolbar && (
        <header>
          <AppToolbar />
        </header>
      )}
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<AllCocktails />} />
          <Route
            path="/cocktails/new"
            element={
              <ProtectedRoute isAllowed={user !== null}>
                <NewCocktail />
              </ProtectedRoute>
            }
          />
          <Route path="/cocktails/:id" element={<Typography>One cocktail</Typography>} />
          <Route path="/cocktails/user" element={<UserCocktails />} />
          <Route
            path="/cocktails/user"
            element={
              <ProtectedRoute isAllowed={user !== null}>
                <Typography>User cocktails</Typography>
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
