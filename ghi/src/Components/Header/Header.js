
import Navbar from 'react-bootstrap/Navbar'
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import LogoPNG from "./campSight.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { useLogOutMutation, useGetTokenQuery } from "../../app/api";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { data: token } = useGetTokenQuery();
  const [logOut] = useLogOutMutation();
  const navigate = useNavigate();
  function handleLogout() {
    logOut();
    navigate("/");
  }
  return (
    <header>
      <Navbar.Brand href="/">
        <img className="header_icon" src={LogoPNG} alt="" />
      </Navbar.Brand>
      <div className="header_center">
        <input type="text" />
        <SearchIcon />
      </div>
      <div className="header_right">
        <Navbar.Brand href="/advancedsearch">
          <p className='advancedSearchBtn'>Advanced Search</p>
        </Navbar.Brand>
        <LanguageIcon />
        <ExpandMoreIcon />
        <Dropdown>
          <Dropdown.Toggle id="dropdown">
            <Avatar className='avatar' />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="dropdown-content">
              {token ? <Dropdown.Item href='/profile' > Profile </Dropdown.Item> : null}
              {token ? <Dropdown.Item href="/events" > Events </Dropdown.Item> : null}
              {token ? null : <Dropdown.Item href="/signup" > Sign-Up </Dropdown.Item>}
              {token ? <Dropdown.Item onClick={handleLogout} > Log Out </Dropdown.Item> : <Dropdown.Item href="/login" > Login </Dropdown.Item>}

            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  )
}

export default NavBar
