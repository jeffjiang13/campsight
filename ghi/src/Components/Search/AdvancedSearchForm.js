import { SettingsBackupRestoreTwoTone } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from "../Home/Home";

function AdvancedSearchForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [allParks, setAllParks] = useState();
    const [filteredParks, setFilteredParks] = useState();
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState([]);
    const [stateTerritory, setStateTerritory] = useState('');
    const [states, setStates] = useState([
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
            const parkResponse = await fetch('http://localhost:8000/allparks');
            console.log(parkResponse)
            if (parkResponse.ok) {
                const data = await parkResponse.json()
                console.log(data)
                let tempParks = [];
                tempParks.push(data.data)
                setAllParks(tempParks);
                console.log(allParks);
                console.log("Parks loaded successfully")
            } else {
                console.log("Failed to load parks")
            }
        }
        async function getActivities() {
            const activityResponse = await fetch('http://localhost:8000/getactivities')
            console.log(activityResponse)
            if (activityResponse.ok) {
                const data = await activityResponse.json()
                console.log(data[0].name)
                console.log(data.length)
                let tempActivities = [];
                for (let i = 0; i < data.length; i++) {
                    tempActivities.push(data[i].name)
                }
                console.log(tempActivities)
                setActivities(tempActivities);
                console.log("Activities loaded successfully")
            } else {
                console.log("Failed to load activities")
            }
        }
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
        }
        setFilteredParks(parks);
    }

    const handleStateTerritoryChange = (event) => {
        setStateTerritory(event.target.value);
        console.log(stateTerritory)
        console.log(activities)
    }

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
        console.log(activity);
        console.log(activities)
    }

    // handleCheckbox = (event) => {
    //     console.log(event.target.value);
    //     const value = event.target.checked;
    //     const name = event.target.name;
    //     this.setState({ [name]: value })
    //     console.log(this.state);
    // }

    const handleSubmit = (event) => {
        event.preventDefault();
        filterParks()
        setIsSubmitted(true);
        console.log(filteredParks);
    }

    if (!isSubmitted) {
        return (
            <div className="container">
                <div className="row">
                    <div className="">
                        <h1>Filter Search</h1>
                        <form onSubmit={handleSubmit} id="advanced-search-form">
                            <div className="mb-3">
                                <select onChange={handleStateTerritoryChange} name="state" id="state" className="form-select">
                                    <option value="">Choose a state</option>
                                    {states.map(state => {
                                        return (
                                            <option key={state} value={state}>{state}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select onChange={handleActivityChange} name="activity" id="activity" className="form-select">
                                    <option value="">Choose an activity</option>
                                    {activities.map(activity => {
                                        return (
                                            <option key={activity} value={activity}>{activity}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            {/* <div className="form-check">
                                <input onChange={this.handleCheckbox} className="form-check-input" type="checkbox" value={this.state.waterfront} checked={this.state.waterfront} name="waterfront" id="waterfront" />
                                <label className="form-check-label" for="waterfront">Waterfront</label>
                            </div> */}
                            <button className="btn btn-primary">Search</button>
                        </form>
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
