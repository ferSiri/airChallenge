import { useState } from "react";
import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import { getAirports } from "../services/appServices.service";
import { calcCrow, normalizeData } from "../utils";
import { Airport } from "../interfaces/interfaces.interface";

const AirportsForm = () => {
    const [firstAirportOptions, setFirstAirportOptions] = useState<any[]>([]);
    const [secondAirportOptions, setSecondAirportOptions] = useState<any[]>([]);
    const [selectedAirports, setSelectedAirports] = useState<{first: Airport | null, second: Airport | null}>({first: null, second:null});
    const [error, setError] = useState('');
    const [airportsDistance, setAirportsDistance] = useState(0);

    const getFirstAirportOptions = (data: any) => {
      const airports = normalizeData(data);
      setFirstAirportOptions(airports);
    }
  
    const getSecondAirportOptions = (data: any) => {
      const airports = normalizeData(data);
      setSecondAirportOptions(airports);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!!selectedAirports.first && !!selectedAirports.second){
            const distance = calcCrow(selectedAirports);
            setAirportsDistance(distance);
        }
    };
    console.log(selectedAirports)
    return (
        <form onSubmit={onSubmit}>
            <Autocomplete
                id="first-airport"
                options={firstAirportOptions}
                getOptionLabel={option => option.label.toString()}
                style={{ width: 300, marginBottom: 30 }}
                filterOptions={(x) => x}
                isOptionEqualToValue={(option, value) => option.iata === value.iata}
                renderInput={params => (
                <TextField {...params} label="First Airport" variant="outlined" fullWidth />
                )}
                onInputChange={(event, value) =>
                    getAirports(value, getFirstAirportOptions, (data)=>console.log(data))
                }
                onChange={
                    (event, value) => setSelectedAirports({...selectedAirports, first: value})
                }
            />
            <Autocomplete
                id="second-airport"
                options={secondAirportOptions}
                getOptionLabel={option => option.label.toString()}
                style={{ width: 300 }}
                isOptionEqualToValue={(option, value) => option.iata === value.iata}
                filterOptions={(x) => x}
                renderInput={params => (
                <TextField {...params} label="First Airport" variant="outlined" fullWidth />
                )}
                onInputChange={(event, value) =>
                getAirports(value, getSecondAirportOptions, (data)=>console.log(data))
                }
                onChange={
                    (event, value) => setSelectedAirports({...selectedAirports, second: value})
                }
            />
            <Button type="submit" variant="contained">Search</Button>
            {airportsDistance && <Typography>{`The distance is ${airportsDistance} miles`}</Typography>}
        </form>
    );
}

export default AirportsForm;