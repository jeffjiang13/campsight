import React, { useState } from "react";
import "./Banner.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Search from "../Search/Search";

function Banner3() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="banner3">
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
        <h1>Explore the beauty of Big Bend!</h1>
        <h5>Big Bend is one of the most popular desert parks!</h5>
        <button>
          <Link variant="outlined" to="/Search/bibe">Check out why</Link>
        </button>
      </div>
    </div>
  );
}

function Banner2() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="banner2">
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
        <button>
          <Link variant="outlined" to="/advancedsearch">Search Parks</Link>
        </button>
      </div>
    </div>
  );
}

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
        <h1>See the all the stars in the night sky!</h1>
        <h5>Check out one of the nation's best night skys in a dark park!</h5>
        <button>
          <Link variant="outlined" to="/Search/grba">Great Basin National Park</Link>
        </button>
      </div>
    </div>
  );
}

export {
  Banner,
  Banner2,
  Banner3
}