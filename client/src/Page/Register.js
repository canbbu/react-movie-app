import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, Typography, Box, Input, Select, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [nickName, setNickName] = useState('');
    const [region, setRegion] = useState('');


    const paperStyle = {
        padding: 20,
        height: '85vh',
        width: 560,
        margin: "19px auto",
        backgroundColor: '#242424',
        borderRadius: '12px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
    };

    const avatarStyle = { backgroundColor: '#242424', border: '2px solid #ffffff' };
    const inputBoxStyle = {
        border: '2px solid #ffffff',
        borderRadius: '8px',
        padding: '10px',
        width: '100%',
        margin: '5px 0',
    };
    const menuItemStyle = {
        color: '#FFFFFF',
        backgroundColor: '#242424',
        border: '2px solid #ffffff',
        borderRadius: '8px',
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const validateFields = () => {
        // 0. Check username length
        if (username.length > 8) {
            alert("Username max length is 8");
            return false;
        }
        // 2. Check password match
        if(password.length > 12){
            alert("Password is too long");
            return false;
        }
        if (password !== passwordConfirm) {
            alert("Password is not matched");
            return false;
        }
        // 3. Check nickname length
        if (nickName.length > 8) {
            alert("Nickname max length is 8");
            return false;
        }
        // 4. Check region selection
        if (!region) {
            alert("Choose the region");
            return false;
        }
        return true; // 모든 검증을 통과한 경우
    };

    const registerFetch = async () => {
        try {
            const registerData = { username, password, nickName, region };

            const response = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });
            
            const data = await response.json(); // Parses the response as JSON
            
            console.log("data : ", data); // Logs the data in the console            

            if (data.message === "ID already exists.") {
                alert("Username is already exist");
            } else if (response.ok) {
                alert("Registration successful!");
                navigate('/login'); // 로그인 페이지로 이동
            } else {
                alert("Registration failed");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred during registration");
        }
    };

    const onSubmitRegister = async (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        // 필드 검증
        if (!validateFields()) {
            return; // 검증에 실패하면 함수 종료
        }

        // 모든 검증을 통과한 경우 서버에 요청
        await registerFetch();
    };

    return (
        <Paper elevation={12} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}>
                    <LockOutlinedIcon style={{ color: '#FFFFFF' }} />
                </Avatar>
                <h2 style={{ color: '#FFFFFF' }}>Register</h2>
            </Grid>
            <form onSubmit={onSubmitRegister}> {/* <form> 요소 추가 */}
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
                                value={username}
                                onChange={handleInputChange(setUsername)}
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
                                value={password}
                                onChange={handleInputChange(setPassword)}
                                inputProps={{ style: { color: '#FFFFFF' } }}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box style={inputBoxStyle}>
                            <Input
                                id="passwordConfirm"
                                placeholder='Confirm Your Password'
                                type='password'
                                required
                                disableUnderline
                                fullWidth
                                value={passwordConfirm}
                                onChange={handleInputChange(setPasswordConfirm)}
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
                                value={nickName}
                                onChange={handleInputChange(setNickName)}
                                inputProps={{ style: { color: '#FFFFFF' } }}
                            />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box style={inputBoxStyle}>
                            <Select
                                id="region"
                                required
                                fullWidth
                                value={region}
                                onChange={handleInputChange(setRegion)}
                                displayEmpty
                                renderValue={(value) =>
                                    value === "" ? "Select Your Country" : value
                                }
                                style={{ color: "#ffffff" }}
                            >
                                <MenuItem style={menuItemStyle} value="" disabled>Select Your Country</MenuItem>
                                <MenuItem style={menuItemStyle} value="Korea">Korea</MenuItem>
                                <MenuItem style={menuItemStyle} value="Japan">Japan</MenuItem>
                                <MenuItem style={menuItemStyle} value="America">America</MenuItem>
                            </Select>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Button style={inputBoxStyle} type='submit' variant="contained" fullWidth>
                            Register
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography style={{ color: '#FFFFFF' }}>
                            Already Have an Account?
                            <Link
                                href="/#/login"
                                style={{ textAlign: 'center', display: 'block' }}
                            >
                                Sign In Here
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}

export default Register;
