import React from 'react';
import "./Details.css";

class DetailPage extends React.Component {
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
    return (
      this.state.details.map((details, index) => {
        return (
          <div className="detail-container" key={index}>
            <h2 className="text-6 font-weight-600 text-center mb-4">{details.fullName}</h2>
            <div className="row g-4">
              <div className="col-md-7">
                <div className="owl-carousel owl-theme single-slideshow" data-autoplay="true" data-loop="true" data-nav="true" data-items="1">
                  <div className="item"> <img className="img-fluid" alt="" src={details.images[2].url} /> </div>
                </div>
              </div>
              <div className="col-md-5">
                <h4 className="text-4 font-weight-600">Park Info:</h4>
                <p>{details.description}</p>
                <h4 className="text-4 font-weight-600 mt-4">Park Details:</h4>
                <ul className="detail-list-style">
                  <li><span className="text-dark font-weight-600 me-2">URL:</span><a href={details.url} target="_blank">{details.url}</a></li>
                </ul>
              </div>
            </div>
          </div>
        )
      }))
  }
}

export default DetailPage