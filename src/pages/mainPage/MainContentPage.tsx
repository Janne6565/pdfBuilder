import { Box, Button, Toolbar } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import StringInputComponent from "../../components/inputs/StringInputComponent.tsx";
import DocumentHeader from "../../components/DocumentHeader.tsx";
import styles from "./style.module.scss";
import StringSelectionComponent from "../../components/inputs/StringSelectionComponent.tsx";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "../../pdfExport/PdfDocument.tsx";
import NumberInputComponent from "../../components/inputs/NumberInputComponent.tsx";

export type BuilderFormData = {
  name?: string;
  age?: number;
  favoriteColor?: string;
  age2?: number;
  name2?: string;
};

export type ValidityContextData = Record<keyof BuilderFormData, boolean>;

const defaultData: BuilderFormData = {};
const defaultValidity: ValidityContextData = Object.keys(defaultData).reduce(
  (acc, key) => {
    acc[key as keyof BuilderFormData] = false;
    return acc;
  },
  {} as ValidityContextData
);

export const DataContext = createContext<
  [BuilderFormData, React.Dispatch<React.SetStateAction<BuilderFormData>>]
>([defaultData, () => {}]);
export const ValidContext = createContext<
  [
    ValidityContextData,
    React.Dispatch<React.SetStateAction<ValidityContextData>>
  ]
>([defaultValidity, () => {}]);

function MainContentPage() {
  const [currentState, setCurrentState] =
    useState<BuilderFormData>(defaultData);
  const [currentValidity, setCurrentValidity] =
    useState<ValidityContextData>(defaultValidity);

  const buildPdf = (data: BuilderFormData) => {
    console.log("Building pdf with data: ", data);
  };

  return (
    <DataContext.Provider value={[currentState, setCurrentState]}>
      <ValidContext.Provider value={[currentValidity, setCurrentValidity]}>
        <Box component="main" sx={{ textAlign: "center", width: "100%" }}>
          <Toolbar />
          <Box className={styles.document}>
            <DocumentHeader />
            <StringInputComponent
              label={"Name"}
              placeholder={"Name"}
              id={"name"}
              validCheck={(props) => props.name != "janne"}
            />
            <br />
            <br />
            <NumberInputComponent
              label={"Age"}
              id={"age"}
              validCheck={(props) => props.age2! < props.age!}
              defaultValue={10}
            />
            <br />
            <br />
            <StringSelectionComponent
              label={"Favorite color"}
              options={["Green", "Blue", "Red", "Yellow"]}
              id={"favoriteColor"}
              validCheck={(data) => data.favoriteColor != "Red"}
            />
            <br />
            <br />

            <NumberInputComponent label={"Age2"} id={"age2"} />
            <br />
            <br />
						
            <StringInputComponent
              label={"Name 2"}
              placeholder={"Name"}
              id={"name2"}
              defaultValue="Test name"
							renderCondition={(data) => data.name == "janne"}
            />

          </Box>
          <PDFDownloadLink
            document={<PdfDocument {...currentState} />}
            fileName="export.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
        </Box>
      </ValidContext.Provider>
    </DataContext.Provider>
  );
}

export default MainContentPage;
