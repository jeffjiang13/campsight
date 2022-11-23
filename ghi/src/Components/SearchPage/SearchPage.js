import React from 'react'
import './SearchPage.css'
import { Button } from '@mui/material'
import SearchResult from '../SearchResult/SearchResult';
import Map from '../Map/Map';
import { states } from '../Search/Search.js'
import { parkCode } from '../Search/Search.js'

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: []
    };
  }

  async componentDidMount() {
    const states = 'tx'
    const parkCode = 'bibe'
    const detailResponse = await fetch(`http://localhost:8000/detailtest?states=${states}&parkCode=${parkCode}`)
    if (detailResponse.ok) {
      const data = await detailResponse.json();
      console.log(data)
      this.setState({ details: data.data });
    }
  };


  render() {
    return (
      <>
        <div className="searchPage">
          {this.state.details.map((details, index) => {
            return (
              < SearchResult key={index}
                img={details.images[2].url}
                location={details.states}
                title={details.fullName}
                description={details.description}
                rating={4.95}
                other={details.weatherInfo}
              />)
          })}
          <Map />
        </div>
      </>
    );
  }
}

export default SearchPage
