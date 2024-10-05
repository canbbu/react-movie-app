"use strict"

const mysql = require('mysql');
const fs = require('fs');
const express = require('express');

const data = fs.readFileSync('./databases.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  database : conf.database,
  port : conf.port,
});
connection.connect();

const output = {
  listDataGet: (req, res) => {
    console.log("listDataGet in ");
  
    const { userId, movieId } = req.params;
  
    // SQL query to select data from the Favorites table
    let sql = 'SELECT * FROM Favorites WHERE user_id = ? and movie_id = ?';
  
    connection.query(sql, [userId, movieId], (err, rows) => {
      if (err) {
        console.error("Error executing query:", err); // Log the specific error
        return res.status(500).send({ error: 'Database error' });
      }
      if (rows.length > 0) { // Corrected from 'results' to 'rows'
        res.json(rows[0]); // Return the first result
      } else {
        res.json({ isWished: false, isWatched: false }); // Default values if no entry exists
      }
    });
  },

  wishedData: (req, res) => {
    console.log("wishedData in ");
  
    const { userId, type } = req.params; // Get userId and type from the request parameters
  
    // Set the condition based on the type (my -> wishList, watch -> watchedList)
    let sql;
    if (type === "my") {
      sql = 'SELECT * FROM Favorites WHERE user_id = ? AND isWished = true';
    } else if (type === "watch") {
      sql = 'SELECT * FROM Favorites WHERE user_id = ? AND isWatched = true';
    } else {
      return res.status(400).json({ error: "Invalid type parameter" }); // Return error if type is invalid
    }
  
    // Execute the SQL query
    connection.query(sql, [userId], (err, rows) => {
      if (err) {
        console.error("Error executing query:", err); // Log the specific error
        return res.status(500).send({ error: 'Database error' });
      }
      
      if (rows.length > 0) {
        res.json(rows); // Return all results as an array
      } else {
        res.json({
          message: "No data found",  // Message indicating no data found
          data: null              // Optionally send 'null' or an empty array
        });
      }
    });
  },  
};

const process = {
  listdataUpdate: (req, res) => {
    console.log("dataUpdate in ");
    const userId = req.body.userId;
    const movieId = req.params.movieId;
    const isWished = req.body.isWished;
    const isWatched = req.body.isWatched;
  
    // Use INSERT ... ON DUPLICATE KEY UPDATE
    let sql = `
      INSERT INTO Favorites (user_id, movie_id, added_date, isWished, isWatched)
      VALUES (?, ?, now(), ?, ?)
      ON DUPLICATE KEY UPDATE
        isWished = ?, isWatched = ?`;
  
    let params = [userId, movieId, isWished, isWatched, isWished, isWatched]; // Params for update section as well
  
    connection.query(sql, params, (err, result) => {
      if (err) {
        console.error("Error during data insertion or update:", err);
        return res.status(500).send("Error inserting/updating data");
      }
      res.send({ success: true, message: "Record added or updated successfully." });
    });
  },
  

  login: (req, res) => {
    console.log("login in ");
    const { username, password } = req.body;

    // 사용자 자격 증명 확인
    const sql = 'SELECT user_id FROM user WHERE username = ? AND password = ?';
    connection.query(sql, [username, password], (err, rows) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }

        // Check if user exists
        if (rows.length > 0) {
            const userId = rows[0].user_id; // Assuming user_id is the first field in the response
            console.log("userId : " + userId);
            return res.send({
                success: true,
                message: 'Login successful',
                userId: userId, // Send user_id in the response
            });
        } else {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password',
            });
        }
    });
  }
};

module.exports = {
  output,
  process,
};
