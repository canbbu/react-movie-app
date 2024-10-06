"use strict"

const mysql = require('mysql2/promise'); // Use promise-based mysql2
const fs = require('fs');
const express = require('express');

// Load database configuration from JSON
const data = fs.readFileSync('./databases.json');
const conf = JSON.parse(data);

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  database: conf.database,
  port: conf.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Output object for API handlers
const output = {
  listDataGet: async (req, res) => {
    console.log("listDataGet in ");
    const { userId, movieId } = req.params;

    // SQL query to select data from the Favorites table
    const sql = 'SELECT * FROM Favorites WHERE user_id = ? AND movie_id = ?';

    try {
      const [rows] = await pool.query(sql, [userId, movieId]); // Use pool.query
      if (rows.length > 0) {
        res.json(rows[0]); // Return the first result
      } else {
        res.json({ isWished: false, isWatched: false }); // Default values if no entry exists
      }
    } catch (err) {
      console.error("Error executing query:", err); // Log the specific error
      return res.status(500).send({ error: 'Database error' });
    }
  },

  wishedData: async (req, res) => {
    console.log("wishedData in ");
    const { userId, type } = req.params;

    let sql;
    if (type === "my") {
      sql = 'SELECT * FROM Favorites WHERE user_id = ? AND isWished = true';
    } else if (type === "watch") {
      sql = 'SELECT * FROM Favorites WHERE user_id = ? AND isWatched = true';
    } else {
      return res.status(400).json({ error: "Invalid type parameter" });
    }

    try {
      const [rows] = await pool.query(sql, [userId]);
      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.json({
          message: "No data found",
          data: null
        });
      }
    } catch (err) {
      console.error("Error executing query:", err);
      return res.status(500).send({ error: 'Database error' });
    }
  }
};

const process = {
  listdataUpdate: async (req, res) => {
    console.log("dataUpdate in ");
    const { userId, movieId, isWished, isWatched } = req.body;

    // SQL for updating or inserting into the Favorites table
    const sql = `
      INSERT INTO Favorites (user_id, movie_id, added_date, isWished, isWatched)
      VALUES (?, ?, NOW(), ?, ?)
      ON DUPLICATE KEY UPDATE isWished = ?, isWatched = ?`;

    const params = [userId, movieId, isWished, isWatched, isWished, isWatched];

    try {
      const [result] = await pool.query(sql, params);
      res.send({ success: true, message: "Record added or updated successfully." });
    } catch (err) {
      console.error("Error during data insertion or update:", err);
      return res.status(500).send("Error inserting/updating data");
    }
  },

  login: async (req, res) => {
    console.log("login in ");
    const { username, password } = req.body;

    const sql = 'SELECT user_id, nickName FROM User WHERE username = ? AND password = ?';

    try {
      const [rows] = await pool.query(sql, [username, password]);
      if (rows.length > 0) {
        const userId = rows[0].user_id;
        const nickName = rows[0].nickName;
        console.log("nickName : " + nickName);
        return res.send({
          success: true,
          message: 'Login successful',
          userId: userId,
          nickName: nickName
        });
      } else {
        return res.status(401).send({
          success: false,
          message: 'Invalid username or password',
        });
      }
    } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).send({ error: 'Database error' });
    }
  },

  register: async (req, res) => {
    console.log("Register backend in:");
    const { username, password, nickName, region } = req.body;
    console.log("username :" + username)

    const checkSQL = 'SELECT * FROM User WHERE username = ?';
    const registerSQL = 'INSERT INTO User (username, password, nickName, region, signup_date, role) VALUES (?, ?, ?, ?, CURDATE(), "user")';

    try {
      const [rows] = await pool.query(checkSQL, [username]);
      console.log("rows:", rows);

      if (rows.length > 0) {
          console.log("username exists");
          return res.status(400).json({ success: false, message: "ID already exists." });
      }

      const [newUser] = await pool.query(registerSQL, [username, password, nickName, region]);
      if (newUser.affectedRows > 0) {
        return res.status(201).json({ success: true, message: "User registered successfully." });
      } else {
        console.log("backend registration failed in :")
        return res.status(400).json({ success: false, message: "Registration failed." });
      }
    } catch (err) {
      console.error('Error during registration:', err);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }
};

module.exports = {
  output,
  process,
};
