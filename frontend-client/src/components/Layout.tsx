import { Box, Typography, IconButton, ButtonGroup, Divider, Button, Dropdown, MenuButton, Menu, MenuItem} from '@mui/joy';
import { Brightness7 } from '@mui/icons-material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Person } from '@mui/icons-material';
import { useColorScheme } from '@mui/joy/styles';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { MdForum } from "react-icons/md";
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';



const Layout = () => {
  const { mode, setMode } = useColorScheme();
  const [signedIn, setSignedIn] = useState<boolean>(false)

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      // User is signed in
      setSignedIn(true)
    } else {
      // User is signed out
      setSignedIn(false)
    }
  }
  , [user])


  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      setSignedIn(true)
    } else {
      // User is signed out
      setSignedIn(false)
    }
  });

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
            {useColorScheme().mode === 'dark' ? <Brightness7 /> : <DarkModeIcon />}
          </IconButton>
          <Divider orientation="vertical"  />
          <NavLink to="/login" style={{ textDecoration: 'none' }}>
            <IconButton>
              <Person />
            </IconButton>
          </NavLink>
          <Divider orientation="vertical"  />
          {signedIn && (
            <Button onClick={() => {
              signOut(auth).then(() => {
                // Sign-out successful.
                alert("Sign-out successful.")
              }).catch((error) => {
                // An error happened.
                alert(`An error happened: ${error.code}`)
              });
              }} variant="solid" color="primary">
              Logout
            </Button>
          )}
        </ButtonGroup>
      </Box>
      <Divider />
      <Outlet />
    </>
 );
};

export default Layout;