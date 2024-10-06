import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Toolbar from "./Layout/Toolbar";
import Navigation from "./Layout/Navigation";
import List from "./Page/List";
import "./App.css";
import Login from "./Page/Login";
import Register from "./Page/Register";

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  

  // 앱 시작 시 localStorage에서 로그인 상태 확인
  useEffect(() => {
    const storedLogin = localStorage.getItem('login');
    const storedUsername = localStorage.getItem('username');
    
    if (storedLogin === 'true' && storedUsername) {
      setLogin(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    try{
      localStorage.removeItem('login');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      setLogin(false);
      setUsername('');
      setSearchKeyword('');
    }catch (error) {
      console.error('Error during logout:', error);
    }
    window.location.replace('')
  };

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Fetched movie status data:", data); // Log the data to the console

      if (response.ok) {
        localStorage.setItem('login', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('userId', data.userId); // 유저 ID 저장

        setLogin(true);
        setUsername(username);
      } else {
        console.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    window.location.replace('/')
  };

  return (
      <HashRouter>
        <Toolbar
          login={login}
          handleLogout={handleLogout}
          searchKeyword={searchKeyword}
          handleValueChange={handleValueChange}
          username={username}
        />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home searchKeyword={searchKeyword}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/movie/:id" element={<Detail/>} />
          <Route path="/MyList" element={<List type="my" searchKeyword={searchKeyword}/>} />
          <Route path="/WatchList" element={<List type="watch" searchKeyword={searchKeyword} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} /> {/* handleLogin 전달 */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
