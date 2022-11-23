import React, { useState, useRef } from 'react'
import { useToken } from './Authorization'


export default function Signup() {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        state: "",
    })

    const [signupTest, setSignupTest] = useState(true)
    const { username, password, first_name, last_name, email, city } = userData

    // eslint-disable-next-line no-unused-vars
    const [token, login, logout, signup] = useToken()

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
        setUserData({ ...userData, [e.target.name]: [e.target.value] });
    }
    console.log(userData)


    const submitHandler = e => {
        e.preventDefault()

        async function signupWithTest() {
            let test = await signup(
                userData.username[0],
                userData.password[0],
                userData.email[0],
                userData.first_name[0],
                userData.last_name[0],
                userData.city[0],
                userData.state[0],
            )

            if (test === false) {
                setSignupTest(false)
            } else {
                setSignupTest(true)
            }
        }
        signupWithTest()
    }


    let SignupFailed = function Waiting() {
        return (
            <div>
            </div>
        )
    }

    if (signupTest === false) {
        SignupFailed = function Failed() {
            return (
                <div className="alert alert-danger" role="alert">
                    Username Is taken. Please try again.
                </div>
            )
        }
    }


    return (
        <div className="login">
            <form onSubmit={submitHandler}>
                <h2>Sign Up</h2>
                <div className='bt-3'>
                    <SignupFailed />
                    <div className="form-floating mb-2">
                        <div className="row g-2">
                            <div className="col md">
                                <div className='form-floating mb-1'>
                                    <input className="form-control"
                                        type="text"
                                        name="first_name"
                                        value={first_name}
                                        onChange={changeHandler}
                                        placeholder="First Name"
                                        required
                                    />
                                    <label htmlFor="floatingInputGrid">First Name</label>
                                </div>
                            </div>
                            <div className="col md">
                                <div className='form-floating mb-1'>
                                    <input className="form-control"
                                        type="text"
                                        name="last_name"
                                        value={last_name}
                                        onChange={changeHandler}
                                        placeholder="Last Name"
                                        required
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
                        value={username}
                        name="username"
                        onChange={changeHandler}
                        placeholder="Enter Username"
                        required
                    />
                    <label htmlFor="floatingInputGrid">Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input className="form-control"
                        type="password"
                        value={password}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        required
                    />
                    <label htmlFor="floatingInputGrid">Password</label>
                </div>
                <div className="form-floating mb-2">
                    <input className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        onChange={changeHandler}
                        placeholder="Enter Email"
                        required
                    />
                    <label htmlFor="floatingInputGrid">Email address</label>
                </div>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input className="form-control"
                                type="text"
                                name="city"
                                value={city}
                                onChange={changeHandler}
                                placeholder="Enter City"
                                required
                            />
                            <label htmlFor="floatingInputGrid">City</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <select name="state" className="form-select" onChange={changeHandler}>
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
                        className="btn btn-dark btn-lg  rounded-pill">Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already Have Account? <a href={`Login`}>Log In</a>
                </p>
            </form>
        </div>

    );
}
