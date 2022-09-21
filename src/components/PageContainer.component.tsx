import { Container, styled } from "@mui/material";
import { PageContainerProps } from "../interfaces/interfaces.interface";

    const PageContainer = ({children}: PageContainerProps) => {
        return (
            <StyledContainer disableGutters={true}>
                {children}
            </StyledContainer>
        );
    }

    const StyledContainer = styled(Container)(({ theme }) => ({
        height: '100vh',
        width: '100 vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(/images/takingOff.jpeg)`
    }));

 export default PageContainer;