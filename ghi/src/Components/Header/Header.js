import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import LogoPNG from "./campSight.png";

function Header() {
  return (
    <div className="header">
      <img className="header_icon" src={LogoPNG} alt="" />

      <div className="header_center">
        <input type="text" />
        <SearchIcon />
      </div>

      <div className="header_right">
        <p>Advanced Search</p>
        <LanguageIcon />
        <ExpandMoreIcon />
        <Avatar />
      </div>
    </div>
  );
}

export default Header;
