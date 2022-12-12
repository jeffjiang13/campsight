import React, { useEffect, useState } from 'react'
import "./Review.css"
import { Rating } from '@mui/material';
import { useGetTokenQuery } from "../../app/api";

function Review(parkCode) {
  const { data: tokenData } = useGetTokenQuery();
  const [reviewText, setreviewText] = useState('')
  const [starRating, setstarRating] = useState()
  const [reviewList, setreviewList] = useState([])


  useEffect(() => {
    async function getReviews() {
      let park = parkCode.parkCode
      const reviewApiResponse = await fetch(`${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/by-parkcode/${park}`)
      if (reviewApiResponse.ok) {
        const reviewData = await reviewApiResponse.json()
        setreviewList(reviewData)
      }
    }
    getReviews()
    // eslint-disable-next-line
  }, []);

  async function handlePostReview(event) {
    event.preventDefault();
    if (!tokenData) {
      return
    }
    await fetch(`${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/review`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        rating: starRating,
        parkCode: parkCode.parkCode,
        review: reviewText
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    })
  }


  return (
    <div className='review'>
      <form onSubmit={handlePostReview}>
        <textarea type="text" placeholder='Submit a Review...' onChange={event => setreviewText(event.target.value)} />
        <div>
          <Rating name="size-large" defaultValue={0} size="large" onChange={event => setstarRating(event.target.value)} />
        </div>
        <button className='submitButton'>Submit your review</button>
      </form>
      <div>
        {reviewList.map((reviewList, index) => {
          return (
            <div key={index}>
              <ul class="menu">
                <li><Rating name="size-large" readOnly={true} value={reviewList.rating} size="small" /></li>
                <li>{reviewList.review}</li>
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Review
