import { Typography, Container } from "@mui/material";

const NotFound = () => {
  return (
    <Container sx={{ textAlign: "center", marginTop: "10%" }}>
      <Typography variant="h4" color="error">404 - Page Not Found</Typography>
      <Typography variant="body1">The page you're looking for doesn't exist.</Typography>
    </Container>
  );
};

export default NotFound;
