import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Layout({ login, handleLogout, searchKeyword, handleValueChange, handleLogin, username }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alignment, setAlignment] = useState('ALL');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // 로그인 동작 후 /login 경로로 이동
  };

  return (
    <div>
      {/* Toolbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#242424' }}> {/* 배경색 변경 */}
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                MOVIE JOA
              </Link>
            </Typography>
            
            <React.Fragment>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  inputProps={{ 'aria-label': 'search' }}
                  name="searchKeyword"
                  value={searchKeyword}
                  onChange={handleValueChange}
                />
              </Search>
              {login ? (
                <Button variant="contained" style={{ backgroundColor: '#242424' }} onClick={handleLogout}> {/* 버튼 배경색 변경 */}
                  Logout
                </Button>
              ) : (
                <Button variant="contained" style={{ 
                  backgroundColor: '#242424', 
                  borderRadius: '4px', // 수정: 테두리의 둥근 정도를 정하는 값
                  border: '2px solid #ffffff' // 흰색 테두리 추가
                }}  onClick={() => handleLoginClick()}> {/* 버튼 배경색 변경 */}
                  Login
                </Button>
              )}
            </React.Fragment>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Render nested routes here */}
      <Outlet />
    </div>
  );
}

export default Layout;
