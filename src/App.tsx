import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddLead from "./pages/AddLead";
import AddProperty from "./pages/AddProperty";
import Leads from "./pages/Leads";
import EditLead from "./pages/EditLead";
import Properties from "./pages/Properties";
import EditProperty from "@/pages/EditProperty";
import { PropertiesProvider } from "@/context/PropertiesContext";

const queryClient = new QueryClient();


const theme = createTheme({
  palette: {
    mode: "light", 
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <PropertiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/add-lead" element={<AddLead />} />
            <Route path="/edit-lead/:id" element={<EditLead />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id/edit" element={<EditProperty />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </PropertiesProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
