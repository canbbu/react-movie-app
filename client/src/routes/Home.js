// Home.js
import React from "react";
import axios from "axios";
import MovieCarousel from "../components/MovieCarousel"; // MovieCarousel 추가
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    popularMovies: [],
    top_rated: [], // TV shows
    upcoming: []      // Popular upcoming
  };

  getMovies = async (category) => {
    const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzVkNTZkYmQzZWNkN2YyMmI0MGEyNzExOTQ3NjgxNyIsIm5iZiI6MTcyNzQ4NzIwNy45MzAwMDMsInN1YiI6IjY1NzcwNGZiYzYwMDZkMDBiMGZlOWMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T_9kdzqat7jsH2DDOzhAYquC0hrtGm4-zVDop4Kk_PA';

    try {
      const {
        data: { results: movies }
      } = await axios.get(
        `https://api.themoviedb.org${category}`,
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
      return movies;
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
      return [];
    }
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const popularMovies = await this.getMovies("/3/movie/popular");
    const top_rated = await this.getMovies("/3/movie/top_rated");
    const upcoming = await this.getMovies("/3/movie/upcoming");

    this.setState({
      popularMovies,
      top_rated,
      upcoming,
      isLoading: false
    });
  }

  render() {
    const { isLoading, popularMovies, top_rated, upcoming } = this.state;

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
              <MovieCarousel movies={popularMovies} />
            </div>

            <div className="movies">
              {/* TV Shows Section */}
              <h2>Top Rated Movies</h2>
              <MovieCarousel movies={top_rated} />
            </div>

            <div className="movies">
              {/* TV Shows Section */}
              <h2>Upcoming Movies</h2>
              <MovieCarousel movies={upcoming} />
            </div>
          </>
        )}
      </section>
    );
  }  
}

export default Home;
