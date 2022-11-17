import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../Login/Context"

export default function Reviews(props) {
  const [reviewData, setReviewData] = useState({})
  const [newReview, setNewReview] = useState('')
  const { id } = useParams()
  const { userId } = useContext(Context)
  const { propUserId } = props
  const [ refresh, setRefresh ] = useState(false)


  useEffect(() => {
    const getReviewData = async () => {
      const url = `${process.env.REACT_APP_USERS}/users/profile/reviews/${id}/`
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json()
        setReviewData(await data.reviews)
        // setDeleted(false)
        setRefresh(false)
      }
    }
    getReviewData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setReviewData, userId, refresh])

  const changeHandler = e => {
    setNewReview(e.target.value);
  }

  async function handleSubmit() {

    const data = {
      user_id: userId.id,
      review: newReview,
      user_profile: id,
    }

    const url = `${process.env.REACT_APP_USERS}/users/reviews/`
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: "include",

    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {

      setNewReview('')
      setRefresh(true)
    }



  }

  async function deleteReview(reviewID) {
      const url = `${process.env.REACT_APP_USERS}/users/reviews/${reviewID}/`;
      const response = await fetch(url, {method : "DELETE"})
      if (response.ok){
        setRefresh(true)
      }
  }

  return (
    <>
      <div className='mt-5'>
        <h1>Reviews</h1>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="reviewTextBox">Leave a review!</label>
          <textarea className="form-control" id="reviewTextBox" rows="3" onChange={changeHandler} value={newReview}></textarea>
        </div>
        <div className='m-3'>
          <button type="button" className="btn btn-dark btn-lg rounded-pill" onClick={handleSubmit}>Post</button>
        </div>
      </form>

      <div className="container mt-3">
        <h3>View Your Reviews</h3>
        {reviewData.length > 0 ? (
          <table className="table">
            <tbody>
              {reviewData?.map(reviews => {
                return (
                  <tr key={reviews.id}>
                    <td>{reviews.review}</td>
                    <td>{new Date(reviews.time_posted).toLocaleString()}</td>
                    <td>- {reviews.reviewer.username}</td>
                    <td>
                    { parseInt(propUserId) === parseInt(userId.id) ?(
                      <button className="btn btn-warning rounded-pill" onClick = {()=>deleteReview(reviews.id)}>
                        delete review
                      </button>
                    ) : ""}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : ('')}
      </div>
    </>
  )
}
