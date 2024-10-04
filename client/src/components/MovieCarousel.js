// MovieCarousel.js
import React from "react";
import Movie from "../components/Movie";
import PropTypes from "prop-types";
import "./MovieCarousel.css"; // 스타일을 위한 CSS 파일 추가

function MovieCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const itemsToShow = 7;
  const maxItems = 20; 

  const handlePrev = () => {
    if (movies.length > 0) {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };
  
  const handleNext = () => {
    if (movies.length > 0) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, Math.min(movies.length, maxItems) - itemsToShow)
      );
    }
  };

  // 비활성화 조건 추가
  const isPrevDisabled = currentIndex === 0 || movies.length === 0;
  const isNextDisabled = currentIndex >= Math.max(0, movies.length - itemsToShow);
  
  console.log("Current Index: " + currentIndex);
  console.log("movie.length : " + movies.length);
  console.log("itemsToShow: " + itemsToShow);
  console.log("count: " + movies.length -itemsToShow);
  // 상태가 업데이트된 후에 currentIndex 값을 콘솔에 출력
  React.useEffect(() => {
    console.log("Current Index: " + currentIndex);
  }, [currentIndex]);
  
  return (
    <div className="carousel">
      <button className="carousel__arrow left" onClick={handlePrev} disabled={isPrevDisabled}>
        ◀
      </button>
      <div className="carousel__movies" style={{ transform: `translateX(-${(currentIndex / itemsToShow) * 100}%)` }}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            year={new Date(movie.release_date).getFullYear()}
            title={movie.title}
            summary={movie.overview}
            poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            genres={movie.genre_ids}
          />
        ))}
      </div>
      <button className="carousel__arrow right" onClick={handleNext} disabled={isNextDisabled}>
        ▶
      </button>
    </div>
  );
}

MovieCarousel.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieCarousel;
