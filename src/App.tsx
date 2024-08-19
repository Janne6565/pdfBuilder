import { Box, CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar.tsx";
import MainContentPage from "./pages/mainPage/MainContentPage.tsx";


function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar />
      <nav></nav>
      <MainContentPage />
    </Box>
  );
}

export default App;
