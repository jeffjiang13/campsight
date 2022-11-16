import React from 'react'
import './SearchResult.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";

function SearchResult({
  img,
  location,
  title,
  description,
  rating,
  other,
}) {
  return (
    <div className="searchResult">
      <img src={img} alt="" />
      <FavoriteBorderIcon className="searchResult_heart" />
      <div className="searchResult_info">
        <div className="searchResult_infotop">
          <p>{location}</p>
          <h3>{title}</h3>
          <h4>{description}</h4>
        </div>
        <div className="searchResult_infobottom">
          <div className="searchResult_stars" />
          <StarIcon className="searchResult_star" />
          <p>
            <strong>{rating}</strong>
          </p>
          </div>
        </div>
      <div className="searchResults_Other">
        <h2>{other}</h2>
        <h3>{other}</h3>
      </div>
    </div>
  );
}

export default SearchResult
