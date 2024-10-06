import React from "react";
import axios from "axios";
import MovieCarousel from "../contents/MovieCarousel"; // MovieCarousel 추가
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    popularMovies: [],
    top_rated: [], // TV shows
    upcoming: [],  // Popular upcoming
    filteredPopular: [],
    filteredTop: [],
    filteredUpcoming: [],
  };

  getMovies = async (category) => {
    const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzVkNTZkYmQzZWNkN2YyMmI0MGEyNzExOTQ3NjgxNyIsIm5iZiI6MTcyNzQ4NzIwNy45MzAwMDMsInN1YiI6IjY1NzcwNGZiYzYwMDZkMDBiMGZlOWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T_9kdzqat7jsH2DDOzhAYquC0hrtGm4-zVDop4Kk_PA';

    try {
      const response = await axios.get(
        `https://api.themoviedb.org${category}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
            accept: 'application/json',
          },
          params: {
            language: 'en-US',
            page: 1,
          }
        }
      );
      return response.data.results || []; // Return an empty array if no results
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
      return []; // Return an empty array in case of an error
    }
  };

  applyFilter = () => {
    const { searchKeyword = "" } = this.props; // Default to an empty string if searchKeyword is not provided
    const { popularMovies, top_rated, upcoming } = this.state;

    // If no searchKeyword, show all movies
    if (!searchKeyword) {
      this.setState({
        filteredPopular: popularMovies,
        filteredTop: top_rated,
        filteredUpcoming: upcoming,
      });
    } else {
      // Filter movies based on searchKeyword (case-insensitive)
      const lowerCaseKeyword = searchKeyword.toLowerCase();
      
      const filteredPopular = popularMovies.filter(movie =>
        movie.title.toLowerCase().includes(lowerCaseKeyword)
      );
      const filteredTop = top_rated.filter(movie =>
        movie.title.toLowerCase().includes(lowerCaseKeyword)
      );
      const filteredUpcoming = upcoming.filter(movie =>
        movie.title.toLowerCase().includes(lowerCaseKeyword)
      );

      // Update state with filtered results
      this.setState({
        filteredPopular,
        filteredTop,
        filteredUpcoming,
      });
    }
  };

  // This function will be called when props or state are updated
  async componentDidUpdate(prevProps) {
    // If the searchKeyword changes, apply the filter
    if (prevProps.searchKeyword !== this.props.searchKeyword) {
      this.applyFilter(); // Filter movies whenever searchKeyword updates
    }
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const popularMovies = await this.getMovies("/3/movie/popular");
      const top_rated = await this.getMovies("/3/movie/top_rated");
      const upcoming = await this.getMovies("/3/movie/upcoming");

      // Set state with fetched movies and initialize filtered movies
      this.setState({
        popularMovies,
        top_rated,
        upcoming,
        filteredPopular: popularMovies,
        filteredTop: top_rated,
        filteredUpcoming: upcoming,
        isLoading: false
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { isLoading, filteredPopular, filteredTop, filteredUpcoming } = this.state;

    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <>
            <div className="movies">
              {/* Popular Movies Section */}
              <h2>Popular Movies</h2>
              <MovieCarousel movies={filteredPopular} />
            </div>

            <div className="movies">
              {/* Top Rated Movies Section */}
              <h2>Top Rated Movies</h2>
              <MovieCarousel movies={filteredTop} />
            </div>

            <div className="movies">
              {/* Upcoming Movies Section */}
              <h2>Upcoming Movies</h2>
              <MovieCarousel movies={filteredUpcoming} />
            </div>
          </>
        )}
      </section>
    );
  }  
}

export default Home;
