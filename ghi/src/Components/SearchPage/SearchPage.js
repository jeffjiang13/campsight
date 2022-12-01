import React from 'react'
import './SearchPage.css'
import SearchResult from '../SearchResult/SearchResult';
import Map from '../Map/Map';
import { Rating } from '@mui/material';

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

      this.setState({ details: data.data });
    }
  };


  render() {
    const containerStyle = {
      width: 1000,
      height: 400,
    };
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
                rating={<Rating name="size-large" defaultValue={2} size="large" />}
              />)
          })}
          <Map pins={[this.state.details && this.state.details.length && { lat: Number(this.state.details[0].latitude), lng: Number(this.state.details[0].longitude) }]} style={containerStyle} />
        </div>
      </>
    );
  }
}

export default SearchPage;
