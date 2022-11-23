import { useEffect, useState } from "react"
import { CreateActivity } from "./CreateActivity"

export default function Activities() {

    const [activities, setActivitiesData] = useState([])
    const [userData, setUserId] = useState("")
    const [activityList, setActivityList] = useState([])
    const [search, setSearch] = useState('')
    const [filteredActivities, setFilteredActivities] = useState([])

    useEffect(() => {

        const getActivityData = async () => {
            const url = `${process.env.REACT_APP_EVENTS}/events/activities/`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setActivitiesData(data["Activities"])
            }
        }
        const getUserdata = async () => {
            const url = `${process.env.REACT_APP_USERS}/users/api/tokens/user/`
            const response = await fetch(url, { credentials: "include" })
            if (response.ok) {
                const userData = await response.json()
                setUserId(await userData)
                setActivityList(await userData.favorite_activities)
            } else {
                console.log("getUserData failed")
            }
        }
        getUserdata()
        getActivityData()

    }, [])


    function clickHandler(event, activity) {
        CreateActivity(userData.id, activity)
        setActivityList([...activityList, activity])
    }

    function searchFilter() {
        const searchedActivities = activities.filter(activity => activity.name.toLowerCase().includes(search.toLowerCase()))
        setFilteredActivities(searchedActivities)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { searchFilter() }, [search])

    function handleChange(event) {
        setSearch(event.target.value)
    }

    const userFavesIds = activityList.map(act => act.id)
    const activityState = filteredActivities.length < 1
        ? activities
        : filteredActivities;

    return (
        <main className="login1">
            <div className="m-3">
                <h1>Activities</h1>
                <h4>Click card to add to your favorite activities list!</h4>
                <button className="btn btn-dark rounded-pill" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">See Favorited Activities
                </button>
                <div className="offcanvas offcanvas-bottom border background-opacity" data-bs-scroll="true" tabIndex="-1" id="offcanvasBottom"
                    aria-labelledby="offcanvasBottomLabel">
                    <div className="offcanvas-header box_bg center">
                        <h5 className="offcanvas-title " id="offcanvasBottomLabel">Your Favorite Activities</h5>
                    </div>
                    <div className="offcanvas-body large ">
                        {activityList?.slice(0).reverse().map(act => {
                            return (
                                <ul className="activeList" key={act.id}>
                                    <li className="item">
                                        {act.name}
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div>
                <input
                    type="search"
                    id="search"
                    className="form-control"
                    placeholder="Search for Activities"
                    onChange={handleChange}
                    aria-label="Search"
                />
            </div>
            <div className="m-3">
                <div className="row ">
                    {activityState.filter(act => !userFavesIds.includes(act.id))
                        .map(activity => {
                            return (
                                <div className="col-sm-4 padding_bottom" key={activity.id}>
                                    <div className="card mb-3 shadow h-100 pointer ">
                                        <div onClick={(e) => {
                                            clickHandler(e, activity)
                                        }}>
                                            <img src={activity.picture_url} className="card-img-top crop-image" alt="" />
                                            <div className="card-body">
                                                <h5 className="card-title center_card_text">{activity.name}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </main>
    )
}
