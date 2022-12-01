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
  hoursMonday,
  hoursTuesday,
  hoursWednesday,
  hoursThursday,
  hoursFriday,
  hoursSaturday,
  hoursSunday,
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
          <h4>Monday: {hoursMonday}</h4>
          <h4>Tuesday: {hoursTuesday}</h4>
          <h4>Wednesday: {hoursWednesday}</h4>
          <h4>Thursday: {hoursThursday}</h4>
          <h4>Friday: {hoursFriday}</h4>
          <h4>Saturday: {hoursSaturday}</h4>
          <h4>Sunday: {hoursSunday}</h4>
        </div>
        <div className="searchResult_infobottom">
          <div className="searchResult_stars" />
          <p>
            <h5>Rating</h5>
            <strong>{rating}</strong>
          </p>
        </div>
      </div>
      <div className="searchResults_Other">
        <h3>{other}</h3>
      </div>
    </div>
  );
}

export default SearchResult
