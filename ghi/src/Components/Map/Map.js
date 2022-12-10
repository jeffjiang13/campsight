import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Card from "../Card/Card";

function Map(props) {
  const MAPS_API = process.env.REACT_APP_MAPS_API;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API,
  });

  const center = {
    lat: 44.4280,
    lng: -110.5885,
  };

  const [SelectedMarker, setSelectedMarker] = useState("")
  const [userLocation, setUserLocation] = useState(center);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(location => {
      setUserLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
    })
  }, [])

  const windowLocation = window.location.pathname === '/'
    || window.location.pathname === '/advancedsearch'
    || window.location.pathname === '/project-gamma/'
    || window.location.pathname === '/project-gamma/advancedsearch';
  const pinLocation = windowLocation ? userLocation : {
    lat: Number(props.pins[0].lat),
    lng: Number(props.pins[0].lng)
  };

  const zoom = !windowLocation ? 12 : 5;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={props.style}
      center={pinLocation}
      zoom={zoom}
    >
      {JSON.stringify(props.pins)}
      {(props.pins || []).map((pin, index) => <Marker position={{ lat: Number(pin.lat), lng: Number(pin.lng) }}
        key={pin.id} visible={true} anchor={Marker} clickable={true} onClick={() =>
          setSelectedMarker(pin)} />)}
      {SelectedMarker &&
        <InfoWindow position={{ lat: Number(SelectedMarker.lat), lng: Number(SelectedMarker.lng) }}
          onCloseClick={() => { setSelectedMarker() }} >
          <Card
            src={SelectedMarker.src}
            title={SelectedMarker.name}
            description={SelectedMarker.description}
            latLong={SelectedMarker.latLong}
            parkCode={SelectedMarker.parkCode}
          />
        </InfoWindow>}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
