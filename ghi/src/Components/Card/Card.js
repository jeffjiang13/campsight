import React from 'react'
import './Card.css'

function Card({ src, title, description, latLong, contact, parkCode }) {
  const loc = `/Search/${parkCode}`
  return (
    <a href={loc}>
      <div className='card'>
        <img src={src} alt='' />
        <div className='card_info'>
          <h2>{title}</h2>
          <h4>{latLong}</h4>
          <h3>{description}</h3>
        </div>
      </div>
    </a>
  )
}

export default Card
