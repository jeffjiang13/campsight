import React, { useEffect } from 'react'
import "./Modal.css";
import { Button } from "@mui/material";
import { HighlightOff } from "@mui/icons-material"

const Modal = ({ isOpen = false, setIsOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    } else {
      document.getElementsByTagName('body')[0].style.overflowY = 'scroll'
    }
  }, [isOpen]);


  return !isOpen ? <div className='modal-popup'>
    <Button onClick={() => setIsOpen(true)} variant='outlined'>Show Map</Button></div> : (
    <div className='overlay'>
      <div className='modalContainer'>
        <span className="ModalOpen" onClick={() => setIsOpen(!isOpen)}>
          <HighlightOff fontSize="large" />
        </span>
        {children}
      </div>
    </div>
  )
}

export default Modal;
