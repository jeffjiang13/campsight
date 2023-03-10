import React, { useState, useEffect } from 'react'
import './DetailPage.css'
import DetailDisplay from '../DetailDisplay/DetailDisplay';
import Map from '../Map/Map';
import { useParams } from 'react-router-dom'
import Review from '../Review/Review';


function Details() {
  const [details, setDetails] = useState([])
  const parkCode = useParams().parkCode
  const [rating, setRating] = useState()

  useEffect(() => {
    // eslint-disable-next-line
    async function getDetails() {
      const detailResponse = await fetch(`${process.env.REACT_APP_PARKS_API_HOST}/details?parkCode=${parkCode}`)
      if (detailResponse.ok) {
        const data = await detailResponse.json();
        setDetails(data.data)
      }
      const reviewResponse = await fetch(`${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/by-parkcode/${parkCode}`)
      if (reviewResponse.ok) {
        const reviewData = await reviewResponse.json()
        const ratingList = []
        var ratingAverage = 0
        for (let reviewRating of reviewData) {
          ratingList.push(Number(reviewRating.rating))
          ratingAverage = ratingAverage + Number(reviewRating.rating)
        }
        setRating(ratingAverage / ratingList.length)
      }
    }
    getDetails()
    // eslint-disable-next-line
  }, []);

  function getPhoneNumber(phoneNumbers) {
    for (let i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i].type === "Voice") {
        let num = phoneNumbers[i].phoneNumber;
        if (num.length > 10) {
          return num;
        }
        return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
      } else {
        return "No listed phone number"
      }
    }
  }

  const containerStyle = {
    bottom: '.35vw',
    display: 'flex',
    alignItem: 'start',
    justifyContent: 'start',
    width: '30vw',
    height: '55.5vh',
    borderRadius: 16,
    marginRight: 50,
  };

  return (
    <>
      <div className="search-wrapper">
        {details.map((details, index) => {
          const hours = details.operatingHours[0].standardHours
          return (
            < DetailDisplay key={index}
              parkCode={details.parkCode}
              img={details.images}
              location={details.states}
              title={details.fullName}
              phone={getPhoneNumber(details.contacts.phoneNumbers)}
              description={details.description}
              hoursMonday={hours.monday}
              hoursTuesday={hours.tuesday}
              hoursWednesday={hours.wednesday}
              hoursThursday={hours.thursday}
              hoursFriday={hours.friday}
              hoursSaturday={hours.saturday}
              hoursSunday={hours.sunday}
              rating={rating}
            />)
        })}
        <div className='right-container'>
          <div className='map-section'>
            <Map pins={[details && details.length && ({
              lat: Number(details[0].latitude),
              lng: Number(details[0].longitude),
              title: details[0].fullName,
              name: details[0].fullName,
              description: details[0].description,
              src: details[0].images[0].url,
              latLong: details[0].latLong,
              parkCode: details[0].parkCode
            })]} style={containerStyle} />
          </div>
        </div>
      </div>
      {details.map((details, index) => {
        return (
          <div className='review-section'>
            <Review key={index} parkCode={details.parkCode} className="reviewStars" />
          </div>
        )
      })}
    </>
  );
}


export default Details;
