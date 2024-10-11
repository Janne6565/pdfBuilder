import {
  BuilderFormData,
  DataContext,
  ValidContext,
} from "../../pages/mainPage/MainContentPage.tsx";
import { useCallback, useContext, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface StringSelectionComponentProps {
  label: string;
  options: string[];
  id: keyof BuilderFormData;
  header?: string;
  defaultValue?: string;
  validCheck?: (data: BuilderFormData) => boolean;
  renderCondition?: (data: BuilderFormData) => boolean;
}

function StringSelectionComponent(props: StringSelectionComponentProps) {
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
    setValue((data[props.id] as string) ?? (props.defaultValue || ""));
  }, [props.defaultValue, data]);

  const onChange = useCallback(
    (e: SelectChangeEvent) => {
      setValue(e.target.value);
    },
    [props.validCheck, props.id, data, validity]
  );

  return (
    <>
      {props.renderCondition == undefined || props.renderCondition(data) ? (
        <FormControl sx={{ width: "200px" }}>
          <InputLabel error={!validity[props.id]}>{props.label}</InputLabel>
          <Select
            labelId={"input-label-" + props.id}
            label={props.label}
            onChange={onChange}
            error={!validity[props.id]}
            value={(data[props.id] as string) ?? " "}
          >
            {props.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <></>
      )}
    </>
  );
}

export default StringSelectionComponent;
