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