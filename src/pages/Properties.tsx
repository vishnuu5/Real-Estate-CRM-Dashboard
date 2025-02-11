import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Building, Search } from "lucide-react";
import { useState } from "react";
import { useProperties } from "../context/PropertiesContext"; 

const Properties = () => {
  const navigate = useNavigate();
  const { properties } = useProperties();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");

 
  const filteredProperties = properties.filter(
    (property) =>
      (property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.budget.toString().includes(searchQuery)) &&
      (typeFilter === "" || property.type === typeFilter)
  );

  return (
    <DashboardLayout>
      <Box sx={{ mb: 4, marginTop: "50px" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            Properties
          </Typography>
          <Button variant="contained" onClick={() => navigate("/add-property")} startIcon={<Building />}>
            Add Property
          </Button>
        </Stack>
      </Box>

      
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: <Search size={20} />,
          }}
        />
        <FormControl fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Property Type">
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="residential">Residential</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
            <MenuItem value="land">Land</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Type</b></TableCell>
              <TableCell><b>Location</b></TableCell>
              <TableCell><b>Size (sq ft)</b></TableCell>
              <TableCell><b>Budget</b></TableCell>
              <TableCell><b>Availability</b></TableCell>
              <TableCell align="right"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell sx={{ textTransform: "capitalize" }}>{property.type}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.size}</TableCell>
                  <TableCell>${property.budget.toLocaleString()}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>{property.availability}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/properties/${property.id}/edit`)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
};

export default Properties;
