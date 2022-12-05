import React from 'react'
import './DetailDisplay.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function DetailDisplay({
  img,
  location,
  title,
  description,
  rating,
  weather,
  hoursMonday,
  hoursTuesday,
  hoursWednesday,
  hoursThursday,
  hoursFriday,
  hoursSaturday,
  hoursSunday,
  phone,
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
<<<<<<< HEAD
          <h4>{weather}</h4>
          <br></br>
          <h5>Contact: 307-344-7381 COOPER PLEASE PASS API DATA LOL</h5>
          <h5>Monday: {hoursMonday}</h5>
          <h5>Tuesday: {hoursTuesday}</h5>
          <h5>Wednesday: {hoursWednesday}</h5>
          <h5>Thursday: {hoursThursday}</h5>
          <h5>Friday: {hoursFriday}</h5>
          <h5>Saturday: {hoursSaturday}</h5>
          <h5>Sunday: {hoursSunday}</h5>
=======
          <h4>Contact: {phone}</h4>
          <h4>Monday: {hoursMonday}</h4>
          <h4>Tuesday: {hoursTuesday}</h4>
          <h4>Wednesday: {hoursWednesday}</h4>
          <h4>Thursday: {hoursThursday}</h4>
          <h4>Friday: {hoursFriday}</h4>
          <h4>Saturday: {hoursSaturday}</h4>
          <h4>Sunday: {hoursSunday}</h4>
>>>>>>> b2cefdd50f181c97624b6185bdd7bfbd0c190401
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
      </div>
    </div>
  );
}

export default DetailDisplay
