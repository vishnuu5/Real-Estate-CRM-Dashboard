import { AppBar, Toolbar, IconButton, InputBase, Box } from "@mui/material";
import { Menu, Search, Notifications, AccountCircle } from "@mui/icons-material";

// Define type for props
interface HeaderProps {
  onMenuClick: () => void; // Function type that doesn't return anything
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white", color: "black", zIndex: 1201 }}>
      <Toolbar>
        {/* Menu button */}
        <IconButton edge="start" onClick={onMenuClick}>
          <Menu />
        </IconButton>

        {/* Search input */}
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            maxWidth: 400,
            bgcolor: "#f0f0f0",
            p: 1,
            borderRadius: 2,
          }}
        >
          <Search />
          <InputBase placeholder="Search..." fullWidth sx={{ ml: 1 }} />
        </Box>

        {/* Notification & Profile Icons */}
        <IconButton sx={{
            p: 1,
            marginLeft: 100
          }}>
          <Notifications />
        </IconButton>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
