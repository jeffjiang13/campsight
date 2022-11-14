
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useToken } from '../Login/Authorization'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../Login/UserContext"
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import LogoPNG from "./campSight.png";
import Dropdown from 'react-bootstrap/Dropdown';

export function settingLinks() {
  const NAVLINK = process.env.REACT_APP_NAVLINK

  // declare link variables here
  let home = ''
  let intro = ''
  let profile = ''
  let events = ''
  let activities = ''
  let kindler = ''
  let signup = ''
  let login = ''
  let logout = ''
  let editProfile = ''
  let searchProfile = ''

  if (NAVLINK !== undefined) {
    // add a link variable = NAVLINK + current href
    home = NAVLINK + "/"
    intro = NAVLINK + "/intro/"
    profile = NAVLINK + "/profile/"
    events = NAVLINK + "/events/"
    activities = NAVLINK + "/activities/"
    kindler = NAVLINK + "/kindler/"
    signup = NAVLINK + "/signup/"
    login = NAVLINK + "/login/"
    logout = NAVLINK + "/logout/"
    editProfile = NAVLINK + "/profile/edit/"
    searchProfile = NAVLINK + "/search/"
  } else {
    // add a link variable = current href
    home = "/"
    intro = "/intro/"
    profile = "/profile/"
    events = "/events/"
    activities = "/activities/"
    kindler = "/kindler/"
    signup = "/signup/"
    login = "/login/"
    logout = "/logout/"
    editProfile = "/profile/edit/"
    searchProfile = "/search/"
  }
  // add link variable to return array
  return ([home, intro, profile,  activities, events, kindler, signup, login, logout, editProfile, searchProfile])
}

function NavBar() {
  const [homeLink, introLink, , activitiesLink, eventsLink, kindlerLink, signupLink, loginLink, , , searchLink] = settingLinks()
  const [token, , logout] = useToken()
  const [ , setLogoutResponse] = useState()
  const [loggedIn, setLoggedIn]=useState(false)
  const navigate = useNavigate()
  const {userId} = useContext(UserContext)


  useEffect( () => {
    const checkUserID = () => {
      if (userId.id){
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }
    checkUserID()
  },[userId])


  function checkLoggedIn(token){
    if (token){
        setLoggedIn(true)
    }
  }


  useEffect( ()=>{checkLoggedIn(token)},[token])

  async function onLogout() {
    const result = await logout()
    console.log("Logout result: ", result)
    if (await result){
      setLoggedIn(false)
    }
    setLogoutResponse(result)
    console.log('LOGGED OUT SUCCESSFULLY')
    setLoggedIn(false)
  }

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
            <div class="dropdown-content">
              <Dropdown.Item href={introLink} className={"mx-1" + (loggedIn ? "":" d-none")}> New Here? </Dropdown.Item>
              <Dropdown.Item onClick={() => { navigate(`/profile/${userId.id}`)}} className={"mx-1" + (loggedIn ? "":" d-none")}> Profile </Dropdown.Item>
              <Dropdown.Item href={activitiesLink} className={"mx-1" + (loggedIn ? "":" d-none")}> Activities </Dropdown.Item>
              <Dropdown.Item href={eventsLink} className={"mx-1" + (loggedIn ? "":" d-none")}> Events </Dropdown.Item>
              <Dropdown.Item href={signupLink} className={"mx-1" + (loggedIn ? " d-none":"")}> Sign Up </Dropdown.Item>
              <Dropdown.Item href={loginLink} className={"xy-1" + (loggedIn ? " d-none":"") }> Login </Dropdown.Item>
              <Dropdown.Item href={searchLink} className={"mx-1" + (loggedIn ? "":" d-none")}> Search </Dropdown.Item>
              <Dropdown.Item onClick={onLogout} className={"mx-1" + (loggedIn ? "":" d-none")}> Logout </Dropdown.Item>
            </div>
          </Dropdown.Menu>
      </Dropdown>

    </div>
    </div>
  )
}

export default NavBar
