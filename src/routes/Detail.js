import React from "react";
import "./Detail.css"; // CSS 파일을 따로 만들어 스타일을 적용

class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state === undefined) {
      history.push("/");
    }
  }

  render() {
    const { location } = this.props;
    console.log(this.props)
    if (location.state) {
      return (
        <div className="detail__container">
          <div className="detail__poster">
            <img src={location.state.poster} alt={location.state.title} />
          </div>
          <div className="detail__info">
            <h1>{location.state.title}</h1><br/>
            <h2>{location.state.genres}</h2><br/>
            <h3>{location.state.year}</h3><br/>
            <p>{location.state.summary}</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Detail;
