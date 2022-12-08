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
      <div className='searchResultImg'>
        <img src={img} alt={title} title={title} />
      </div>
      <div className="searchResult_infotop">
        <FavoriteBorderIcon className="searchResult_heart" />
        <p>{location}</p>
        <h3>{title}</h3>
        <h4 id='description'>{description}</h4>
        <h4 className='details'>Contact: {phone}</h4>
        <h4 className='details'>Monday: {hoursMonday}</h4>
        <h4 className='details'>Tuesday: {hoursTuesday}</h4>
        <h4 className='details'>Wednesday: {hoursWednesday}</h4>
        <h4 className='details'>Thursday: {hoursThursday}</h4>
        <h4 className='details'>Friday: {hoursFriday}</h4>
        <h4 className='details'>Saturday: {hoursSaturday}</h4>
        <h4 className='details'>Sunday: {hoursSunday}</h4>
        <label>Rating</label>
        <strong>{rating}</strong>
      </div>
    </div>
  );
}

export default DetailDisplay
