import { Box, Button, styled, Typography } from "@mui/material";
import { ResultsPropsInterface } from "../interfaces/interfaces.interface";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const Results = ({distance, airports, newSearch}: ResultsPropsInterface) => {
    const formattedDistance = distance && !isNaN(distance) ? distance.toFixed(2) : '0';
    return (
        <Container>
            <Typography>{`The distance is ${formattedDistance} miles`}</Typography>
            <Button color='warning' sx={{display: 'flex', marginTop: '20px'}} onClick={newSearch}>
                <ChevronLeftIcon/>
                <Typography>{`New search`}</Typography>
            </Button>
        </Container>
    );
};

const Container = styled(Box)(({ theme }) => ({
    width:'100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));

export default Results;