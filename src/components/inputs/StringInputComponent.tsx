import { TextField } from "@mui/material";
import {
  BuilderFormData,
  DataContext,
  ValidContext,
} from "../../pages/mainPage/MainContentPage.tsx";
import React, { useCallback, useContext, useEffect } from "react";

interface StringInputComponentProps {
  label: string;
  placeholder?: string;
  id: keyof BuilderFormData;
  validCheck?: (data: BuilderFormData) => boolean;
  header?: string;
  defaultValue?: string;
  renderCondition?: (data: BuilderFormData) => boolean;
}

function StringInputComponent(props: StringInputComponentProps) {
  const [data, setData] = useContext(DataContext);
  const [validity, setValidity] = useContext(ValidContext);

  const setValue = useCallback(
    (value: string) => {
      setData((prevData) => ({ ...prevData, [props.id]: value }));
    },
    [setData]
  );

  useEffect(() => {
    const valid = props.validCheck ? props.validCheck(data) : true;
    setValidity((prevVal) => ({ ...prevVal, [props.id]: valid }));
  }, [data]);

  useEffect(() => {
    setValue(props.defaultValue || "");
  }, [props.defaultValue]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [props.validCheck, props.id, data, validity]
  );

  return (
    <>
      {props.renderCondition == undefined || props.renderCondition(data) ? (
        <TextField
          label={props.label}
          placeholder={props.placeholder}
          onChange={onChange}
          error={!validity[props.id]}
          value={data[props.id]}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default StringInputComponent;
