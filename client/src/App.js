import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Home from "./routes/Home";
import About from "./routes/About";
import Detail from "./routes/Detail";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import List from "./Page/List"
import "./App.css";
import Login from "./Page/Login"
import Register from "./Page/Register"

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('username');
    setLogin(false);
    setUsername('');
    setSearchKeyword('');
  };

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleLogin = async (username, password) => {
    try {
      console.log("App.js: username:", username, "password:", password);
      const response = await fetch('/api/items/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // login success
        localStorage.setItem('login', 'true');
        localStorage.setItem('username', username); // user name store
        setLogin(true);
        setUsername(username);
        setErrorMessage('');

        // data fetch after login
        const itemsResponse = await fetch('/api/items', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (itemsResponse.ok) {
          const itemsData = await itemsResponse.json();
          //setItems(itemsData);
        } else {
          console.error('Failed to fetch items data');
        }
      } else {
        // login fail
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred');
    }
  };

  return (
    <HashRouter>
      <Layout
        login={login}
        handleLogout={handleLogout}
        searchKeyword={searchKeyword}
        handleValueChange={handleValueChange}
        handleLogin={handleLogin}
        username={username}
      />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/MyList" element={<List type="my" />} /> {/* Pass 'my' prop */}
        <Route path="/WatchList" element={<List type="watch" />} /> {/* Pass 'watch' prop */}
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Register" element={<Register />} /> 
      </Routes>
    </HashRouter>
  );
}

export default App;
