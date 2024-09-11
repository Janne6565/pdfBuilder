import { Box, Button, ButtonGroup, Toolbar } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
import StringInputComponent from "../../components/inputs/StringInputComponent.tsx";
import DocumentHeader from "../../components/DocumentHeader.tsx";
import styles from "./style.module.scss";
import StringSelectionComponent from "../../components/inputs/StringSelectionComponent.tsx";
import {
  BlobProvider,
  PDFDownloadLink,
  PDFViewer,
  usePDF,
} from "@react-pdf/renderer";
import PdfDocument from "../../pdfExport/PdfDocument.tsx";
import NumberInputComponent from "../../components/inputs/NumberInputComponent.tsx";

const pages: PageObjects = [
  {
    heading: "Page 1",
    items: [
      {
        render: (props) => (
          <StringInputComponent
            label={"Name"}
            placeholder={"Name"}
            id={"name"}
          />
        ),
      },
      {
        render: (props) => (
          <NumberInputComponent label={"Age"} id={"age"} defaultValue={18} />
        ),
      },
      {
        render: (props) => (
          <StringSelectionComponent
            label={"Favorite color"}
            id={"favoriteColor"}
            defaultValue={"red"}
            options={["red", "blue", "green"]}
          />
        ),
      },
    ],
  },
  {
    heading: "Page 2",
    items: [
      {
        render: (data) => (
          <StringInputComponent
            id="test"
            label={"Second name"}
            placeholder={"Second name"}
          />
        ),
      },
      {
        render: (data) => (
          <StringInputComponent
            id="reason"
            label="Underaged check"
            placeholder="Reasoning bla bla"
            renderCondition={(props) => props.age! < 18}
          />
        ),
      },
    ],
  },
];

export type BuilderFormData = {
  name?: string;
  age?: number;
  favoriteColor?: string;
  age2?: number;
  name2?: string;
  age3?: number;
  test?: string;
  reason?: string;
};

export type PageObjects = {
  heading: string;
  items: {
    render: (data: BuilderFormData) => React.ReactNode;
  }[];
}[];

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
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <DataContext.Provider value={[currentState, setCurrentState]}>
      <ValidContext.Provider value={[currentValidity, setCurrentValidity]}>
        <Box component="main" sx={{ textAlign: "center", width: "100%" }}>
          <Toolbar />
          <Box className={styles.document}>
            <DocumentHeader header={pages[currentPage].heading} />
            <div className={styles.inputs}>
              {pages[currentPage].items.map((item) =>
                item.render(currentState)
              )}
            </div>
          </Box>

          <BlobProvider document={<PdfDocument {...currentState} />}>
            {({ blob, url, loading, error }) => (
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setCurrentPage((currentPage) => currentPage - 1);
                  }}
                  value={"Back"}
                  disabled={currentPage <= 0}
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    if (currentPage < pages.length - 1) {
                      setCurrentPage((currentPage) => currentPage + 1);
                    } else {
                      const blob_url = window.URL.createObjectURL(blob!);
                      const link = document.createElement("a");
                      link.href = blob_url ?? "";
                      link.setAttribute("download", "export.pdf");
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode?.removeChild(link);
                    }
                  }}
                  disabled={currentPage < pages.length - 1 ? false : loading}
                  variant={
                    currentPage < pages.length - 1 ? "outlined" : "contained"
                  }
                >
                  {currentPage < pages.length - 1
                    ? "Next"
                    : loading
                    ? "Loading..."
                    : "Download"}
                </Button>
              </ButtonGroup>
            )}
          </BlobProvider>
        </Box>
      </ValidContext.Provider>
    </DataContext.Provider>
  );
}

export default MainContentPage;
