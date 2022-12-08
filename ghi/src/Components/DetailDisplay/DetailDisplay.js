import React from 'react'
import './DetailDisplay.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function DetailDisplay({
  img,
  location,
  title,
  description,
  rating,
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
          <h4 className='details'>Contact: {phone}</h4>
          <h4 className='details'>Monday: {hoursMonday}</h4>
          <h4 className='details'>Tuesday: {hoursTuesday}</h4>
          <h4 className='details'>Wednesday: {hoursWednesday}</h4>
          <h4 className='details'>Thursday: {hoursThursday}</h4>
          <h4 className='details'>Friday: {hoursFriday}</h4>
          <h4 className='details'>Saturday: {hoursSaturday}</h4>
          <h4 className='details'>Sunday: {hoursSunday}</h4>
        </div>
        <div className="searchResult_infobottom">
          <div className="searchResult_stars" />
          <div>
            <label>Rating</label>
            <strong>{rating}</strong>
          </div>
        </div>
      </div>
      <div className="searchResults_Other">
      </div>
    </div>
  );
}

export default DetailDisplay
