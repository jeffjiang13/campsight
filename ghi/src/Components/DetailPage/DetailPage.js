import React, { useState, useEffect } from 'react'
import './DetailPage.css'
import DetailDisplay from '../DetailDisplay/DetailDisplay';
import Map from '../Map/Map';
import { Rating } from '@mui/material';
import { useParams } from 'react-router-dom'
import Review from '../Review/Review';


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

  function getPhoneNumber(phoneNumbers) {
    for (let i = 0; i < phoneNumbers.length; i++) {
      if (phoneNumbers[i].type === "Voice") {
        let num = phoneNumbers[i].phoneNumber;
        return `${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
      } else {
        return "No listed phone number"
      }
    }
  }

  useEffect(() => {
    getDetails()
  }, []);

  const containerStyle = {
    width: 1000,
    height: 500,
  };

  return (
    <>
      <div className="searchPage">
        {details.map((details, index) => {
          console.log(details)
          const hours = details.operatingHours[0].standardHours

          return (
            < DetailDisplay key={index}
              img={details.images[0].url}
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
            />)
        })}
        <div className='mapDetailsPage'>
          <Review />
          <Rating name="size-large" defaultValue={2} size="large" />
        </div>
        <div/>
        <div className='mapDetailsPage'>
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
      </div>
    </>
  );
}


export default Details;
