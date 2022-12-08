import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Card from "../Card/Card";

function DetailMap(props) {
    const MAPS_API = process.env.REACT_APP_MAPS_API;
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: MAPS_API,
    });

    const [SelectedMarker, setSelectedMarker] = useState("")

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={props.style}
            center={{
                lat: Number(props.pins[0].lat),
                lng: Number(props.pins[0].lng)
            }}
            zoom={9.5}
        >
            {JSON.stringify(props.pins)}
            {(props.pins || []).map((pin, index) => <Marker position={{ lat: Number(pin.lat), lng: Number(pin.lng) }}
                key={pin.id} visible={true} icon="https://i.ibb.co/f92RGJ9/tent.png" anchor={Marker} clickable={true} onClick={() =>
                    setSelectedMarker(pin)} />)}
            {SelectedMarker &&
                <InfoWindow position={{ lat: Number(SelectedMarker.lat), lng: Number(SelectedMarker.lng) }}
                    onCloseClick={() => { setSelectedMarker() }} >
                    <Card
                        src={SelectedMarker.src}
                        title={SelectedMarker.name}
                        description={SelectedMarker.description}
                        contact={SelectedMarker.contact}
                        latLong={SelectedMarker.latLong}
                        parkCode={SelectedMarker.parkCode}
                    />
                </InfoWindow>}
        </GoogleMap>
    ) : (
        <>

        </>
    );
}

export default React.memo(DetailMap);
