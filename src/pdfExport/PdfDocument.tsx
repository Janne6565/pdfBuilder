import {BuilderFormData} from "../pages/mainPage/MainContentPage.tsx";
import TelekomLogo from "../assets/telekomWhiteLogo.png";
import {Document, Page, View, Text, StyleSheet, Svg, G, Path, Image} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    heading: {
        paddingTop: "20px",
        fontSize: "35px"
    },
    subHeading: {
        fontSize: "15px"
    },
    header: {
        width: "100%",
        backgroundColor: "#E20074",
        color: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    telekomIcon: {
        width: "40px",
        padding: "10px",
        paddingLeft: "20px",
    },
    documentBody: {
        width: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px"
    }
});

function PdfDocument(props: BuilderFormData) {
    return <Document>
        <Page size="A4">
            <View style={styles.page}>
                <View style={styles.header}>
                    <Image source={TelekomLogo} style={styles.telekomIcon}/>
                    <Text>Telekom</Text>
                </View>
                <View style={styles.documentBody}>
                    <Text style={styles.heading}>Telekom Rechnung</Text>
                    <Text style={styles.subHeading}>Name: {props.name}</Text>
                    <Text style={styles.subHeading}>Alter: {props.age}</Text>
                    <Text style={styles.subHeading}>Lieblingsfarbe: {props.favoriteColor}</Text>
                </View>
            </View>
        </Page>
    </Document>
}

export default PdfDocument;