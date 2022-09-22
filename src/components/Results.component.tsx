import { Box, Button, styled, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Map from "./Map.component";
import { ResultsPropsInterface } from "../interfaces/interfaces.interface";


const Results = ({distance, airports, newSearch}: ResultsPropsInterface) => {
    const formattedDistance = distance && !isNaN(distance) ? distance.toFixed(2) : '0';
    return (
        <Container>
            <ResultsText variant="h6">{`The distance is ${formattedDistance} miles`}</ResultsText>
            <Map distance={distance} airports={airports}/>
            <Button color='primary' sx={{display: 'flex', marginTop: '20px'}} onClick={newSearch}>
                <ChevronLeftIcon/>
                <Typography>{`New search`}</Typography>
            </Button>
        </Container>
    );
};

const ResultsText = styled(Typography)(({ theme }) => ({
    marginBottom:'20px',
    [theme.breakpoints.down('md')]: {
        marginBottom:'10px',
    },
    [theme.breakpoints.down('sm')]: {
        marginBottom:'20px',
    }
}));

const Container = styled(Box)(({ theme }) => ({
    width:'100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));

export default Results;