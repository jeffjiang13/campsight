import React, { useState } from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Search from "../Search/Search";

function Banner() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="banner">
      <div className="banner_search">
        <Button
          onClick={() => setShowSearch(!showSearch)}
          className="banner_searchButton"
          variant="outlined"
        >
          {showSearch ? "Hide" : "Search Dates"}
        </Button>
        {showSearch && <Search />}
      </div>
      <div className="banner_info">
        <h1>Go Free, Go Lively, Go Camping</h1>
        <h5>Enough of your city life; it's time for some Camping</h5>
        <Link variant="outlined" to="/advancedsearch">Explore</Link>
      </div>
    </div>
  );
}

export default Banner;
