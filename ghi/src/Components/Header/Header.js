import { useState } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import LogoPNG from "./campSight.png";
import { useLogOutMutation, useGetTokenQuery } from "../../app/api";

const NavBar = () => {
  const { data: token } = useGetTokenQuery();
  const [logOut] = useLogOutMutation();

  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => {
    setDropdown(boolean => !boolean);
  }

  return (
    <header>
      <nav>
        <div className="logo-container">
          <a href="/">
            <img src={LogoPNG} alt="Camp Sight Logo" title="Camp Sight" />
          </a>
        </div>
        <div className="header_center">
          <input type="text" />
          <SearchIcon />
        </div>
        <div className="header_right">
          <div className="advanced-src-wrapper">
            <a href="/advancedsearch">
              <p className='advancedSearchBtn'>Advanced Search</p>
            </a>
          </div>
          <div className="language-select">
            <LanguageIcon />
            <ExpandMoreIcon />
          </div>
          <div className="dropdown-wrapper">
            <Avatar className="avatar" onClick={handleClick} />
            {dropdown &&
              <div className="dropdown-options">
                {token ? <Link to='/profile/:id' > Profile </Link> : null}
                {token ? <Link to="/events" > Events </Link> : null}
                {token ? null : <Link to="/signup" > Sign Up </Link>}
                {token ? <a onClick={logOut} href="/"> Log Out </a> : <Link to="/login" > Login </Link>}
              </div>}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
