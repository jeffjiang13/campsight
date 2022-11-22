import React, { useEffect } from 'react'
import './SearchPage.css'
import { Button } from '@mui/material'
import SearchResult from '../SearchResult/SearchResult';
import Map from '../Map/Map';

function SearchPage() {
  const fetchDetail = async () => {
    const states = 'tx'
    const parkCode = 'bibe'
    const detailResponse = await (await fetch(`http://localhost:8000/detailtest?states=${states}&parkCode=${parkCode}`)).json()
    console.log(detailResponse)
  }

  useEffect(() => {
    fetchDetail()
  }, []);

  return (
    <div className="searchPage">
      <div className="SearchPage_info">
        <p>Camp ground details</p>
        <h1>Search Page or Details Page</h1>
        <Button variant="outlined">Type of Camp Site</Button>
        <Button variant="outlined">Rating</Button>
        <Button variant="outlined">Rooms and Beds</Button>
        <Button variant="outlined">More filters Here</Button>
        <Button variant="outlined">More filters Here</Button>
      </div>
      <SearchResult
        img="https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1496241913/campground-photos/s0bmk3ypv7xqpgbuh6m4.jpg"
        location="Everglades, FL"
        title="Long Pine Key Group Campground"
        description="seven miles from the Everglades National Park entrance, Long Pine Key campground is a tranquil
          and well-maintained facility open seasonally from November to May."
        rating={4.95}
        other="Weather Data HERE"
      />
      <Map />
    </div>
  );
}

export default SearchPage