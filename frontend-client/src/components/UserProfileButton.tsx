import { Login, Logout, Person, Person2, PersonAddAlt } from "@mui/icons-material";
import { Dropdown, IconButton, ListItemDecorator, Menu, MenuButton, MenuItem } from "@mui/joy";
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from "react";
import { getUsernameURL } from "../apiService";

const UserProfileButton = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")

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

    if (user || signedIn) {
      const usernameURL = getUsernameURL(user!.uid);
      const response = fetch(usernameURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json())
        .then(data => {
          setUsername(data.username)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [user])

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
        {!(signedIn) &&
          <MenuItem onClick={() => window.location.href = "/register"}>
            <ListItemDecorator>
              <PersonAddAlt />
            </ListItemDecorator>
            Register
          </MenuItem>
        }

        {(signedIn) &&
          <MenuItem disabled>
            <ListItemDecorator>
              <Person2 />
            </ListItemDecorator>
            Signed in as {username}
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
