import React from 'react'
import './SearchPage.css'
import { Button } from '@mui/material'
import SearchResult from '../SearchResult/SearchResult';
import Map from '../Map/Map';

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: []
    };
  }

  async componentDidMount() {
    const parkCode = 'bibe'
    const detailResponse = await fetch(`http://localhost:8000/details?parkCode=${parkCode}`)
    if (detailResponse.ok) {
      const data = await detailResponse.json();
      console.log(data)
      this.setState({ details: data.data });
    }
  };
  searchPage() {
    const containerStyle = {
      width: 1000,
      height: 400,
    };
  }


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

          <Map style={containerStyle} />
        </div>
      </>
    );
  }
}

export default SearchPage
