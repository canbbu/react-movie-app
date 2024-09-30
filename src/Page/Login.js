import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, Typography, Box, Input } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = () => {
    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 560,
        margin: "19px auto",
        backgroundColor: '#242424', // 다크 그레이로 변경
        borderRadius: '12px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 25)',
    };

    const avatarStyle = { backgroundColor: '#242424', border: '2px solid #ffffff', };
    // const btnstyle = { backgroundColor: '#682699', margin: '30px 0' };
    const inputBoxStyle = {
        border: '1px solid #682699',
        borderRadius: '8px',
        padding: '10px',
        width: '100%', // fullWidth를 대체
        margin: '10px 0',
        backgroundColor: '#242424', 
        border: '2px solid #ffffff', 
    };

    return (
        <Paper elevation={12} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon style={{ color: '#FFFFFF' }} /></Avatar>
                <h2 style={{ color: '#FFFFFF' }}>Login</h2> {/* 텍스트 색상을 흰색으로 변경 */}
            </Grid>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Box style={inputBoxStyle}>
                        <Input
                            id="username"
                            placeholder='Enter Your Username'
                            required
                            disableUnderline // underline 제거
                            fullWidth
                            style={{ color: '#FFFFFF' }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Box style={inputBoxStyle}>
                        <Input
                            id="password"
                            placeholder='Enter Your Password'
                            type='password'
                            required
                            disableUnderline // underline 제거
                            fullWidth
                            style={{ color: '#FFFFFF' }}
                        />
                    </Box>
                </Grid>
                <Grid item >
                    <Button style={inputBoxStyle} type='submit' 
                    variant="contained" fullWidth>
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    <Typography >
                        <Link href="#" style={{ textAlign: 'center', display: 'block' }}>
                            Forgot Password?
                        </Link>
                    </Typography>
                </Grid>
                <Grid item>
                <Typography style={{ color: '#FFFFFF' }}>
                    Don't have an account?
                    <Link href="#" style={{ textAlign: 'center', display: 'block' }}>
                        Sign Up Here.
                    </Link>
                </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Login;
