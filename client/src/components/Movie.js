import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Movie.css"; // Movie.css 파일을 가져옴


function Movie({ id, year, title, summary, poster, genres, movie }) {

  return (
    <div className="movie">
      <Link
        to={`/movie/${id}`}
        state={{
          year,
          title,
          summary,
          poster,
          genres
        }}
      >
        <div className="movie__data">
        <img
          src={poster || "default_poster_url"} // 포스터가 없을 때 대체 이미지
          alt={title || "No title"} // 타이틀이 없을 때 대체 텍스트
          title={title}
        />
          <h3 className="movie__title">{title || "No Title Available"}</h3>
        </div>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number,
  title: PropTypes.string,
  summary: PropTypes.string,
  poster: PropTypes.string,
  genres: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])), // 장르 타입 수정
};

export default Movie;
