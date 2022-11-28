import React from "react";
import { GoogleMap, useJsApiLoader, Marker, StreetViewService, InfoWindow } from "@react-google-maps/api";


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
      mapContainerStyle={props.style}
      center={center}
      zoom={9.5}
      // onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <StreetViewService position={center} draggable={true} />
      <Marker position={center} draggable={true} />
      {/* Child components, such as markers, info windows, etc. */}
      <>

      </>
    </GoogleMap>
  ) : (
    <>

    </>
  );
}

export default React.memo(Map);
