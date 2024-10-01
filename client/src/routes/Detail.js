import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detail.css";

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      // location.state가 없으면 홈으로 리다이렉트
      navigate("/");
    }
  }, [location, navigate]);

  if (location.state) {
    const { poster, title, genres, year, summary } = location.state;
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
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Detail;
