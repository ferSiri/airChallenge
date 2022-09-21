import { Autocomplete, TextField } from "@mui/material";
import { AutocompletePropsInterface } from "../interfaces/interfaces.interface";

const AutocompleteInput = ({
        inputId, 
        options, 
        compareKey, 
        label, 
        onInputChange, 
        onChange,
        sx
    }: AutocompletePropsInterface) => {
    
    return (
        <Autocomplete
            sx={{...sx,}}
            id={inputId}
            options={options}
            getOptionLabel={option => option.label.toString()}
            isOptionEqualToValue={(option, value) => option[compareKey] === value[compareKey]}
            filterOptions={(x) => x}
            renderInput={params => (
            <TextField {...params} label={label} variant="outlined" fullWidth />
            )}
            onInputChange={onInputChange}
            onChange={onChange}
        />
    );
}

export default AutocompleteInput;