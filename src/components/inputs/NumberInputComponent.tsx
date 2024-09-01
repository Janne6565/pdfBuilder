import { useCallback, useContext, useEffect, useState } from "react";
import {
  BuilderFormData,
  DataContext,
  ValidContext,
} from "../../pages/mainPage/MainContentPage.tsx";
import { TextField } from "@mui/material";

interface NumberInputComponentProps {
  label: string;
  validCheck?: (data: BuilderFormData) => boolean;
  id: keyof BuilderFormData;
  defaultValue?: number;
  renderCondition?: (data: BuilderFormData) => boolean;
}

function NumberInputComponent(props: NumberInputComponentProps) {
  const [data, setData] = useContext(DataContext);
  const [validity, setValidity] = useContext(ValidContext);

  const setValue = useCallback(
    (value: number) => {
      setData((prevData) => ({ ...prevData, [props.id]: value }));
    },
    [setData]
  );

  useEffect(() => {
    const valid = props.validCheck ? props.validCheck(data) : true;
    setValidity((prevVal) => ({ ...prevVal, [props.id]: valid }));
  }, [data]);

  useEffect(() => {
    setValue(props.defaultValue || 0);
  }, [props.defaultValue]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue(parseInt(e.target.value, 10));
    },
    [props.validCheck, props.id, data, validity]
  );

  return (
    <>
      {props.renderCondition == undefined || props.renderCondition(data) ? (
        <TextField
          type={"number"}
          label={props.label}
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

export default NumberInputComponent;
