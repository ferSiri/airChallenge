import { Airport } from "./interfaces/interfaces.interface";

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