import { useState } from "react";
import { Autocomplete, Button, Paper, styled, TextField, Typography } from "@mui/material";
import { getAirports } from "../services/appServices.service";
import { calcCrow, normalizeData } from "../utils";
import { Airport } from "../interfaces/interfaces.interface";
import AutocompleteInput from "./Autocomplete.component";

const AirportsForm = () => {
    const [firstAirportOptions, setFirstAirportOptions] = useState<any[]>([]);
    const [secondAirportOptions, setSecondAirportOptions] = useState<any[]>([]);
    const [selectedAirports, setSelectedAirports] = useState<{first: Airport | null, second: Airport | null}>({first: null, second:null});
    const [error, setError] = useState('');
    const [airportsDistance, setAirportsDistance] = useState<number>();

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
    
    return (
        <FormContainer>
            <Typography variant="h5" align="center" sx={{mb:4}}>{"Calculate the distance between two airports"}</Typography>
            <StyledForm onSubmit={onSubmit}>
                <AutocompleteInput
                    inputId="first-airport"
                    options={firstAirportOptions}
                    compareKey='iata'
                    label="First Airport"
                    onInputChange={(event, value) =>getAirports(value, getFirstAirportOptions, (data)=>console.log(data))}
                    onChange={(event, value) => setSelectedAirports({...selectedAirports, first: value})}
                    sx={{width: '100%', mb:4}}
                />
                <AutocompleteInput
                    inputId="second-airport"
                    options={secondAirportOptions}
                    compareKey='iata'
                    label="Second Airport"
                    onInputChange={(event, value) =>getAirports(value, getSecondAirportOptions, (data)=>console.log(data))}
                    onChange={(event, value) => setSelectedAirports({...selectedAirports, second: value})}
                    sx={{width: '100%', mb:4}}
                />
                <Button type="submit" variant="contained">GET DISTANCE</Button>
                {airportsDistance && <Typography>{`The distance is ${airportsDistance} miles`}</Typography>}
            </StyledForm>
        </FormContainer>
    );
}

const FormContainer = styled(Paper)(({ theme }) => ({
    width:'600px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
}));

const StyledForm = styled('form')(({ theme }) => ({
    width:'100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));

export default AirportsForm;