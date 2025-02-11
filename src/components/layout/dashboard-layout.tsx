import { ReactNode, useState } from "react";
import { Sidebar } from "./sidebar";
import Header from "./header";
import { Box, CssBaseline } from "@mui/material";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
      <Box sx={{ flexGrow: 1, transition: "margin 0.3s", ml: sidebarOpen ? 30 : 8, p: 3 }}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main>{children}</main>
      </Box>
    </Box>
  );
};
