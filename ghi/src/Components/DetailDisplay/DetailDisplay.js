import React from 'react'
import './DetailDisplay.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Rating } from '@mui/material';
import Carousel from 'react-material-ui-carousel'

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

  {
    const images = []
    images.push(img)
    var items = []
    for (let image of images[0]) {
      items.push({
        name: image.title,
        url: image.url
      })
    }
    console.log(items)
  }

  function Item(props) {
    console.log("props=", props)
    return (
      <div className='searchResultImg'>
        <img alt={props.item.name} src={props.item.url} />
      </div>
    )
  }

  return (
    <div className="searchResult">
      <Carousel
        stopAutoPlayOnHover='True'
        navButtonsAlwaysVisible='True'
        changeOnFirstRender='True'
        interval='4000'
        indicatorIconButtonProps={{
          style: {
            padding: '10px',
            align: 'center',
            marginTop: '-50px'
          }
        }}
        indicatorContainerProps={{
          style: {
            margin: 'auto',
            display: 'flex',
            width: '50vw',
            overflow: 'hidden',
            textAlign: 'right' // 4
          }
        }}>
        {
          items.map((item, i) => <Item key={i} item={item} />)
        }
      </Carousel>
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
        <strong>{<Rating name="size-large" defaultValue={5} value={Number(rating)} size="large" />}</strong>
      </div>
    </div >
  );
}

export default DetailDisplay
