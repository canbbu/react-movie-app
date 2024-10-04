import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

function Layout({ searchKeyword, handleValueChange, login, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [alignment, setAlignment] = useState('ALL');
  const [showHeader, setShowHeader] = useState(true); // 헤더 보이기 상태
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 Y 위치
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); // 로그인 동작 후 /login 경로로 이동
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // 아래로 스크롤 시
        setShowHeader(false);
      } else {
        // 위로 스크롤 시
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY); // 현재 스크롤 Y 위치 업데이트
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 추가
    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, [lastScrollY]);

  return (
    <div>
      {/* Toolbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: '#242424', 
            transition: 'transform 0.3s ease-in-out',
            transform: showHeader ? 'translateY(0)' : 'translateY(-100%)', // 스크롤에 따른 헤더 이동
          }} 
        >
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
                <Button variant="contained" style={{ backgroundColor: '#242424' }} onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button variant="contained" style={{ 
                  backgroundColor: '#242424', 
                  borderRadius: '4px', 
                  border: '2px solid #ffffff' 
                }} onClick={handleLoginClick}> 
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
