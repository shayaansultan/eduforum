import { Box, Typography, IconButton, Button, ButtonGroup, Divider} from '@mui/joy';
import { Brightness7 } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useColorScheme } from '@mui/joy/styles';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { mode, setMode } = useColorScheme();  

  return (
    <>
      <Box display="flex" justifyContent={'space-around'} alignItems={'center'} p={3}>
        <Typography level="h1">Eduforum</Typography>
        <ButtonGroup variant='plain' spacing={2} size='lg'>
          <IconButton
            color="neutral"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            size='lg'
          >
            {useColorScheme().mode === 'dark' ? <Brightness7 /> : <DarkModeIcon />}
          </IconButton>
          <Divider orientation="vertical"  />
          <Button href="/login">Login</Button>
        </ButtonGroup>
      </Box>

       <Outlet />
    </>
 );
};

export default Layout;