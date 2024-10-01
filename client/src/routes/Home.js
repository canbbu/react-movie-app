import React from "react";
import axios from "axios";
import Movie from "../components/Movie"; // Ensure you have a Movie component
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [] // Initialize movies as an empty array
  };

  getMovies = async () => {
    const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzVkNTZkYmQzZWNkN2YyMmI0MGEyNzExOTQ3NjgxNyIsIm5iZiI6MTcyNzQ4NzIwNy45MzAwMDMsInN1YiI6IjY1NzcwNGZiYzYwMDZkMDBiMGZlOWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T_9kdzqat7jsH2DDOzhAYquC0hrtGm4-zVDop4Kk_PA'; // Replace with your actual Bearer token

    try {
      const {
        data: { results: movies } // Ensure this matches the API response structure
      } = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            accept: 'application/json',
          },
          params: {
            language: 'en-US',
            page: 1
          }
        }
      );

      console.log("Fetched Movies: ", movies); // Log the fetched movies

      // Set state with movies and update loading state
      this.setState({ movies, isLoading: false });

    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ isLoading: false }); // Stop loading if there's an error
    }
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={new Date(movie.release_date).getFullYear()} // Get the release year
                title={movie.title}
                summary={movie.overview} // Overview for summary
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Construct the image URL
                genres={movie.genre_ids} // Map to genre names if needed
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
