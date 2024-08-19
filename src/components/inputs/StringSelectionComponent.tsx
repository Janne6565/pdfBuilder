import {BuilderFormData, DataContext} from "../../pages/mainPage/MainContentPage.tsx";
import React, {useContext} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

interface StringSelectionComponentProps {
    label: string,
    options: string[],
    id: keyof BuilderFormData,
    header?: string,
    defaultValue?: string
}

function StringSelectionComponent(props: StringSelectionComponentProps) {
    const [data, setData] = useContext(DataContext);

    const setValue = (value: string) => {
        setData(prevVal => ({...prevVal, [props.id]: value}));
    }

    return <FormControl sx={{width: "200px"}}>
        <InputLabel>{props.label}</InputLabel>
        <Select labelId={"input-label-" + props.id} label={props.label} onChange={(e) => setValue(e.target.value as string)}>
            {props.options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
        </Select>
    </FormControl>;
}

export default StringSelectionComponent;