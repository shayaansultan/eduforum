import { Login, Logout, Person, Person2 } from "@mui/icons-material";
import { Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem } from "@mui/joy";
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";

const UserProfileButton = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false)

  const user = auth.currentUser;
  useEffect(() => {
    if (user && !signedIn) {
      // User is signed in
      setSignedIn(true)
    }
    else if (!user && signedIn) {
      // User is signed out
      setSignedIn(false)
    }
  }
    , [user])

  onAuthStateChanged(auth, (user) => {
    if (user && !signedIn) {
      // User is signed in
      setSignedIn(true)
    } else if (!user && signedIn) {
      // User is signed out
      setSignedIn(false)
    }
  });

  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }}>
        <Person />
      </MenuButton>
      <Menu>
        {!(signedIn) && 
          <MenuItem onClick={() => window.location.href = "/login"}>
          <ListItemDecorator>
            <Login />
          </ListItemDecorator>
            Login
          </MenuItem>
        }
        {(signedIn) &&
          <MenuItem onClick={() => window.location.href = "/profile"}>
            <ListItemDecorator>
              <Person2 />
            </ListItemDecorator>
            Profile
          </MenuItem>
        }
        {signedIn && 
          <MenuItem onClick={() => signOut(auth).then(() => {
            // Sign-out successful.
            alert("Logout Successful")
          }).catch((error) => {
            // An error happened.
            alert(error)
          })}>
            <ListItemDecorator>
              <Logout />
            </ListItemDecorator>
            Logout
          </MenuItem>
        }
      </Menu>
    </Dropdown>
  );

}

export default UserProfileButton;
