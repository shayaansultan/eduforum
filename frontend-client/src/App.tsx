import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './Routes'
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import './App.css';

import routes from './Routes';

const router = createBrowserRouter(createRoutesFromElements(routes));

function App() {
  return (
    <CssVarsProvider defaultMode='dark'>
      <CssBaseline />
      <RouterProvider router={router} /> 
    </CssVarsProvider>
  );
}

export default App;