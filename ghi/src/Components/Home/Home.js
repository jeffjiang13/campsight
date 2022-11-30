import React, { useState, useEffect } from "react";
import "./Home.css";
import Banner from "../Banner/Banner";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Map from '../Map/Map';
import { Button } from '@mui/material';


function Home() {
  const [parkColumns, setparkColumns] = useState([])
  const [nextPage, setnextPage] = useState(0)

  async function getData() {
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

  useEffect(() => {
    getData()
  }, [nextPage]);

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
                latlong={park.contacts.emailAddresses[0].emailAddress}
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
        <div><Button onClick={() => setnextPage(nextPage + 9)} variant='outlined'>Next Page</Button>
          <Button onClick={() => setnextPage(nextPage - 9)} variant='outlined'>Previous Page</Button></div>
        <Modal setIsOpen={setModalOpen} isOpen={isModalOpen}>
          <Map style={containerStyle} />
        </Modal>
      </div>
    </div>
  );
}
export default Home;

