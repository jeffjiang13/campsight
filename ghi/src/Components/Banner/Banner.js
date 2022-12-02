import React, { useState } from "react";
import "./Banner.css";
import { Button } from "@mui/material";
import Search from "../Search/Search";
import Navbar from 'react-bootstrap/Navbar'

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
        <Button variant="outlined" onClick={event => window.location.href = "/advancedsearch"}>Explore</Button>
      </div>
    </div>
  );
}

export default Banner;
