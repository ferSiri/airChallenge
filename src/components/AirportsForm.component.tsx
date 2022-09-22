import { useState } from "react";
import { Autocomplete, Button, Paper, styled, TextField, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { Airport } from "../interfaces/interfaces.interface";
import AutocompleteInput from "./Autocomplete.component";
import Results from "./Results.component";
import { getAirports } from "../services/appServices.service";
import { calcCrow, normalizeData } from "../utils";

const AirportsForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [firstAirportOptions, setFirstAirportOptions] = useState<any[]>([]);
    const [secondAirportOptions, setSecondAirportOptions] = useState<any[]>([]);
    const [selectedAirports, setSelectedAirports] = useState<{first: Airport | null, second: Airport | null}>({first: null, second:null});
    const [airportsDistance, setAirportsDistance] = useState<number>();
    const [showResults, setShowResults] = useState<boolean>(false);

    const onSearchError = (data: any) => {
        console.log(data);
    }

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
            setShowResults(true);
        }else{
            enqueueSnackbar('Both fields are required', { variant: 'error' });
        }
    };

    const newSearch = () => {
        setShowResults(false);
        setSelectedAirports({first: null, second:null});
    }
    
    return (
        <Container>
            {
                showResults ? 
                <Results
                    distance = {airportsDistance}
                    airports = {selectedAirports}
                    newSearch = {newSearch}
                /> :
                <>
                    <Typography variant="h5" align="center" sx={{mb:4}}>{"Calculate the distance between two airports"}</Typography>
                    <StyledForm onSubmit={onSubmit}>
                        <AutocompleteInput
                            inputId="first-airport"
                            options={firstAirportOptions}
                            compareKey='iata'
                            label="First Airport"
                            onInputChange={(event, value) =>getAirports(value, getFirstAirportOptions, onSearchError)}
                            onChange={(event, value) => setSelectedAirports({...selectedAirports, first: value})}
                            sx={{width: '100%', mb:4}}
                        />
                        <AutocompleteInput
                            inputId="second-airport"
                            options={secondAirportOptions}
                            compareKey='iata'
                            label="Second Airport"
                            onInputChange={(event, value) =>getAirports(value, getSecondAirportOptions, onSearchError)}
                            onChange={(event, value) => setSelectedAirports({...selectedAirports, second: value})}
                            sx={{width: '100%', mb:4}}
                        />
                        <Button color='primary' type="submit" variant="contained">GET DISTANCE</Button>
                    </StyledForm>
                </>
            }
        </Container>
    );
}

const Container = styled(Paper)(({ theme }) => ({
    width:'500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    [theme.breakpoints.down('md')]: {
        width: '300px',
        padding: '5px 50px'
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '50px 10px'
    },
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