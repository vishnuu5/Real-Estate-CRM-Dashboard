import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent, // ✅ Import SelectChangeEvent from MUI
} from "@mui/material";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useProperties } from "@/context/PropertiesContext"; // ✅ Import context

const EditProperty = () => {
  const { id } = useParams(); // Get property ID from URL
  const { properties, updateProperty } = useProperties(); // ✅ Get context data
  const navigate = useNavigate();

  // Find the property by ID
  const property = properties.find((p) => p.id === id);
  if (!property) {
    return (
      <DashboardLayout>
        <Typography variant="h6" color="error">
          Property not found!
        </Typography>
      </DashboardLayout>
    );
  }

  const [formData, setFormData] = useState(property);

  // ✅ Fix: Ensure event target has a `name` property
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Fix: Use `SelectChangeEvent` for MUI Select components
  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    updateProperty(formData); // ✅ Update the shared state
    navigate("/properties"); // ✅ Redirect after saving
  };

  return (
    <DashboardLayout>
      <Box sx={{ mt: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Edit Property
        </Typography>
        <Stack spacing={2}>
          <TextField name="location" label="Location" fullWidth value={formData.location} onChange={handleChange} />
          <TextField name="size" label="Size (sq ft)" fullWidth type="number" value={formData.size} onChange={handleChange} />
          <TextField name="budget" label="Budget" fullWidth type="number" value={formData.budget} onChange={handleChange} />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select name="type" value={formData.type} onChange={handleSelectChange}>
              <MenuItem value="residential">Residential</MenuItem>
              <MenuItem value="commercial">Commercial</MenuItem>
              <MenuItem value="land">Land</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Availability</InputLabel>
            <Select name="availability" value={formData.availability} onChange={handleSelectChange}>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleSave}>Save Changes</Button>
            <Button variant="outlined" onClick={() => navigate("/properties")}>Cancel</Button>
          </Stack>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default EditProperty;
