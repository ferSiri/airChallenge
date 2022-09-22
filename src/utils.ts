import { Airport, DirectionsData } from "./interfaces/interfaces.interface";

export const normalizeData = (data: {airports:Airport[]}) : Airport[] => {
    const {airports} = data;
    return airports.map(airport=>({...airport, label: airport.name}));
}

const toRad = (value: number) => {
    return value * Math.PI / 180;
  }
  
const toDeg = (value: number) => {
    return value * 180 / Math.PI;
}

export const calcCrow = (airports: {first:any, second:any}) => {

    const lat1 = Number(airports.first.latitude);
    const lon1 = Number(airports.first.longitude);
    const lat2 = Number(airports.second.latitude);
    const lon2 = Number(airports.second.longitude);
    
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const lat1R = toRad(lat1);
    const lat2R = toRad(lat2);
  
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1R) * Math.cos(lat2R);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d / 1.852;
  }

  export const middlePoint = (airports: {first:any, second:any}) => {
    
    let lat1 = Number(airports.first.latitude);
    let lng1 = Number(airports.first.longitude);
    let lat2 = Number(airports.second.latitude);
    let lng2 = Number(airports.second.longitude);


    const dLng = toRad((lng2 - lng1));
  
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    lng1 = toRad(lng1);
  
    const bX = Math.cos(lat2) * Math.cos(dLng);
    const bY = Math.cos(lat2) * Math.sin(dLng);
    const lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bX) * (Math.cos(lat1) + bX) + bY * bY));
    const lng3 = lng1 + Math.atan2(bY, Math.cos(lat1) + bX);
  
    return { lat: toDeg(lat3), lng: toDeg(lng3) };
  }

  export const getDirectionsData = (airports: {first:any, second:any}): DirectionsData => {
    const origin = {
      lat: airports.first ? Number(airports.first.latitude) : 0,
      lng: airports.first ? Number(airports.first.longitude) : 0,
    };
    const destination = {
        lat: airports.second ? Number(airports.second.latitude) : 0,
        lng: airports.second ? Number(airports.second.longitude) : 0,
    };
    return { origin, destination };
  }

  export const getMapZoom = (distance: number | undefined, width: number): number => {
    
    if (distance) {
      if(width>800){
        switch (true) {
          case distance>1300:
            return 3;
          case distance>800:
            return 4;
          case distance>100:
            return 6;
          default:
            return 7;
        }
      }else{
        switch (true) {
          case distance>800:
            return 2.3;
          case distance>100:
            return 3;
          default:
            return 5;
        }
      }
    }
    return 7;
  }