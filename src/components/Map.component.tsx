import { useEffect, useState } from "react";
import { Box, CircularProgress, styled } from "@mui/material";
import {useJsApiLoader, GoogleMap, MarkerF, PolylineF } from '@react-google-maps/api';
import { MapPropsInterface } from "../interfaces/interfaces.interface";
import { getDirectionsData, getMapZoom, middlePoint } from "../utils";

const Map = ({airports, distance}: MapPropsInterface) => {
    const [width, setWidth] = useState(window.innerWidth);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
    });
    const center = middlePoint(airports);
    const directionsData = getDirectionsData(airports);
    const mapZoom = getMapZoom(distance, width);

    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    return (
        <StyledContainer>
            {
                !isLoaded ?
                    <CircularProgress color="primary"/> :
                        <GoogleMap 
                            center={center} 
                            zoom={mapZoom} 
                            mapContainerStyle={{
                                width:'100%', 
                                aspectRatio: 'auto 1 / 1'
                            }}
                            options={{
                                mapTypeControl: false,
                                fullscreenControl: false,
                                streetViewControl: false,
                            }}
                        >
                            <MarkerF
                                position={directionsData.origin}
                            />
                            <MarkerF
                                position={directionsData.destination}
                            />
                            <PolylineF
                                path={[directionsData.origin, directionsData.destination]}
                                options = {{
                                    geodesic: true,
                                    strokeOpacity: 0,
                                    strokeWeight: 2,
                                    strokeColor: '#F70100',
                                    icons: [
                                        {
                                        icon: {
                                            path: 'M 0,0 0,1',
                                            strokeOpacity: 1,
                                            strokeWeight: 2,
                                            scale: 3,
                                        },
                                        repeat: '10px',
                                        },
                                    ],
                                  }}
                            />
                        </GoogleMap>
            }
        </StyledContainer>
    );
}

const StyledContainer = styled(Box)(({ theme }) => ({
        width: '100%',
        [theme.breakpoints.down('md')]: {
            width:'250px'
        },
        [theme.breakpoints.down('sm')]: {
            width:'200px'
        }
}));

export default Map;