import React, { useState, useEffect } from 'react'
import './SearchPage.css'
import SearchResult from '../SearchResult/SearchResult';
import Map from '../Map/Map';
import { Rating } from '@mui/material';
import { useParams } from 'react-router-dom'


function Details() {
  const [details, setDetails] = useState([])
  const parkCode = useParams().parkCode

  async function getDetails() {
    const detailResponse = await fetch(`http://localhost:8000/details?parkCode=${parkCode}`)
    if (detailResponse.ok) {
      const data = await detailResponse.json();
      setDetails(data.data)
    }
  }

  useEffect(() => {
    getDetails()
  }, []);

  const containerStyle = {
    width: 1000,
    height: 400,
  };

  return (
    <>
      <div className="searchPage">
        {details.map((details, index) => {
          return (
            < SearchResult key={index}
              img={details.images[0].url}
              location={details.states}
              title={details.fullName}
              description={details.description}
              rating={<Rating name="size-large" defaultValue={2} size="large" />}
            />)
        })}
        <Map pins={[details && details.length && ({
          lat: Number(details[0].latitude),
          lng: Number(details[0].longitude),
          title: details[0].fullName,
          image: details[0].images[0].url,
          name: details[0].fullName,
          description: details[0].description,
          src: details[0].images[0].url,
          contact: details[0].contacts.emailAddresses[0].emailAddress,
          latLong: details[0].latLong,
          parkCode: details[0].parkCode
        })]} style={containerStyle} />
      </div>
    </>
  );
}


export default Details;
