import {multi} from 'air-port-codes-node';

const apiKey = process.env.REACT_APP_AIRPORT_API_KEY || '';
const apiSecret = process.env.REACT_APP_AIRPORT_API_SECRET || '';
const apcm = multi({key : apiKey, secret:apiSecret, limit: 7, countries: 'US', type:'a'});

export const getAirports = async (searchParams: string, successAction: (data:any)=>void, errorAction: (data:any)=>void) => {
    apcm.onSuccess = successAction;
    apcm.onError = errorAction;
    //THIS CONDITION AVOIDS UNNECESARY REQUESTS SINCE THE API WILL SEND AN ERROR WITH LESS THAN 3 CHARACTERS
    if(searchParams.length > 2){
        await apcm.request(searchParams);
    }
};