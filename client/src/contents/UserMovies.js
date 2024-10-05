import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./UserMovies.css";

function UserMovies({ id, year, title, summary, poster, genres, refreshMovies, isWished: initialIsWished, isWatched: initialIsWatched }) {
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
  const [isWished, setIsWished] = useState(initialIsWished); // Wishlist status
  const [isWatched, setIsWatched] = useState(initialIsWatched); // Watched status
  const isLoggedIn = localStorage.getItem('login') === 'true'; // Check login status

  // Set initial states based on props
  useEffect(() => {
    setIsWished(initialIsWished);
    setIsWatched(initialIsWatched);
  }, [initialIsWished, initialIsWatched]);

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    if (!loginCheck()) return; // Stop if not logged in
    const newWishlistStatus = !isWished;
    setIsWished(newWishlistStatus); // Toggle the wishlist state

    try {
      await updateMovieStatus(userId, id, newWishlistStatus, isWatched);
      refreshMovies(); // Refresh the list after toggling
    } catch (error) {
      console.error("Error updating wishlist status:", error);
    }
    
  };

  // Handle watched toggle
  const handleWatchedToggle = async () => {
    if (!loginCheck()) return; // Stop if not logged in
    const newWatchedStatus = !isWatched;
    setIsWatched(newWatchedStatus); // Toggle the watched state

    try {
      await updateMovieStatus(userId, id, isWished, newWatchedStatus);
      refreshMovies(); // Refresh the list after toggling
    } catch (error) {
      console.error("Error updating watched status:", error);
    }
  };

  const loginCheck = () => {
    if (!isLoggedIn) {
      alert("ログインしてください。");
      return false;
    }
    return true;
  };

  // Update movie status in the database
  const updateMovieStatus = async (userId, movieId, isWished, isWatched) => {
    const response = await fetch(`/userMovies/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        movieId,
        isWished,
        isWatched,
      }),
    });
    return response.json();
  };

  return (
    <div className="UserMovies">
      <img src={poster || "default_poster_url"} alt={title || "No title available"} />
      <div className="UserMovies__data">
        <h3 className="UserMovies__title">{title}</h3>
        <h5 className="UserMovies__year">{year}</h5>
        <p className="UserMovies__summary">{summary}</p>

        {/* Wishlist Toggle Button */}
        <Button
          variant={isWished ? "contained" : "outlined"}
          color="primary"
          onClick={handleWishlistToggle}
          style={{
            backgroundColor: isWished ? "gold" : "transparent", // Yellow background when wished
            color: isWished ? "#fff" : "#333", // Change text color
            border: "2px solid #333", // Border color
          }}
        >
          {isWished ? "My List" : "My List"}
        </Button>

        {/* Watched Toggle Button */}
        <Button
          variant={isWatched ? "contained" : "outlined"}
          color="secondary"
          onClick={handleWatchedToggle}
          style={{
            marginLeft: "10px",
            backgroundColor: isWatched ? "#007bff" : "transparent", // Blue background when watched
            color: isWatched ? "#fff" : "#333", // Change text color
            border: "2px solid #007bff", // Border color for watched
          }}
        >
          {isWatched ? "Watched" : "Watch"}
        </Button>
      </div>
    </div>
  );
}

export default UserMovies;
