// Create a Login Page using Joy-UI without adding login functionality yet
import { Button, Card, DialogTitle, FormControl, FormHelperText, FormLabel, Input, Link, Stack, Typography } from '@mui/joy'
import { PersonOutline, EmailOutlined, Key } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const RegisterPage = () => {
  const [Username, setUsername] = useState<string>("")
  const [Email, setEmail] = useState<string>("")
  const [Password, setPassword] = useState<string>("")
  const [signedIn, setSignedIn] = useState<boolean>(false)
  
  const user = auth.currentUser;

  useEffect(() => {
    if (user && !signedIn) {
      setSignedIn(true)
    } else if (!user && signedIn){
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
        alert("Sign up Successful" + user?.email)
        window.location.href = "/"
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  return (
    <div style={{marginTop:'80px', display:"flex", justifyContent:"center", alignItems:"center"}}>
      {!(signedIn) &&
      <Card sx={{width:"450px", margin:"auto", maxWidth:"90%", alignSelf:'center', justifyContent:'center'}}>
        <DialogTitle sx={{justifyContent:'center'}}>
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
            <Button type='submit' variant="solid" color="primary">Register</Button>
          </Stack>
        </form>
        {/* <Link color="primary" sx={{justifyContent:'center'}}>Forgot Password?</Link> */}
        <Link href="/login" color="primary" sx={{justifyContent:'center'}}>Already have an account? Log in</Link>
    </Card>
    }
    {signedIn && 
      <Typography level='title-lg'>You are already logged in</Typography>
    }
    </div>
  );
}

export default RegisterPage;
