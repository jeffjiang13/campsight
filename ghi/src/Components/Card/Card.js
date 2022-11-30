import React from 'react'
import './Card.css'

function Card({ src, title, description, latLong, contact }) {
  return (
    <a href='/search'>
    <div className='card'>
      <img src={src} alt='' />
      <div className='card_info'>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <h4>{contact}</h4>
        <h4>{latLong}</h4>
      </div>
    </div>
    </a>
  )
}

export default Card
