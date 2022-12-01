import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from "../Home/Home";

function AdvancedSearchForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [parks, setParks] = useState();
    const [stateTerritory, setStateTerritory] = useState('');
    const [states, setStates] = useState([
        "AL",
        "AK",
        "AZ",
        "AR",
        "AS",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FL",
        "GA",
        "GU",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "MP",
        "OH",
        "OK",
        "OR",
        "PA",
        "PR",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "TT",
        "UT",
        "VT",
        "VA",
        "VI",
        "WA",
        "WV",
        "WI",
        "WY",
    ]);

    useEffect(() => {
        async function getAllParks() {
            const parkResponse = await fetch('http://localhost:8000/allparks');
            console.log(parkResponse)
            if (parkResponse.ok) {
                const data = await parkResponse.json()
                console.log(data.data)
                setParks(data.data);
                console.log(parks)
                console.log("Parks loaded successfully")
            } else {
                console.log("Failed to load parks")
            }
        }
        getAllParks()
    }, [parks])

    const handleStateTerritoryChange = (event) => {
        setStateTerritory(event.target.value);
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
        setIsSubmitted(true);
    }
    if (!isSubmitted) {
        return (
            <div className="container">
                <div className="row">
                    <div className="">
                        <h1>Filter Search</h1>
                        <form onSubmit={handleSubmit} id="advanced-search-form">
                            {/* <div className="">
                                <input value={this.state.pname} onChange={this.handleChange} placeholder="Search by park name" type="text" name="pname" id="pname" className="form-control" />
                                <label htmlFor="pname">Park Name</label>
                            </div> */}
                            <div className="mb-3">
                                <select onChange={handleStateTerritoryChange} required name="state" id="state" className="form-select">
                                    <option value="">Choose a state</option>
                                    {states.map(state => {
                                        return (
                                            <option key={state} value={state}>{state}</option>
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
            <Home parks={parks} />
        )
    }
};

export default AdvancedSearchForm;
