import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

function Card({ src, title, description, latLong, parkCode }) {
  const loc = `/Search/${parkCode}`
  const windowLocation = window.location.pathname === '/'
    || window.location.pathname === '/advancedsearch'
    || window.location.pathname === '/project-gamma/'
    || window.location.pathname === '/project-gamma/advancedsearch'
    || window.location.pathname === '/project-gamma';

  return windowLocation ? (
    <Link to={loc}>
      <div className='card'>
        <img src={src} alt={title} title={title} />
        <div className='card_info'>
          <h2>{title}</h2>
          <h4>{latLong}</h4>
          <h3>{description}</h3>
        </div>
      </div>
    </Link>
  ) : (
    <div className='card_info'>
      <h2>{title}</h2>
      <h3>{description}</h3>
    </div>
  )
}

export default Card
