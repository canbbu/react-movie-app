import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav">
      <Link to="/">ホーム</Link>
      <Link to="/about">アバウト</Link>
      <Link to="/MyList" >ウィッシュ</Link>
      <Link to="/WatchList">観覧リスト</Link>
    </div>
  );
}

export default Navigation;
