import { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import Reviews from "../Activities/Reviews"
import { Context } from "../Login/Context"
import { settingLinks } from "../Header/Header"
import { remove_activity } from "../Activities/RemoveActivity"

export default function UserProfile() {
    const [userData, setUserData] = useState({})
    const [usersData, setUsersData] = useState({})
    const [events, setEvents] = useState([])
    const [friendRequestIds, setFriendRequestIds] = useState([])
    const [requestHandled, setRequestHandled] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { userId } = useContext(Context)
    const [, , , , , , , , , editProfileLink] = settingLinks()
    const [friend, setFriend] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/${id}`

            const response = await fetch(url, { credentials: "include" })
            if (response.ok) {
                const data = await response.json()
                setUserData(data)
                if (userId !== undefined) {
                    let friends = []
                    for (let friendKey in userId.friends) {
                        friends.push(userId.friends[friendKey].id)
                    }

                    if (friends.includes(data.id)) {
                        setFriend(true)
                    } else if (data.friend_requests.includes(userId.id)) {
                        setFriend("sent")
                    } else {
                        setFriend(false)
                    }
                }
                setUserData(await data)
                setFriendRequestIds(await data["friend_requests"])
            } else {
                navigate("/404")
            }
        }
        const requestEvents = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                events.current = data.Events
                setEvents(events.current)
            }
        }




        requestEvents()

        const requestUsers = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setUsersData(await data)
            }
        }
        getUserdata()
        requestEvents()
        requestUsers()
        setRefresh()


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, requestHandled, userId, refresh])

    let currentUser = userData.id
    let attendedEvents = []
    for (let evt of events) {
        let evtAtt = evt.attendees
        for (let x of evtAtt) {
            if (x.id === currentUser) {
                attendedEvents.push(evt)
            }
        }
    }

    const currentEvents = []
    for (let event of attendedEvents) {
        const endDate = new Date(event.end)
        const currentDate = new Date()
        if (currentDate < endDate) {
            currentEvents.push(event)
        }
    }

    let slicedlist = currentEvents.slice(0, 3)

    const usersEventsPassed = []
    for (let event of attendedEvents) {
        const endDate = new Date(event.end)
        const currentDate = new Date()
        if (currentDate > endDate) {
            usersEventsPassed.push(event)
        }
    }

    async function onClick() {

        const url = `${process.env.REACT_APP_USERS}/users/requests/add/${userData.id}/`;
        const params = {
            method: "put",
            credentials: "include",
        };
        const response = await fetch(url, params);
        if (response.status === 200) {
            setFriend("sent")
        }
    }


    let requests = []
    if (friendRequestIds.length !== 0 && usersData.length !== 0) {
        for (let requestId of friendRequestIds) {
            for (let user of usersData["users"]) {
                if (requestId === user["id"]) {
                    requests.push(user)
                }
            }
        }
    }

    async function handleAccept(pk) {
        const url = `${process.env.REACT_APP_USERS}/users/requests/approve/${pk}/`
        const response = await fetch(url, {
            method: "put",
            credentials: "include",
        })

        if (response.ok) {
            setRequestHandled(!requestHandled)
        }
    }

    async function handleReject(pk) {
        const url = `${process.env.REACT_APP_USERS}/users/requests/reject/${pk}/`
        const response = await fetch(url, {
            method: "put",
            credentials: "include",
        })

        if (response.ok) {
            setRequestHandled(!requestHandled)
        }
    }

    return (
        <>
            <div className="login2">
                <h1>{userData.username}</h1>
                {parseInt(userId.id) === parseInt(id) ? (
                    <div><a className="btn btn-dark rounded-pill mb-3" href={`${editProfileLink}${userId.id}`} role="button">Edit Profile</a></div>)
                    : (friend === false ? (
                        <button
                            type="button"
                            className="btn btn-dark rounded-pill"
                            onClick={() => {
                                onClick();
                            }}
                        >
                            {" "}
                            Add to Friend's List{" "}
                        </button>
                    ) : (friend === "sent" ? "Friend request sent" : "is your friend"))}

                <div className="col">
                    <div className='mb-3 text-center'>
                        <img src={userData?.profile_photo || "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"} height='200' alt="" />
                    </div>
                    <div className='m-1 text-center'>
                        <h4>Name: </h4>
                        <p>{userData.first_name} {userData.last_name}</p>
                        <h4>About Me: </h4>
                        <p>{userData.profile_description}</p>
                        <h4>Location</h4>
                        <p>{userData.city}, {userData.state}</p>
                    </div>
                </div>

                <div className="col">

                    <h4>Favorite Activities</h4>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                    Expand
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse"
                                aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="col">
                                        <div className="table ">
                                            <div className="tbody">
                                                {userData?.favorite_activities?.map(activity => (
                                                    <div className="tr" key={activity.id}>
                                                        <div className="td">
                                                            {activity.name}
                                                        </div>
                                                        <div className="button-table-right">
                                                            {parseInt(userId.id) === parseInt(id) ?
                                                                <button className="btn-dark  rounded-pill button-right" onClick={(e) => { remove_activity(userData.id, activity); setRefresh(true) }}>
                                                                    delete
                                                                </button>

                                                                : null}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <h4>Friends List</h4>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                            aria-expanded="true" aria-controls="collapseTwo">
                                            Expand
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo" >
                                        <div className="accordion-body">
                                            <div className="col">
                                                <table className="table">
                                                    <tbody>
                                                        {userData?.friends?.map(friend => (
                                                            <tr key={"Friend" + friend.id}>
                                                                <td className="pointer"
                                                                    onClick={() => {
                                                                        navigate(`/profile/${friend.id}/`)
                                                                    }}>
                                                                    {friend.username}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* eslint-disable-next-line */}
                        {userId.id == id ? (
                            <div className='mt-5'>
                                <h4>Friend Requests</h4>
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button className="accordion-button" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                aria-expanded="true" aria-controls="collapseThree">
                                                Expand
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse"
                                            aria-labelledby="headingThree" >
                                            <div className="accordion-body">
                                                <div className="col">
                                                    <table className="table">
                                                        <tbody>
                                                            {requests.map(friendRequest => (
                                                                <tr key={friendRequest.id}>
                                                                    <td>
                                                                        {friendRequest.username} ({friendRequest.first_name} {friendRequest.last_name})
                                                                    </td>
                                                                    <td className="pointer" onClick={() => handleAccept(friendRequest.id)}>
                                                                        Accept
                                                                    </td>
                                                                    <td className="pointer" onClick={() => handleReject(friendRequest.id)}>
                                                                        Reject
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ""}
                    </div>
                </div>


                <div className="col-sm text-center padding-top-med">
                    <h4>Current RSVP'd Events</h4>
                    <table className="table">
                        <tbody>

                            {slicedlist.length > 0 ? slicedlist.map(evt => (
                                <tr key={evt.id}>
                                    <td className="pointer"
                                        onClick={() => {
                                            navigate(`/events/${evt.id}/`)
                                        }}>
                                        {evt.name}
                                    </td>
                                    <td className="pointer"
                                        onClick={() => {
                                            navigate(`/events/${evt.id}/`)
                                        }}>
                                        <img className="tiny-card" src={evt.picture_url} alt="" >
                                        </img>
                                    </td>
                                </tr>
                            )) : <tr className="pointer"
                                onClick={() => {
                                    navigate(`/events/`)
                                }}>
                                No Current Events! CLICK to jump to Events!
                            </tr>}


                        </tbody>
                    </table>
                    <h4 className="padding-top-med">Past Events I've Attended</h4>
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingFour">
                                <button className="accordion-button" type="button"
                                    data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                    aria-expanded="true" aria-controls="collapseFour">
                                    expand
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse"
                                aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="col">
                                        <table className="table">
                                            <tbody>

                                                {usersEventsPassed.length > 0 ? usersEventsPassed.map(evt => (
                                                    <tr key={evt.id}>
                                                        <td className="pointer"
                                                            onClick={() => {
                                                                navigate(`/events/${evt.id}/`)
                                                            }}>
                                                            {evt.name}
                                                        </td>
                                                        <td className="pointer"
                                                            onClick={() => {
                                                                navigate(`/events/${evt.id}/`)
                                                            }}>
                                                        </td>
                                                    </tr>
                                                )) : <tr className="pointer"
                                                    onClick={() => {
                                                        navigate(`/events/`)
                                                    }}>
                                                    No Past Events! CLICK to jump to Events!
                                                </tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="container">
                        <div className="row">
                            <Reviews propUserId={id} />
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}
