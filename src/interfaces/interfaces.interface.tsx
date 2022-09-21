import { SxProps } from "@mui/material";

export interface PageContainerProps {
    children: React.ReactNode;
}

export interface Airport {
    label?: string;
    city: string;
    country:{
        name: string; 
        iso: string;
    }
    iata: string;
    latitude: string;
    longitude: string;
    name:string;
}
export interface AutocompletePropsInterface {
    inputId: string;
    options: any[];
    compareKey: string;
    label: string;
    onInputChange: (event: React.SyntheticEvent<Element, Event>, value: string) => void;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
    sx?: SxProps;
}
export interface ResultsPropsInterface {
    distance?: number;
    airports: {first: Airport | null, second: Airport | null};
    newSearch: ()=>void;
}