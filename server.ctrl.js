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
  dataDisplay: (req, res) => {
    console.log("dataDisplay in ")
    const query = "SELECT * FROM CUSTOMER WHERE isDeleted = 0";
    connection.query(query, (err, rows) => {
      res.send(rows);
      console.log(err);
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
  
    console.log("userId : "+ userId);
    console.log("movieId : "+ movieId);
  
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

  listDataGet: (req, res) => {
    console.log("dataGet in ");
  
    const { userId, movieId } = req.params;
    console.log("userId :" + userId);
    console.log("movieId :" + movieId);
  
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
  
  

  delete: (req, res) => {
    console.log("delete in ")
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params, (err, rows) => {
      res.send(rows);
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
