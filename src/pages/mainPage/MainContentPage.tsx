import {Box, Button, Toolbar} from "@mui/material";
import React, {createContext, useEffect, useState} from "react";
import StringInputComponent from "../../components/inputs/StringInputComponent.tsx";
import DocumentHeader from "../../components/DocumentHeader.tsx";
import styles from "./style.module.scss";
import StringSelectionComponent from "../../components/inputs/StringSelectionComponent.tsx";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import PdfDocument from "../../pdfExport/PdfDocument.tsx";
import NumberInputComponent from "../../components/inputs/NumberInputComponent.tsx";

export type BuilderFormData = {
    name?: string,
    age?: number,
    favoriteColor?: string
}

const defaultData: BuilderFormData = {}

export const DataContext = createContext<[BuilderFormData, React.Dispatch<React.SetStateAction<BuilderFormData>>]>([defaultData, () => {}]);

function MainContentPage() {
    const [currentState, setCurrentState] = useState<BuilderFormData>(defaultData);
    useEffect(() => {
    }, []);

    const buildPdf = (data: BuilderFormData) => {
        console.log("Building pdf with data: ", data);
    }

    return (
        <DataContext.Provider value={[currentState, setCurrentState]}>
            <Box component="main" sx={{textAlign: "center", width: "100%"}}>
                <Toolbar/>
                <Box className={styles.document}>
                    <DocumentHeader/>

                    <StringInputComponent label={"Name"} placeholder={"Toni"} id={"name"}/><br/><br/>
                    <NumberInputComponent label={"Age"} id={"age"}/><br/><br/>
                    <StringSelectionComponent label={"Favorite color"} options={["Green", "Blue", "Red", "Yellow"]} id={"favoriteColor"}/><br/><br/>
                </Box>
                <PDFDownloadLink document={<PdfDocument {...currentState}/>} fileName="somename.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
                </PDFDownloadLink>
            </Box>
            <PDFViewer>
                <PdfDocument {...currentState}/>
            </PDFViewer>
        </DataContext.Provider>
    );
}

export default MainContentPage;
