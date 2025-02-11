import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { Home, People, Apartment, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const routes = [
  { path: "/", label: "Dashboard", icon: <Home /> },
  { path: "/leads", label: "Leads", icon: <People /> },
  { path: "/properties", label: "Properties", icon: <Apartment /> },
  { path: "/settings", label: "Settings", icon: <Settings /> },
];

export const Sidebar = ({ open }: SidebarProps) => {
  return (
    <Drawer
    variant="permanent"
    sx={{
      width: open ? 240 : 64,
      flexShrink: 0,
      "& .MuiDrawer-paper": { width: open ? 240 : 64, transition: "width 0.3s" },
    }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap sx={{ display: open ? "block" : "none" }}>
        Real Estate CRM
      </Typography>
    </Toolbar>
    <List>
      {routes.map(({ path, label, icon }) => (
        <ListItemButton component={Link} to={path} key={path}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} sx={{ display: open ? "block" : "none" }} />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
  );
};