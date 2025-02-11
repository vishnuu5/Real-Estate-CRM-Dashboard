import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Typography,
  Container,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AddProperty = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    size: "",
    budget: "",
    availability: "available",
    description: "",
  });

  const validateForm = () => {
    if (!formData.type) return setFormError("Property type is required");
    if (!formData.location.trim()) return setFormError("Location is required");
    if (!formData.size || Number(formData.size) <= 0) return setFormError("Please enter a valid size");
    if (!formData.budget || Number(formData.budget) <= 0) return setFormError("Please enter a valid budget");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) return;

    try {
      alert("Property has been created successfully.");
      navigate("/properties");
    } catch (error) {
      setFormError("Failed to create property");
    }
  };

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select dropdown changes
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormError(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Add New Property
        </Typography>
      </Box>
      {formError && <Alert severity="error">{formError}</Alert>}
      <Box component="form" onSubmit={handleSubmit} mt={3} display="flex" flexDirection="column" gap={2}>
        <FormControl fullWidth>
          <InputLabel>Property Type</InputLabel>
          <Select name="type" value={formData.type} onChange={handleSelectChange}>
            <MenuItem value="residential">Residential</MenuItem>
            <MenuItem value="commercial">Commercial</MenuItem>
            <MenuItem value="land">Land</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Location" name="location" value={formData.location} onChange={handleInputChange} required />
        <TextField label="Size (sq ft)" name="size" type="number" value={formData.size} onChange={handleInputChange} required />
        <TextField label="Budget" name="budget" type="number" value={formData.budget} onChange={handleInputChange} required />
        <FormControl fullWidth>
          <InputLabel>Availability</InputLabel>
          <Select name="availability" value={formData.availability} onChange={handleSelectChange}>
            <MenuItem value="available">Available</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="sold">Sold</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} multiline rows={3} />
        <Button type="submit" variant="contained" color="primary">
          Add Property
        </Button>
      </Box>
    </Container>
  );
};

export default AddProperty;
