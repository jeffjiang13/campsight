import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";


function Map(props) {
  //pass { location } here
  const MAPS_API = process.env.REACT_APP_MAPS_API;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API,
  });

  const center = {
    lat: 25.7459, //location.lat
    lng: -80.555, // location.long
  };

  const [map, setMap] = React.useState(null);
  const [userLocation, setUserLocation] = useState(center);

  useEffect(() => {

    window.navigator.geolocation.getCurrentPosition(location => {
      setUserLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
    })

  }, [])
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={props.style}
      center={userLocation}
      zoom={9.5}
      onUnmount={onUnmount}
    >
      {JSON.stringify(props.pins)}
      {(props.pins || []).map(pin => <Marker position={{ lat: Number(pin.lat), lng: Number(pin.lng) }}
        key={pin.id} visible={true} clickable={true} />)}
      <>
      </>
    </GoogleMap>
  ) : (
    <>
    </>
  );
}

export default React.memo(Map);
