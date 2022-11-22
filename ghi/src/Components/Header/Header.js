
import Navbar from 'react-bootstrap/Navbar'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useToken } from '../Login/Authorization'
import { useNavigate } from 'react-router-dom'
import { Context } from "../Login/Context"
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import LogoPNG from "./campSight.png";
import Dropdown from 'react-bootstrap/Dropdown';



export function settingLinks() {
  const NAVLINK = process.env.REACT_APP_NAVLINK

  let home = ''
  let profile = ''
  let events = ''
  let activities = ''
  let signup = ''
  let login = ''
  let logout = ''
  let editProfile = ''

  if (NAVLINK !== undefined) {
    home = NAVLINK + "/"
    profile = NAVLINK + "/profile/"
    events = NAVLINK + "/events/"
    activities = NAVLINK + "/activities/"
    signup = NAVLINK + "/signup/"
    login = NAVLINK + "/login/"
    logout = NAVLINK + "/logout/"
    editProfile = NAVLINK + "/profile/edit/"
  } else {
    home = "/"
    profile = "/profile/"
    events = "/events/"
    activities = "/activities/"
    signup = "/signup/"
    login = "/login/"
    logout = "/logout/"
    editProfile = "/profile/edit/"
  }
  return ([home, profile, activities, events, signup, login, logout, editProfile])
}

function NavBar() {
  const [homeLink, , activitiesLink, eventsLink, signupLink, loginLink, , ,] = settingLinks()
  const [token, , logout] = useToken()
  const [, setLogoutResponse] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()
  const { userId } = useContext(Context)


  // useEffect(() => {
  //   const checkUserID = () => {
  //     if (userId.id) {
  //       setLoggedIn(true)
  //     } else {
  //       setLoggedIn(false)
  //     }
  //   }
  //   checkUserID()
  // }, [userId])


  // function checkLoggedIn(token) {
  //   if (token) {
  //     setLoggedIn(true)
  //   }
  // }


  // useEffect(() => { checkLoggedIn(token) }, [token])

  // async function onLogout() {
  //   const result = await logout()
  //   console.log("Logout result: ", result)
  //   if (await result) {
  //     setLoggedIn(false)
  //   }
  //   setLogoutResponse(result)
  //   console.log('LOGGED OUT SUCCESSFULLY')
  //   setLoggedIn(false)
  // }

  return (
    <div className="header">
      <Navbar.Brand href={homeLink}>
        <img className="header_icon" src={LogoPNG} alt="" />
      </Navbar.Brand>

      <div className="header_center">
        <input type="text" />
        <SearchIcon />
      </div>

      <div className="header_right">
        <p>Advanced Search</p>
        <LanguageIcon />
        <ExpandMoreIcon />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown" className="dropdown">
            <Avatar />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="dropdown-content">
              <Dropdown.Item onClick={() => { navigate(`/profile/${userId.id}`) }} className={"mx-1" + (loggedIn ? "" : " d-none")}> Profile </Dropdown.Item>
              <Dropdown.Item href={activitiesLink} className={"mx-1" + (loggedIn ? "" : " d-none")}> Activities </Dropdown.Item>
              <Dropdown.Item href={eventsLink} className={"mx-1" + (loggedIn ? "" : " d-none")}> Events </Dropdown.Item>
              <Dropdown.Item href={signupLink} className={"mx-1" + (loggedIn ? " d-none" : "")}> Sign Up </Dropdown.Item>
              <Dropdown.Item href={loginLink} className={"xy-1" + (loggedIn ? " d-none" : "")}> Login </Dropdown.Item>
              {/* <Dropdown.Item onClick={onLogout} className={"mx-1" + (loggedIn ? "" : " d-none")}> Logout </Dropdown.Item> */}
            </div>
          </Dropdown.Menu>
        </Dropdown>

      </div>
    </div>
  )
}

export default NavBar
