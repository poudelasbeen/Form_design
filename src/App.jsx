// App.js


import { ThemeProvider, createTheme } from '@mui/material/styles';
import Form from './components/Form';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Form />
    </ThemeProvider>
  );
};

export default App;
