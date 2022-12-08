import React from 'react'
import "./Review.css"

function Review() {
  return (
    <div className='review'>
      <form>
        <textarea type="text" placeholder='Submit a Review...' />
        <button className='submitButton'>Submit a review</button>
      </form>
    </div>
  )
}

export default Review
