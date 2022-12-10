import React, { useState, useEffect } from "react";
import "./Home.css";
import Banner from "../Banner/Banner";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Map from '../Map/Map';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Home(props) {
  const [parkColumns, setparkColumns] = useState([])
  const [nextPage, setnextPage] = useState(0)
  const [parks, setParks] = useState([])
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    async function getData() {
      if (nextPage < 9) {
        setnextPage(0)
      }
      var data;
      if (props.parks) {
        data = props.parks;
      } else {
        console.log(process.env.REACT_APP_PARKS_API_HOST)
        const apiResponse = await fetch(`${process.env.REACT_APP_PARKS_API_HOST}/list?start=${nextPage}`)
        if (apiResponse.ok) {
          const temp = await apiResponse.json()
          data = temp.data
        }
      }
      const requests = [];
      requests.push(data);
      let i = 0;
      const templist = ([[], [], []])
      for (let item of requests[0]) {
        templist[i].push(item);
        i = i + 1;
        if (i > 2) {
          i = 0;
        }
      }
      setparkColumns(templist)
    }
    getData()
    // eslint-disable-next-line
  }, [nextPage]);

  useEffect(() => {
    if (!modalOpen) return;
    if (props.parks) {
      setParks(props.parks);
    } else {
      const populateMap = async () => {
        const mapApiResponse = await fetch(`http://localhost:8000/maplist`)
        if (mapApiResponse.ok) {
          const data = await mapApiResponse.json();
          setParks(data.data)
        }
      }
      populateMap();
    }
    // eslint-disable-next-line
  }, [modalOpen]);

  const containerStyle = {
    width: '65vw',
    height: 750,
    borderRadius: 16,
    margin: 'auto',
    top: '25%',
    padding: 10,
    border: '6px solid white',
  };

  function ParkColumn(parkColumns) {
    return (
      <div className="col">
        {parkColumns.list?.map(park => {
          return (
            <div key={park.id}>
              <Card
                src={park.images[0].url}
                title={park.fullName}
                description={park.description}
                contact={park.contacts.emailAddresses[0].emailAddress}
                latLong={park.addresses[0].city + ", " + park.addresses[0].stateCode}
                parkCode={park.parkCode}
              />
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="home">
      <Banner />
      <div className="container">
        <div className="home_section">
          {parkColumns.map((data, index) => {
            return (
              <ParkColumn key={index} list={data} />
            );
          })}
          <ParkColumn />
        </div>
        <div className="flex-parent jc-center"><ArrowBackIosNewIcon className="right" onClick={() => setnextPage(nextPage - 9)} variant='outlined'></ArrowBackIosNewIcon>
          <ArrowForwardIosIcon className="left" onClick={() => setnextPage(nextPage + 9)} variant='outlined'></ArrowForwardIosIcon></div>
        <Modal setIsOpen={setModalOpen} isOpen={modalOpen}>
          <Map pins={parks.map(park => ({
            id: park.id,
            lat: Number(park.latitude),
            lng: Number(park.longitude),
            title: park.fullName,
            name: park.fullName,
            description: park.description,
            src: park.images[0].url,
            latLong: park.latLong,
            parkCode: park.parkCode
          }))} style={containerStyle} />
        </Modal>
      </div>
    </div>
  );
}
export default Home;
