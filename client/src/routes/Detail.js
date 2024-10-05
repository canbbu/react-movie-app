import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Detail.css";
import StarIcon from "@mui/icons-material/Star"; // Star icon from MUI
import Button from "@mui/material/Button"; // MUI Button

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: movieId } = useParams(); // Get movie ID from URL
  const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage

  const [isWished, setIsWished] = useState(false); // Wishlist status
  const [isWatched, setIsWatched] = useState(false); // Watched status
  const isLoggedIn = localStorage.getItem('login') === 'true';

  // Fetch movie status when component mounts
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    } else {
      console.log("userid :" + userId)
      fetchMovieStatus(userId, movieId);
    }
  }, [location, navigate, userId, movieId]);

  // Fetch movie status from the database
  const fetchMovieStatus = async (userId, movieId) => {
    if(isLoggedIn){
      try {
        const response = await fetch(`/userMovies/${userId}/${movieId}`); // Include movieId in the URL
        const data = await response.json();
        if (data) {
          setIsWished(data.isWished);
          setIsWatched(data.isWatched);
        }
      } catch (error) {
        console.error("Error fetching movie status:", error);
      }
    }
  };

  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    const isLoggedIn = loginCheck(); // You may want to return a value from loginCheck
    if (!isLoggedIn) return; // Stop execution if not logged in
    const newWishlistStatus = !isWished;
    setIsWished(newWishlistStatus); // Toggle the wishlist state

    // Update the database with the new status
    try {
      await updateMovieStatus(userId, movieId, newWishlistStatus, isWatched);
    } catch (error) {
      console.error("Error updating wishlist status:", error);
    }
  };

  // Handle watched toggle
  const handleWatchedToggle = async () => {
    const isLoggedIn = loginCheck(); // You may want to return a value from loginCheck
    if (!isLoggedIn) return; // Stop execution if not logged in
    const newWatchedStatus = !isWatched;
    setIsWatched(newWatchedStatus); // Toggle the watched state

    // Update the database with the new status
    try {
      await updateMovieStatus(userId, movieId, isWished, newWatchedStatus);
    } catch (error) {
      console.error("Error updating watched status:", error);
    }
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

  const loginCheck = () => {
    if (!isLoggedIn) {
        alert("保存するためにはログインしてください。");
        return false; // Indicate that the user is not logged in
    }
    return true; // Indicate that the user is logged in
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (location.state) {
    const { id, poster, title, genres, year, summary } = location.state;
    return (
      <div className="detail__container">
        <div className="detail__poster">
          <img src={poster} alt={title} />
        </div>
        <div className="detail__info">
          <h1>{title}</h1>
          <h2>{genres.join(", ")}</h2>
          <h3>{year}</h3>
          <p>{summary}</p>
          {/* Button layout */}
          <div className="detail__buttons">
            {/* MyList button */}
            <Button
              variant="outlined"
              onClick={handleWishlistToggle}
              style={{
                backgroundColor: isWished ? "gold" : "transparent", // Yellow background when wished
                color: isWished ? "#fff" : "#333", // Change text color
                border: "2px solid #333", // Border color
              }}
            >
              <StarIcon style={{ color: isWished ? "#fff" : "#333" }} /> {/* Star color */}
              {isWished ? "My List" : "My List"} {/* Change text */}
            </Button>

            {/* Watched button */}
            <Button
              variant="outlined"
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

            {/* Back button */}
            <Button
              variant="contained"
              onClick={handleBack}
              className="buttons_back" // Additional class
              style={{
                backgroundColor: "#333",
                color: "#fff",
                marginLeft: "auto", // Align to the right
              }}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return null; // If no location state, render nothing
  }
}

export default Detail;
