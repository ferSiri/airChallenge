import { Box, styled } from "@mui/material";
import { PageContainerProps } from "../interfaces/interfaces.interface";

    const PageContainer = ({children}: PageContainerProps) => {
        return (
            <StyledContainer>
                {children}
            </StyledContainer>
        );
    }

    const StyledContainer = styled(Box)(({ theme }) => ({
        height: '100vh',
        width: '100 vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        backgroundImage: `url(/images/takingOff.jpeg)`,
        backgroundPosition: "center",
        [theme.breakpoints.down('sm')]: {
            padding: '0 20px'
        }
    }));

 export default PageContainer;