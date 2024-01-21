// Create a Login Page using Joy-UI without adding login functionality yet
import { Button, Card, DialogTitle, FormControl, FormLabel, Input, Link, Stack, Typography } from '@mui/joy'
import {EmailOutlined, Key} from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const LoginPage = () => {
  const [Email, setEmail] = useState<string>("")
  const [Password, setPassword] = useState<string>("")
  const [signedIn, setSignedIn] = useState<boolean>(false)

  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      setSignedIn(true)
    } else {
      setSignedIn(false)
    }
  }
  , [])


  onAuthStateChanged(auth, (user) => {
    if (user && !signedIn) {
      setSignedIn(true)
    } else if (!user && signedIn){
      setSignedIn(false)
    }
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Login Successful" + user?.email)
        window.location.href = "/"
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  return (
    <div style={{marginTop:'100px', display:"flex", justifyContent:"center", alignItems:"center"}}>
      {!(signedIn) &&
      <Card sx={{width:"450px", margin:"auto", maxWidth:"90%", alignSelf:'center', justifyContent:'center'}}>
        <DialogTitle sx={{justifyContent:'center'}}>
          <Typography level='h4'>Login</Typography>
        </DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmit(event);
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type='email' startDecorator={<EmailOutlined/>} placeholder='Enter Email' required 
                value={Email} onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type='password' startDecorator={<Key/>} placeholder='Enter Password' required
                value={Password} onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type='submit' variant="solid" color="primary">Login</Button>
          </Stack>
        </form>
        {/* <Link color="primary" sx={{justifyContent:'center'}}>Forgot Password?</Link> */}
        <Link href="/register" color="primary" sx={{justifyContent:'center'}}>Don't have an account? Sign up</Link>
    </Card>
    }
    {signedIn && 
      <Typography level='title-lg'>You are already logged in</Typography>
    }
    </div>
  );
}

export default LoginPage;
