import React, { useState, useRef, useContext } from 'react'
import { Context } from "../Login/Context";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        state: "",
        profile_photo: "",
        profile_description: ""
    })
    const { userId } = useContext(Context)
    // List of US states for sign up form
    const USStates = useRef([
        { name: "Alabama", abb: "AL" }, { name: "Alaska", abb: "AK" }, { name: "Arizona", abb: "AZ" },
        { name: "Arkansas", abb: "AR" }, { name: "California", abb: "CA" }, { name: "Colorado", abb: "CO" }, { name: "Connecticut", abb: "CT" },
        { name: "Delaware", abb: "DE" }, { name: "District of Columbia", abb: "DC" }, { name: "Florida", abb: "FL" }, { name: "Georgia", abb: "GA" },
        { name: "Hawaii", abb: "HI" }, { name: "Idaho", abb: "ID" }, { name: "Illinois", abb: "IL" }, { name: "Indiana", abb: "IN" },
        { name: "Iowa", abb: "IA" }, { name: "Kansas", abb: "KS" }, { name: "Kentucky", abb: "KY" }, { name: "Louisiana", abb: "LA" },
        { name: "Maine", abb: "ME" }, { name: "Montana", abb: "MT" }, { name: "Nebraska", abb: "NE" }, { name: "Nevada", abb: "NV" },
        { name: "New Hampshire", abb: "NH" }, { name: "New Jersey", abb: "NJ" }, { name: "New Mexico", abb: "NM" }, { name: "New York", abb: "NY" },
        { name: "North Carolina", abb: "NC" }, { name: "North Dakota", abb: "ND" }, { name: "Ohio", abb: "OH" }, { name: "Oklahoma", abb: "OK" },
        { name: "Oregon", abb: "OR" }, { name: "Maryland", abb: "MD" }, { name: "Massachusetts", abb: "MA" }, { name: "Michigan", abb: "MI" },
        { name: "Minnesota", abb: "MN" }, { name: "Mississippi", abb: "MS" }, { name: "Missouri", abb: "MO" }, { name: "Pennsylvania", abb: "PA" },
        { name: "Rhode Island", abb: "RI" }, { name: "South Carolina", abb: "SC" }, { name: "South Dakota", abb: "SD" }, { name: "Tennessee", abb: "TN" },
        { name: "Texas", abb: "TX" }, { name: "Utah", abb: "UT" }, { name: "Vermont", abb: "VT" }, { name: "Virginia", abb: "VA" },
        { name: "Washington", abb: "WA" }, { name: "West Virginia", abb: "WV" }, { name: "Wisconsin", abb: "WI" }, { name: "Wyoming", abb: "WY" },
    ])

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log("that is the data", data)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let fetchData = { ...data }
        for (let key in fetchData) {
            if (fetchData[key] === "") {
                console.log(fetchData)
                delete fetchData[key]
            }
        }
        const url = `${process.env.REACT_APP_USERS}/users/${userId.id}/`;
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(fetchData),
        }
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            await response.json();
            console.log("good response", response)
            navigate(-1)
        }
    }

    return (
        <div className="container px-4 py-4 text-center">
            <div className="row gx-5">
                <div className="col">
                    <div className="card shadow">
                        <div className="card body px-4 py-4">
                            <div className='m-3'>
                                <h2 align="center">Edit Profile Page</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className='bt-3'>
                                    <div className="form-floating mb-2">
                                        <div className="row g-2">
                                            <div className="col md">
                                                <div className='form-floating mb-1'>
                                                    <input className="form-control"
                                                        type="text"
                                                        name="first_name"
                                                        value={data.first_name}
                                                        onChange={changeHandler}
                                                        placeholder="First Name"
                                                    />
                                                    <label htmlFor="floatingInputGrid">First Name</label>
                                                </div>
                                            </div>
                                            <div className="col md">
                                                <div className='form-floating mb-1'>
                                                    <input className="form-control"
                                                        type="text"
                                                        name="last_name"
                                                        value={data.last_name}
                                                        onChange={changeHandler}
                                                        placeholder="Last Name"
                                                    />
                                                    <label htmlFor="floatingInputGrid">Last Name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-2">
                                    <input className="form-control"
                                        type="text"
                                        value={data.profile_photo}
                                        name="profile_photo"
                                        onChange={changeHandler}
                                        placeholder="Enter URL"
                                    />
                                    <label htmlFor="floatingInputGrid">Profile Photo URL (limit 1000 characters)</label>
                                </div>
                                <div className="form-floating mb-2">
                                    <textarea className="form-control"
                                        value={data.profile_description}
                                        name="profile_description"
                                        onChange={changeHandler}
                                        placeholder="Enter Profile Description"
                                        rows="3"
                                    />
                                    <label htmlFor="floatingInputGrid">Profile Description</label>
                                </div>

                                <div className="form-floating mb-2">
                                    <input className="form-control"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={changeHandler}
                                        placeholder="Enter Email"
                                    />
                                    <label htmlFor="floatingInputGrid">Email address</label>
                                </div>

                                <div className="row g-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input className="form-control"
                                                type="text"
                                                name="city"
                                                value={data.city}
                                                onChange={changeHandler}
                                                placeholder="Enter City"
                                            />
                                            <label htmlFor="floatingInputGrid">City</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <select onChange={changeHandler} name="state" className="form-select">
                                                <option value="">Select State</option>
                                                {USStates.current.map(state => (
                                                    <option key={state.abb} value={state.abb}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="floatingSelectGrid">State</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='m-4'>
                                    <button

                                        type="submit"
                                        className="btn btn-dark rounded-pill">Edit Profile
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
