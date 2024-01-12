import { Box, Typography, IconButton, ButtonGroup, Divider} from '@mui/joy';
import { Brightness7 } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Person } from '@mui/icons-material';
import { useColorScheme } from '@mui/joy/styles';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Layout = () => {
  const { mode, setMode } = useColorScheme();  

  return (
    <>
      <Box display="flex" justifyContent={'space-around'} alignItems={'center'} p={3}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Typography level="h1">Eduforum</Typography>
        </NavLink>
        <ButtonGroup variant='plain' spacing={2} size='lg'>
          <IconButton
            color="neutral"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            size='lg'
          >
            {useColorScheme().mode === 'dark' ? <Brightness7 /> : <DarkModeIcon />}
          </IconButton>
          <Divider orientation="vertical"  />
          <NavLink to="/user" style={{ textDecoration: 'none' }}>
            <IconButton>
              <Person />
            </IconButton>
          </NavLink>
        </ButtonGroup>
      </Box>

       <Outlet />
    </>
 );
};

export default Layout;