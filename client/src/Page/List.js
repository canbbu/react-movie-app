import React from "react";
import axios from "axios";
import UserMovies from "../contents/UserMovies"; // Import UserMovies component
import "./List.css";

class List extends React.Component {
  userId = localStorage.getItem("userId");

  state = {
    isLoading: true,
    movies: [], // Initialize movies as an empty array
  };

  // Function to refresh movies based on type (wishList or watchList)
  refreshMovies = async () => {
    const { type } = this.props;
    const movieList = await this.getMoviesByType(type); // Fetch movies based on the type

    if (movieList.length > 0) {
      await this.getMovies(movieList); // Fetch full movie details based on IDs
    } else {
      this.setState({ movies: [], isLoading: false }); // Clear movies if none found
    }
  };

  // Fetch movies (wished or watched) from the backend based on type
  getMoviesByType = async (type) => {
    try {
      // API request depends on type: "my" for wishList and "watch" for watchList
      const response = await axios.get(`/userMovies/${type}/${this.userId}`);
      console.log(`Full ${type === "my" ? "Wished" : "Watched"} Response:`, response); // Log response for debugging
      return response.data || []; // Return the movie data, or an empty array if none
    } catch (error) {
      console.error(`Error fetching ${type === "my" ? "wished" : "watched"} movies:`, error);
      return [];
    }
  };

  // Fetch movies from TMDb API based on wished/watched movies data
  getMovies = async (movieList) => {
    const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzVkNTZkYmQzZWNkN2YyMmI0MGEyNzExOTQ3NjgxNyIsIm5iZiI6MTcyNzQ4NzIwNy45MzAwMDMsInN1YiI6IjY1NzcwNGZiYzYwMDZkMDBiMGZlOWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T_9kdzqat7jsH2DDOzhAYquC0hrtGm4-zVDop4Kk_PA'; // Replace with your actual Bearer token

    try {
      // Check if the movieList is valid
      if (!Array.isArray(movieList) || movieList.length === 0) {
        this.setState({ isLoading: false });
        return;
      }

      // Create an array of promises for fetching movie data from TMDb API
      const moviePromises = movieList.map(movie =>
        axios.get(`https://api.themoviedb.org/3/movie/${movie.movie_id}`, {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            accept: 'application/json',
          }
        })
      );

      // Wait for all API requests to complete
      const moviesResponses = await Promise.all(moviePromises);

      // Combine the movie data with the additional status flags (isWished and isWatched)
      const movies = moviesResponses.map((response, index) => ({
        ...response.data,
        isWished: movieList[index].isWished, // Get isWished status from movieList
        isWatched: movieList[index].isWatched // Get isWatched status from movieList
      }));

      // Update the state with fetched movies
      this.setState({ movies, isLoading: false });
    } catch (error) {
      console.error("Error fetching movies:", error);
      this.setState({ isLoading: false }); // Stop loading if there's an error
    }
  };

  // This function will be called when props or state are updated
  async componentDidUpdate(prevProps) {
    // Check if the `type` prop has changed
    if (prevProps.type !== this.props.type) {
      // Fetch the movie list based on the new type
      const movieList = await this.getMoviesByType(this.props.type);

      // Fetch the movie data from TMDb API using the movie list
      if (movieList.length > 0) {
        this.getMovies(movieList); // Fetch movie details if list is not empty
      } else {
        this.setState({ isLoading: false }); // Stop loading if no movies found
      }
    }
  }

  async componentDidMount() {
    const { type } = this.props;

    // Step 1: Fetch the correct movie list (wishList or watchList) based on the `type` prop
    const movieList = await this.getMoviesByType(type);

    // Step 2: Fetch the movie data from TMDb API using the movie list
    if (movieList.length > 0) {
      this.getMovies(movieList); // Fetch movie details if list is not empty
    } else {
      this.setState({ isLoading: false }); // Stop loading if no movies found
    }
  }

  render() {
    const { isLoading, movies } = this.state;
    const { type } = this.props; // Get the type from props

    return (
      <section className="containerList">
        {isLoading ? (
          <div className="loaderList">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movieList">
            {movies.length > 0 ? (
              movies.map(movie => (
                <UserMovies
                  key={movie.id}
                  id={movie.id}
                  year={new Date(movie.release_date).getFullYear()} // Convert release_date to year
                  title={movie.title}
                  summary={movie.overview || "No summary available"} // Use movie overview for summary
                  poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Construct poster image URL
                  genres={movie.genres.map(genre => genre.name)} // Get genre names
                  isWished={movie.isWished} // Get isWished from the movie data
                  isWatched={movie.isWatched} // Get isWatched from the movie data
                  refreshMovies={this.refreshMovies} // Pass refreshMovies to the UserMovies component
                />
              ))
            ) : (
              <p>{type === "my" ? "No movies found in your wishlist." : "No movies found in your watched list."}</p>
            )}
          </div>
        )}
      </section>
    );
  }
}

export default List;
