import {TextField} from "@mui/material";
import {BuilderFormData, DataContext} from "../../pages/mainPage/MainContentPage.tsx";
import React, {useContext, useEffect} from "react";

interface StringInputComponentProps {
    label: string,
    placeholder?: string,
    id: keyof BuilderFormData,
    header?: string,
    defaultValue?: string
}


function StringInputComponent(props: StringInputComponentProps) {
    const [data, setData] = useContext(DataContext);
    const setValue = (value: string) => {
        setData(prevVal => ({...prevVal, [props.id]: value}));
    }

    useEffect(() => {
        setValue(props.defaultValue || "");
    }, [props.defaultValue]);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return <TextField label={props.label} placeholder={props.placeholder} onChange={onChange}/>
}

export default StringInputComponent;