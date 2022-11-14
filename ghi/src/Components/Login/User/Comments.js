import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../UserContext"

export default function Comments(props) {
  const [commentData, setCommentData] = useState({})
  const [newComment, setNewComment] = useState('')
  const { id } = useParams()
  const { userId } = useContext(UserContext)
  // const [ deletedComment, setDeleted ] = useState(false)
  const { propUserId } = props
  const [ refresh, setRefresh ] = useState(false)


  useEffect(() => {
    // console.log("Loop watcher")
    const getCommentData = async () => {
      const url = `${process.env.REACT_APP_USERS}/users/profile/comments/${id}/`
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json()
        setCommentData(await data.comments)
        // setDeleted(false)
        setRefresh(false)
      }
    }
    getCommentData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setCommentData, userId, refresh])
  // }, [id, setCommentData, deletedComment, userId, refresh])
  // }, [id, setCommentData, newComment, deletedComment, userId])

  const changeHandler = e => {
    setNewComment(e.target.value);
  }

  async function handleSubmit() {

    const data = {
      user_id: userId.id,
      comment: newComment,
      user_profile: id,
    }
    // console.log(data)
    const url = `${process.env.REACT_APP_USERS}/users/comments/`
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: "include",
      // headers: {
      //   'Content-Type': 'application/json'
      // },
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      // const comment = await response.json()
      // console.log(comment)
      setNewComment('')
      setRefresh(true)
    }


    // const response = await fetch(url, params);
    // if (response.status === 200) {
    //   console.log("Friend added")
    //   setFriend(true)
    // }}

  }

   // this function is for deleting comments on your page
  async function deleteComment(commentID) {
      const url = `${process.env.REACT_APP_USERS}/users/comments/${commentID}/`;
      const response = await fetch(url, {method : "DELETE"})
      if (response.ok){
        setRefresh(true)
      }
  }

  return (
    <>
      <div className='mt-5'>
        <h1>Comments</h1>
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="commentTextBox">Leave a comment for me!</label>
          <textarea className="form-control" id="commentTextBox" rows="3" onChange={changeHandler} value={newComment}></textarea>
        </div>
        <div className='m-3'>
          <button type="button" className="btn btn-dark btn-lg rounded-pill" onClick={handleSubmit}>Post</button>
        </div>
      </form>

      <div className="container mt-3">
        <h3>View Your Comments</h3>
        {commentData.length > 0 ? (
          <table className="table">
            <tbody>
              {commentData?.map(comments => {
                return (
                  <tr key={comments.id}>
                    <td>{comments.comment}</td>
                    <td>{new Date(comments.time_posted).toLocaleString()}</td>
                    <td>- {comments.commenter.username}</td>
                    <td>
                    { parseInt(propUserId) === parseInt(userId.id) ?(
                      <button className="btn btn-warning rounded-pill" onClick = {()=>deleteComment(comments.id)}>
                        delete comment
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
