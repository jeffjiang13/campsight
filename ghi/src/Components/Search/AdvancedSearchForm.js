import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import { isPointWithinRadius } from "geolib";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function AdvancedSearchForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [allParks, setAllParks] = useState();
    const [filteredParks, setFilteredParks] = useState();
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState([]);
    const [stateTerritory, setStateTerritory] = useState('');
    const [userLocation, setUserLocation] = useState({ lat: 37.0902, lng: -95.7129 });
    const [radius, setRadius] = useState(0);
    const [designation, setDesignation] = useState('');
    const [designations] = useState([
        "National Park",
        "National Monument",
        "National Monument & Preserve",
        "National Historical Park",
        "National Historic Trail",
        "National Historic Area",
        "National Historic Site",
        "National Battlefield",
        "National Military Park",
        "National Recreation Area",
        "National River",
        "National River & Recreation Area",
        "National Reserve",
        "National Preserve",
        "National Lakeshore",
        "National Seashore",
        "National Scenic Trail",
        "National Scenic River",
        "Park",
        "Wild River",
    ]);
    const [states] = useState([
        "AL", "AK", "AZ", "AR", "AS",
        "CA", "CO", "CT", "DE", "DC",
        "FL", "GA", "GU", "HI", "ID",
        "IL", "IN", "IA", "KS", "KY",
        "LA", "ME", "MD", "MA", "MI",
        "MN", "MS", "MO", "MT", "NE",
        "NV", "NH", "NJ", "NM", "NY",
        "NC", "ND", "MP", "OH", "OK",
        "OR", "PA", "PR", "RI", "SC",
        "SD", "TN", "TX", "TT", "UT",
        "VT", "VA", "VI", "WA", "WV",
        "WI", "WY",
    ]);

    useEffect(() => {
        async function getAllParks() {
            const parkResponse = await fetch(`${process.env.REACT_APP_PARKS_API_HOST}/allparks`);
            if (parkResponse.ok) {
                const data = await parkResponse.json()
                let tempParks = [];
                tempParks.push(data.data);
                setAllParks(tempParks);
            }
        }
        async function getActivities() {
            const activityResponse = await fetch(`${process.env.REACT_APP_PARKS_API_HOST}/getactivities`)
            if (activityResponse.ok) {
                const data = await activityResponse.json()
                let tempActivities = [];
                for (let i = 0; i < data.length; i++) {
                    tempActivities.push(data[i].name)
                }
                setActivities(tempActivities);
            }
        }
        window.navigator.geolocation.getCurrentPosition(location => {
            setUserLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
        })
        getAllParks()
        getActivities()
    }, [])

    function checkActivities(activities, activity) {
        for (let i = 0; i < activities.length; i++) {
            if (activities[i].name === activity) {
                return true;
            }
        }
        return false;
    }

    async function filterParks() {
        let parks = allParks[0]
        if (stateTerritory !== '') {
            parks = parks.filter(park => park.states === stateTerritory);
        } if (activity !== '') {
            parks = parks.filter(park => checkActivities(park.activities, activity))
        } if (designation !== '') {
            parks = parks.filter(park => park.designation === designation)
        } if (radius !== 0) {
            const latLongRadius = radius * 1609.34;
            parks = parks.filter(park => isPointWithinRadius(
                { lat: park.latitude, lng: park.longitude },
                userLocation,
                latLongRadius,
            ))
        }
        setFilteredParks(parks);
    }

    function CircularIndeterminate() {
        return (
            <Box className={{ display: 'flex' }}>
                <CircularProgress className="loadingAnimation" />
            </Box>
        );
    }

    const handleStateTerritoryChange = (event) => {
        setStateTerritory(event.target.value);
    }

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
    }

    const handleDesignationChange = (event) => {
        setDesignation(event.target.value);
    }

    const handleRadiusChange = (event) => {
        setRadius(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        filterParks()
        setIsSubmitted(true);
    }

    if (!isSubmitted) {
        return (
            <div className="advanceSearch">
                <div className="row">
                    <div className="filterSearchTitle">
                        <h1>Filter Search</h1>
                        {!allParks
                            ? <CircularIndeterminate />
                            : <form onSubmit={handleSubmit} id="advanced-search-form">
                                <div>
                                    <select onChange={handleStateTerritoryChange} name="state" id="state" className="form-select">
                                        <option value="">Choose a state</option>
                                        {states.map(state => {
                                            return (
                                                <option key={state} value={state}>{state}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <select onChange={handleActivityChange} name="activity" id="activity" className="form-select">
                                        <option value="">Choose an activity</option>
                                        {activities.map(activity => {
                                            return (
                                                <option key={activity} value={activity}>{activity}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <select onChange={handleDesignationChange} name="designation" id="designation" className="form-select">
                                        <option value="">Choose an NPS location type</option>
                                        {designations.map(designation => {
                                            return (
                                                <option key={designation} value={designation}>{designation}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="searchRadius">
                                    <input value={radius} onChange={handleRadiusChange} placeholder="Distance is in miles" type="" name="radius" id="radius" className="form-control" />
                                    <label htmlFor="last_name"><p>Search Radius (In Miles)</p></label>
                                </div>
                                <button className="filterBtn">Search</button>
                            </form>
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <Home parks={filteredParks} />
        )
    }
};

export default AdvancedSearchForm;
