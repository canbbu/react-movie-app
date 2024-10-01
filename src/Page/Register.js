import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, Typography, Box, Input, Select, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Outlet, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    
    const paperStyle = {
        padding: 20,
        height: '85vh',
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
        margin: '5px 0',
        backgroundColor: '#242424', 
        border: '2px solid #ffffff', 
    };
    const menuItemStyle = {
        color: '#FFFFFF', // Text color for the dropdown
        backgroundColor: '#242424', // Background color for the dropdown
        border: '2px solid #ffffff', // Border color
        borderRadius: '8px', // Rounded corners
    };
    

      return (
        <Paper elevation={12} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}>
                    <LockOutlinedIcon style={{ color: '#FFFFFF' }} />
                </Avatar>
                <h2 style={{ color: '#FFFFFF' }}>Register</h2> {/* 텍스트 색상을 흰색으로 변경 */}
            </Grid>
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <Box style={inputBoxStyle}>
                        <Input
                            id="username"
                            placeholder='Enter Your Username'
                            type='text'
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
                            id="confirm-password"
                            placeholder='Confirm Your Password'
                            type='password'
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
                            id="nickname"
                            placeholder='Enter Your Nickname'
                            type='text'
                            required
                            disableUnderline
                            fullWidth
                            inputProps={{ style: { color: '#FFFFFF' } }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Box style={inputBoxStyle}>
                    {/* <Box style={{...inputBoxStyle, margin: '0 20px 0 -20px',width:'200%'}}> Use the same inputBoxStyle for consistency */}
                        <Select
                            id="country"
                            required
                            fullWidth
                            displayEmpty
                            defaultValue=""
                            style={{color: "#ffffff"}}
                            renderValue={(value) =>
                                value === "" ? "Enter Your Country" : value // Display placeholder
                            }
                        >
                            <MenuItem style={menuItemStyle} value="" disabled >Select Your Country</MenuItem>
                            <MenuItem style={menuItemStyle} value="Korea">Korea</MenuItem>
                            <MenuItem style={menuItemStyle} value="Japan">Japan</MenuItem>
                        </Select>
                    </Box>
                </Grid>
                <Grid item>
                <Button style={inputBoxStyle} type='submit' 
                    variant="contained" fullWidth>
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    <Typography style={{ color: '#FFFFFF' }}>
                        Already Have an Account?
                        <Link
                            href="/#/login"
                            style={{ textAlign: 'center', display: 'block'}}
                        >
                            Sign In Here
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Register;
