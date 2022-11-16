import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Map() { //pass { location } here
  const MAPS_API = process.env.REACT_APP_MAPS_API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAPS_API,
  });

  const containerStyle = {
    width: "1000px",
    height: "400px",
  };

  const center = {
    lat: 25.7459, //location.lat
    lng: -80.5550, // location.long
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);


  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={9.5}
      // onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} draggable={true} />
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
