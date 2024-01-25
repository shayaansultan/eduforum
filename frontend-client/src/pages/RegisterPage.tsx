// Create a Login Page using Joy-UI without adding login functionality yet
import { Button, Card, DialogTitle, FormControl, FormHelperText, FormLabel, Input, Link, Stack, Typography } from '@mui/joy'
import { PersonOutline, EmailOutlined, Key } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { checkUsernameExistsURL, createUserURL } from '../apiService';

const RegisterPage = () => {
  const [Username, setUsername] = useState<string>("")
  const [Email, setEmail] = useState<string>("")
  const [Password, setPassword] = useState<string>("")
  const [signedIn, setSignedIn] = useState<boolean>(false)

  let user = auth.currentUser;

  useEffect(() => {
    if (user && !signedIn) {
      setSignedIn(true)
    } else if (!user && signedIn) {
      setSignedIn(false)
    }
  }
    , [])


  onAuthStateChanged(auth, (user) => {
    if (user && !signedIn) {
      setSignedIn(true)
    } else if (!user && signedIn) {
      setSignedIn(false)
    }
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Username.length > 20) {
      alert("Username must be less than 20 characters")
      return
    }

    if (Password.length < 6) {
      alert("Password must be at least 6 characters")
      return
    }

    if (Password.length > 20) {
      alert("Password must be less than 20 characters")
      return
    }

    const checkURL = checkUsernameExistsURL(Username)

    // Make a GET request to checkURL. if the value in "exists" is true, then the username already exists, so alert the user and return
    fetch(checkURL)
      .then(response => response.json())
      .then(data => {
        if (data.exists) {
          console.log("Username exists")
          alert("Username already exists")
          return
        } else {
          console.log("Username doesn't exist")
        }
      })

    // If the username doesn't exist, then create the user first in firebase auth, and get the user_id
    // Then make a POST request to createUserURL, with the user_id, username, and email

    createUserWithEmailAndPassword(auth, Email, Password)
      .then((_) => {
        // Signed up 
        // const user = userCredential.user;
        // console.log("user inside: " + user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + errorMessage)
        return
        // ..
      });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user inside: " + user)
        let user_id: string | undefined = user.uid

        console.log("user_id inside: " + user_id)
        const createURL = createUserURL()

        // if (user_id === null) {
        //   user_id = auth.currentUser?.uid
        // }

        const body = {
          user_id: user_id,
          username: Username,
          email: Email
        }

        console.log("body: ")
        console.log(body)
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        };
        fetch(createURL, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            alert("User created successfully")
            window.location.href = "/"
          })
          .catch((error) => {
            console.log(error)
            alert("Error creating user")
            return
          });
      } else {
        // User is signed out
        console.log("user: " + user)
      }
    });

  }

  return (
    <div style={{ marginTop: '80px', display: "flex", justifyContent: "center", alignItems: "center" }}>
      {!(signedIn) &&
        <Card sx={{ width: "450px", margin: "auto", maxWidth: "90%", alignSelf: 'center', justifyContent: 'center' }}>
          <DialogTitle sx={{ justifyContent: 'center' }}>
            <Typography level='h4'>Register</Typography>
          </DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              handleSubmit(event);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type='text' startDecorator={<PersonOutline />} placeholder='Enter Username' required
                  value={Username} onChange={(e) => setUsername(e.target.value)}
                />
                <FormHelperText>Username must be unique and will be public</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' startDecorator={<EmailOutlined />} placeholder='Enter Email' required
                  value={Email} onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' startDecorator={<Key />} placeholder='Enter Password' required
                  value={Password} onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button type='submit' variant="solid" color="primary">Register</Button>
            </Stack>
          </form>
          <Link href="/login" color="primary" sx={{ justifyContent: 'center' }}>Already have an account? Log in</Link>
        </Card>
      }
      {signedIn &&
        <Typography level='title-lg'>You are already logged in</Typography>
      }
    </div>
  );
}

export default RegisterPage;
