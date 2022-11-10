import React, { useState } from "react";
import "./Banner.css";
import { Button } from "@mui/material";

function Banner() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="banner">
      <div className="banner_search">
        <Button className="banner_searchButton" variant="outlined">
          Search
        </Button>
        {showSearch && <h1>Show Date</h1>}
      </div>
      <div className="banner_info">
        <h1>Go Free, Go Lively, Go Camping</h1>
        <h5>Enough of your city life; it's time for some Camping</h5>
        <Button variant="outlined">Explore</Button>
      </div>
    </div>
  );
}

export default Banner;
