import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, Typography, Box, Input } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';

const Login = ({ handleLogin }) => {  // handleLogin prop 추가
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const paperStyle = {
    padding: 20,
    height: '70vh',
    width: 560,
    margin: "19px auto",
    backgroundColor: '#242424',
    borderRadius: '12px',
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 25)',
  };

  const avatarStyle = { backgroundColor: '#242424', border: '2px solid #ffffff' };
  const inputBoxStyle = {
    border: '1px solid #682699',
    borderRadius: '8px',
    padding: '10px',
    width: '100%',
    margin: '10px 0',
    backgroundColor: '#242424',
    border: '2px solid #ffffff',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password); // 부모 컴포넌트의 handleLogin 호출
  };

  return (
    <Paper elevation={12} style={paperStyle}>
      <Grid align='center'>
        <Avatar style={avatarStyle}>
          <LockOutlinedIcon style={{ color: '#FFFFFF' }} />
        </Avatar>
        <h2 style={{ color: '#FFFFFF' }}>Login</h2>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Box style={inputBoxStyle}>
              <Input
                id="username"
                placeholder='Enter Your Username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}  // username 업데이트
                required
                disableUnderline
                fullWidth
                inputProps={{ style: { color: '#FFFFFF' } }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Box style={inputBoxStyle}>
              <Input
                id="password"
                placeholder='Enter Your Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}  // password 업데이트
                required
                disableUnderline
                fullWidth
                inputProps={{ style: { color: '#FFFFFF' } }}
              />
            </Box>
          </Grid>
          <Grid item>
            <Button 
              style={inputBoxStyle} 
              type='submit'
              variant="contained" 
              fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography style={{ color: '#FFFFFF' }}>
              Don't have an account?
              <Link href="/#/register" style={{ textAlign: 'center', display: 'block' }}>
                Sign Up Here.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Login;
