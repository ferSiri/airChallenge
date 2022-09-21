import { Container } from "@mui/material";
import { PageContainerProps } from "../interfaces/interfaces.interface";

    const PageContainer = ({children}: PageContainerProps) => {
        return (
            <Container>
                {children}
            </Container>
        );
    }

 export default PageContainer;