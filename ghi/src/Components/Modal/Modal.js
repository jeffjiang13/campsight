import React, { useState } from 'react'
import "./Modal.css";
import { Button } from "@mui/material";
// import HighlightOffIcon from "@mui/icons-material/HighlightOffIcon"

const Modal = ({ isOpen = false, setIsOpen, children }) => {

  return !isOpen ? <div className='modal-popup'>
    <Button onClick={() => setIsOpen(true)} variant='outlined'>Show Map</Button></div> : (
    <div className='overlay'>
      <div className='modalContainer'>
        <span onClick={() => setIsOpen(!isOpen)}>x</span>
        {children}
      </div>
    </div>
  )
}

export default Modal;
