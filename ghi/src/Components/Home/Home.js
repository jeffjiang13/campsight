import React, { useState, useEffect } from "react";
import "./Home.css";
import Banner from "../Banner/Banner";
import Card from "../Card/Card";
import Modal from "../Modal/Modal";
import Map from '../Map/Map';


function Home() {
  const [parkColumns, setparkColumns] = useState([[], [], []])

  useEffect(() => {
    async function getData() {
      const apiResponse = await fetch(`http://localhost:8000/list`)
      if (apiResponse.ok) {
        const data = await apiResponse.json()

        const requests = [];
        for (let park of data.data) {
          const parkUrl = `http://localhost:8000/details?parkCode=${park.parkCode}`;
          requests.push(fetch(parkUrl));
        }
        const responses = await Promise.all(requests);
        const parkdetail = ([[], [], []])
        let i = 0;
        for (const item of responses) {
          const details = await item.json();
          parkdetail[i].push(details);
          i = i + 1;
          if (i > 2) {
            i = 0;
          }
        }
        setparkColumns(parkdetail)
      }
    }
    getData()
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
        {parkColumns.list.map(parks => {
          return (
            <div key={parks.data[0].id}>
              <Card
                src={parks.data[0].images[0].url}
                title={parks.data[0].fullName}
                description={parks.data[0].description}
                latlong={parks.data[0].contacts.emailAddresses[0].emailAddress}
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
          {parkColumns.map((list, index) => {
            return (
              <ParkColumn key={index} list={list} />
            );
          })}
        </div>
        <Modal setIsOpen={setModalOpen} isOpen={isModalOpen}>
          <Map style={containerStyle} />
        </Modal>
      </div>
    </div>
  );
}

export default Home;
