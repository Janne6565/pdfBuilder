import {useContext, useState} from "react";
import {BuilderFormData, DataContext} from "../../pages/mainPage/MainContentPage.tsx";
import {TextField} from "@mui/material";

interface NumberInputComponentProps {
    label: string;
    range?: [number, number];
    id: keyof BuilderFormData;
}

function NumberInputComponent(props: NumberInputComponentProps) {
    const [data, setData] = useContext(DataContext);
    const setValue = (value: number | null) => {
        setData(prevVal => ({...prevVal, [props.id]: value}));
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value ? parseInt(value, 10) : null);
    };

    return (
        <TextField type={"number"} label={props.label} onChange={handleChange}/>
    );
}

export default NumberInputComponent;