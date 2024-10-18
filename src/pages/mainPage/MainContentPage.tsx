import { Box, Button, ButtonGroup, Toolbar } from "@mui/material";
import React, { createContext, useState } from "react";
import StringInputComponent from "../../components/inputs/StringInputComponent.tsx";
import DocumentHeader from "../../components/DocumentHeader.tsx";
import styles from "./style.module.scss";
import StringSelectionComponent from "../../components/inputs/StringSelectionComponent.tsx";
import { BlobProvider } from "@react-pdf/renderer";
import PdfDocument from "../../pdfExport/PdfDocument.tsx";
import NumberInputComponent from "../../components/inputs/NumberInputComponent.tsx";
import InfoButton from "../../components/infoButton/infoButton.tsx";
import ExportButton from "../../components/exportButton/ExportButton.tsx";

const pages: PageObjects = [
  {
    heading: "Page 1",
    items: [
      {
        render: (props) => (
          <StringSelectionComponent
            label={"Erweiterter Modus"}
            options={["An", "Aus"]}
            id={"advancedMode"}
          />
        ),
      },
      {
        render: (props) => (
          <div style={{ display: "flex" }}>
            <StringInputComponent
              label={"Name " + props.age}
              placeholder={"Name"}
              id={"name"}
            />
            <InfoButton
              label={""}
              dialogue={{
                heading: "Hier ist das Info heading",
                textValue: "Beschreibung von feature ... ",
              }}
            ></InfoButton>
          </div>
        ),
      },
      {
        render: (props) => (
          <NumberInputComponent
            label={"Geburtsjahr"}
            id={"birthyear"}
            defaultValue={2000}
          />
        ),
      },
      {
        render: (props) => (
          <>
            {props.advancedMode == "An" ? (
              <>Alter: {2024 - props.birthyear!}</>
            ) : (
              <></>
            )}
          </>
        ),
      },
      {
        render: (props) => (
          <NumberInputComponent
            label={"Age Older"}
            id={"age3"}
            defaultValue={0}
            renderCondition={(props) => props.name?.startsWith("j") ?? false}
          />
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
  var_uplift_indirect_Cost?: number;
  age?: number;
  favoriteColor?: string;
  age2?: number;
  name2?: string;
  age3?: number;
  test?: string;
  reason?: string;
  advancedMode?: string;
  birthyear?: number;
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
                {currentPage < pages.length - 1 ? (
                  <Button
                    onClick={() => {
                      setCurrentPage((currentPage) => currentPage + 1);
                    }}
                    variant={"outlined"}
                  >
                    Next
                  </Button>
                ) : (
                  <ExportButton data={currentState}/>
                )}
              </ButtonGroup>
        </Box>
      </ValidContext.Provider>
    </DataContext.Provider>
  );
}

export default MainContentPage;
