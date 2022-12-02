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
            const parkResponse = await fetch('http://localhost:8000/allparks');
            console.log(parkResponse)
            if (parkResponse.ok) {
                const data = await parkResponse.json()
                let tempParks = [];
                tempParks.push(data.data)
                setAllParks(tempParks);
                console.log("Parks loaded successfully")
            } else {
                console.log("Failed to load parks")
            }
        }
        async function getActivities() {
            const activityResponse = await fetch('http://localhost:8000/getactivities')
            if (activityResponse.ok) {
                const data = await activityResponse.json()
                let tempActivities = [];
                for (let i = 0; i < data.length; i++) {
                    tempActivities.push(data[i].name)
                }
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
    }

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
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
                            {/* <div className="form-check">
                                <input onChange={this.handleCheckbox} className="form-check-input" type="checkbox" value={this.state.waterfront} checked={this.state.waterfront} name="waterfront" id="waterfront" />
                                <label className="form-check-label" for="waterfront">Waterfront</label>
                            </div> */}
                            <button className="advancedSearchButton">Search</button>
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
