import React, { useEffect, useState } from "react";
import './DetailDisplay.css'
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Rating } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import { useGetTokenQuery } from "../../app/api";

function DetailDisplay({
  parkCode,
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

  const { data: tokenData } = useGetTokenQuery();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    async function getFavorite() {
      const favoriteResponse = await fetch(`${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/favorites/${tokenData.account.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        },
      });
      const data = await favoriteResponse.json();
      if (data.find(favorite => favorite.park_code === parkCode) !== undefined) {
        setIsFavorited(true);
      }
    }
    getFavorite();
  }, [tokenData, parkCode])

  async function handleCreateFavoriteClick(event) {
    event.preventDefault();
    if (!tokenData) {
      return
    }
    setIsFavorited(true);
    await fetch(`${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/favorites`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        favorited: true,
        park_code: `${parkCode}`,
        account_id: `${tokenData.account.id}`
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })
  }


  async function handleDeleteFavoriteClick(event) {
    event.preventDefault();
    setIsFavorited(false);
    await fetch(`${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/favorites/${tokenData.account.id}/${parkCode}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })
  }


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
  }

  function Item(props) {
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
        {isFavorited
          ? <FavoriteIcon className="searchResult_heart" onClick={handleDeleteFavoriteClick} />
          : <FavoriteBorderIcon className="searchResult_heartBorder" onClick={handleCreateFavoriteClick} />
        }
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
        <strong>{<Rating name="size-large" defaultValue={5} readOnly={true} value={Number(rating)} size="large" />}</strong>
      </div>
    </div >
  );
}

export default DetailDisplay
