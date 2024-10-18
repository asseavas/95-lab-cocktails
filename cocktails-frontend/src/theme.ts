import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#d4d9dd',
    },
    text: {
      primary: '#000',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            '& fieldset': {
              border: '1px solid rgba(0, 0, 0, 0.5)',
            },
            '&:hover fieldset': {
              border: '1px solid rgba(0, 0, 0, 0.7)',
            },
            '&.Mui-focused fieldset': {
              border: '1px solid #1976d2',
            },
            padding: '8px',
            '& input': {
              padding: '8px',
              fontSize: '15px',
            },
          },
        },
      },
    },
  },
});

export default theme;
