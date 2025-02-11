import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Alert,
  Container,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSnackbar } from "notistack";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const AddLead = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [formError, setFormError] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setFormError("Phone number is required");
      return false;
    }
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result as string;
        setFilePreview(base64File);
        setFileData(base64File);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
  
    if (!validateForm()) return;
  
    const newLead = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      createdAt: new Date().toISOString().split("T")[0],
      file: fileData, // Store Base64 file
    };
  
    const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    localStorage.setItem("leads", JSON.stringify([...existingLeads, newLead]));
  
    enqueueSnackbar("Lead has been created successfully.", { variant: "success" });
    navigate("/leads");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormError(null);
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <DashboardLayout>
      <Container maxWidth="sm">
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold">
            Add New Lead
          </Typography>
        </Box>

        {formError && <Alert severity="error">{formError}</Alert>}

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              required
            />

            <TextField
              id="phone"
              label="Phone Number"
              type="tel"
              variant="outlined"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* File Upload */}
            <Typography variant="body1">Upload File:</Typography>
            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />

            {/* File Preview */}
            {filePreview && (
              <Box mt={2}>
                <Typography variant="body2">File Preview:</Typography>
                {filePreview.startsWith("data:image") ? (
                  <img src={filePreview} alt="Uploaded File" width={150} />
                ) : (
                  <a href={filePreview} download="uploaded-file">
                    Download File
                  </a>
                )}
              </Box>
            )}

            <Button type="submit" variant="contained" color="primary">
              Add Lead
            </Button>
          </Box>
        </form>
      </Container>
    </DashboardLayout>
  );
};

export default AddLead;
