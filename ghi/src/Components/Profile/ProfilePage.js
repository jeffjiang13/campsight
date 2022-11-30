import { useEffect, useState, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import Reviews from "../Activities/Reviews"
import { settingLinks } from "../Header/Header"
import { remove_activity } from "../Activities/RemoveActivity"
import { useLogOutMutation } from "../../app/api";

export default function UserProfile() {
    const navigate = useNavigate();
    const [logOut] = useLogOutMutation();


    const signOut = () => {
        logOut()
        navigate("/");
    };

    return (
        <>
            <div style={{ marginTop: 20, minHeight: 700 }}>
                <h1>Profile page</h1>
                <p>Hello there, welcome to your profile page</p>

                <button onClick={signOut}>Log Out</button>
            </div>
        </>
    );
}
