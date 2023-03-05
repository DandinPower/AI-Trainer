import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default function HomePage() {
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const nickName = localStorage.getItem('nickName')
        if (!nickName){
            window.location.href = "/SignIn"
        }
        setNickName(nickName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {nickName && (
        <div>
          <Typography component="h1" variant="h5">
            Welcome {nickName}!
          </Typography>
        </div>
      )}
    </Container>
  );
}