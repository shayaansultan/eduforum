import { Box, Typography, IconButton, ButtonGroup, Divider} from '@mui/joy';
import { Brightness7, DarkMode } from '@mui/icons-material';
import { useColorScheme } from '@mui/joy/styles';
import { Outlet, NavLink } from 'react-router-dom';
import { MdForum } from "react-icons/md";
import UserProfileButton from './UserProfileButton';



const Layout = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Box display="flex" justifyContent={'space-around'} alignItems={'center'} p={1.5}>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Box display="flex" alignItems={'center'} p={1}>
          {window.outerWidth > 768 && (
            <MdForum size={34} color={useColorScheme().mode === 'dark' ? 'white' : 'black'} />
          )}
          <Typography level="h1">{window.outerWidth > 768 && <>&nbsp; </>}Eduforum</Typography>
          </Box>
        </NavLink>
        <ButtonGroup variant='plain' spacing={2} size='lg'>
          <IconButton
            color="neutral"
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            size='lg'
          >
            {useColorScheme().mode === 'dark' ? <Brightness7 /> : <DarkMode />}
          </IconButton>
          <Divider orientation="vertical"  />
          <UserProfileButton />
        </ButtonGroup>
      </Box>
      <Divider />
      <Outlet />
    </>
 );
};

export default Layout;