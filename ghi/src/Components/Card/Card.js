import React from 'react'
import './Card.css'



function Card({ src, title, description, latlong }) {
  return (
    <div className='card'>
      <img src={src} alt='' />
      <div className='card_info'>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <h4>{latlong}</h4>
      </div>
    </div>
  )
}

export default Card
