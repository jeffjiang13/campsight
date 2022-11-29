import React, { useState, useEffect } from "react";
import "./Home.css";
import Banner from "../Banner/Banner";
import Card from "../Card/Card";
// import ModalButton from "../ModalButton/ModalButton";
import Modal from "../Modal/Modal";
import Map from '../Map/Map';


function Home() {
  const [list, setList] = useState({});

  useEffect(() => {
    async function getData() {
      const apiResponse = await fetch(`http://localhost:8000/list`)
      if (apiResponse.ok) {
        const data = await apiResponse.json()
        setList(data.data)
      }
    }
    getData()
  }, []);
  console.log(list)

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

  return (
    <div className="home">
      <Banner />
      <div className="home_section">
        <Card
          src="https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1496241913/campground-photos/s0bmk3ypv7xqpgbuh6m4.jpg"
          title="Long Pine Key Group Campground"
          description="Located seven miles from the Everglades National Park entrance, Long Pine Key campground is a tranquil
          and well-maintained facility open seasonally from November to May."
          latlong="25.7459° N, 80.5550° W"
        />
        <Card
          src="https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1496241913/campground-photos/s0bmk3ypv7xqpgbuh6m4.jpg"
          title="Long Pine Key Group Campground"
          description="Located seven miles from the Everglades National Park entrance, Long Pine Key campground is a tranquil
          and well-maintained facility open seasonally from November to May."
          latlong="25.7459° N, 80.5550° W"
        />
        <Card
          src="https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto,h_480,q_60,w_720/v1496241913/campground-photos/s0bmk3ypv7xqpgbuh6m4.jpg"
          title="Long Pine Key Group Campground"
          description="Located seven miles from the Everglades National Park entrance, Long Pine Key campground is a tranquil
          and well-maintained facility open seasonally from November to May."
          latlong="25.7459° N, 80.5550° W"
        />
      </div>
      <div className="home_section">
        <Card
          src="https://www.elacampground.com/wp-content/uploads/2019/06/Ela-Campground-87.jpg"
          title="Hamilton Pool Camp"
          description="This is a relaxing spot in the Hill Country to camp and enjoy the surrounding area with nearby swimming, kayaking, rock climbing,
          bicycle riding, and hiking on and around the Pedernales River, as well as the many restaurants, wineries, and breweries in the area."
          latlong="30.3423° N, 98.1271° W"
        />
        <Card
          src="https://www.elacampground.com/wp-content/uploads/2019/06/Ela-Campground-87.jpg"
          title="Hamilton Pool Camp"
          description="This is a relaxing spot in the Hill Country to camp and enjoy the surrounding area with nearby swimming, kayaking, rock climbing,
          bicycle riding, and hiking on and around the Pedernales River, as well as the many restaurants, wineries, and breweries in the area."
          latlong="30.3423° N, 98.1271° W"
        />
        <Card
          src="https://www.elacampground.com/wp-content/uploads/2019/06/Ela-Campground-87.jpg"
          title="Hamilton Pool Camp"
          description="This is a relaxing spot in the Hill Country to camp and enjoy the surrounding area with nearby swimming, kayaking, rock climbing,
          bicycle riding, and hiking on and around the Pedernales River, as well as the many restaurants, wineries, and breweries in the area."
          latlong="30.3423° N, 98.1271° W"
        />
      </div>
      <div className="home_section">
        <Card
          src="https://hipcamp-res.cloudinary.com/f_auto,c_limit,w_640,q_60/v1633055248/campground-photos/i2yde2gcanyayo8wiwzp.jpg"
          title="Windy Goat Acres"
          description="We love animals, plants, art, and outdoor recreation and love sharing these things with people! We found the perfect little plot for all of these things we love.
          Nature, art, animals, and lots of space! The hilly, lush land is also known as the Bohemie Alps and it's quite a beautiful area tucked away in Iowa."
          latlong="41.9940 N, -92.4514"
        />
        <Card
          src="https://hipcamp-res.cloudinary.com/f_auto,c_limit,w_640,q_60/v1633055248/campground-photos/i2yde2gcanyayo8wiwzp.jpg"
          title="Windy Goat Acres"
          description="We love animals, plants, art, and outdoor recreation and love sharing these things with people! We found the perfect little plot for all of these things we love.
          Nature, art, animals, and lots of space! The hilly, lush land is also known as the Bohemie Alps and it's quite a beautiful area tucked away in Iowa."
          latlong="41.9940 N, -92.4514"
        />
        <Card
          src="https://hipcamp-res.cloudinary.com/f_auto,c_limit,w_640,q_60/v1633055248/campground-photos/i2yde2gcanyayo8wiwzp.jpg"
          title="Windy Goat Acres"
          description="We love animals, plants, art, and outdoor recreation and love sharing these things with people! We found the perfect little plot for all of these things we love.
          Nature, art, animals, and lots of space! The hilly, lush land is also known as the Bohemie Alps and it's quite a beautiful area tucked away in Iowa."
          latlong="41.9940 N, -92.4514"
        />
      </div>
      <Modal setIsOpen={setModalOpen} isOpen={isModalOpen}>
        <Map style={containerStyle} />
      </Modal>
    </div>
  );
}

export default Home;
