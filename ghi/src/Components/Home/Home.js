import React, { useState, useEffect } from "react";
import "./Home.css";
import Banner from "../Banner/Banner";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Map from '../Map/Map';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Home() {
  const [parkColumns, setparkColumns] = useState([])
  const [nextPage, setnextPage] = useState(0)
  const [parks, setParks] = useState([])

  async function getData() {
    if (nextPage < 9) {
      setnextPage(0)
    }
    const apiResponse = await fetch(`http://localhost:8000/list?start=${nextPage}`)
    if (apiResponse.ok) {
      const data = await apiResponse.json()
      const requests = [];
      requests.push(data.data);
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
  }

  async function populateMap() {
    const locationArray = []
    const parklist = []
    const mapapiResponse = await fetch(`http://localhost:8000/maplist`)
    if (mapapiResponse.ok) {
      const mapdata = await mapapiResponse.json()
      parklist.push(mapdata.data)
      for (let park of parklist[0]) {
        locationArray.push(park)
      }
    }
    setParks(locationArray)
  }

  useEffect(() => {
    getData()
  }, [nextPage]);

  useEffect(() => {
    populateMap()
  }, []);

  const containerStyle = {
    width: '65vw',
    height: 750,
    borderRadius: 16,
    margin: 'auto',
    top: '25%',
    padding: 10,
    border: '6px solid white',
  };

  const [isModalOpen, setModalOpen] = useState(false);
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
        <div className="flex-parent jc-center"><ArrowBackIosNewIcon onClick={() => setnextPage(nextPage - 9)} variant='outlined'></ArrowBackIosNewIcon>
          <ArrowForwardIosIcon onClick={() => setnextPage(nextPage + 9)} variant='outlined'></ArrowForwardIosIcon></div>
        <Modal setIsOpen={setModalOpen} isOpen={isModalOpen}>
          <Map pins={parks.map(park => ({
            id: park.id,
            lat: park.latitude,
            lng: park.longitude,
            title: park.fullName,
            image: park.images[0].url,
            name: park.fullName,
            description: park.description,
            src: park.images[0].url,
            contact: park.contacts.emailAddresses[0].emailAddress,
            latLong: park.latLong,
            parkCode: park.parkCode
          }))} style={containerStyle} />
        </Modal>
      </div>
    </div>
  );
}
export default Home;
