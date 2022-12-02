
import Navbar from 'react-bootstrap/Navbar'
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import LogoPNG from "./campSight.png";
import Dropdown from 'react-bootstrap/Dropdown';
import { useLogOutMutation, useGetTokenQuery } from "../../app/api";




function NavBar() {
  const { data: token } = useGetTokenQuery();
  const [logOut] = useLogOutMutation();





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
        <p>Advanced Search</p>
        <LanguageIcon />
        <ExpandMoreIcon />
        <Dropdown>
          <Dropdown.Toggle id="dropdown">
            <Avatar />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="dropdown-content">
              <Dropdown.Item href='/profile/:id' > Profile </Dropdown.Item>
              <Dropdown.Item href="/activities" > Activities </Dropdown.Item>
              <Dropdown.Item href="/events" > Events </Dropdown.Item>
              {token ? <Dropdown.Item onClick={logOut} > Log Out </Dropdown.Item> : <Dropdown.Item href="/login" > Login </Dropdown.Item>}
              {token ? null : <Dropdown.Item href="/signup" > Sign Up </Dropdown.Item>}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  )
}

export default NavBar
