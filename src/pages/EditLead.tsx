import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

type Lead = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  file: string | null;
};

const EditLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [lead, setLead] = useState<Lead>({
    id: "",
    name: "",
    phone: "",
    createdAt: "",
    file: null,
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);

  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    const existingLead = storedLeads.find((l: Lead) => l.id === id);

    if (!existingLead) {
      enqueueSnackbar("Lead not found!", { variant: "error" });
      navigate("/");
    } else {
      setLead(existingLead);
      if (existingLead.file) {
        setFilePreview(existingLead.file);
      }
    }
  }, [id, navigate, enqueueSnackbar]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64File = reader.result as string;
        setFilePreview(base64File);
        setLead({ ...lead, file: base64File });
      };
      reader.readAsDataURL(file);
    }
  };
  

  const handleUpdate = () => {
    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    const updatedLeads = storedLeads.map((l: Lead) =>
      l.id === id ? { ...l, name: lead.name, phone: lead.phone, file: lead.file } : l
    );
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    enqueueSnackbar("Lead updated successfully!", { variant: "success" });
    navigate("/leads");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <Typography variant="h5">Edit Lead</Typography>
      <TextField
        label="Name"
        fullWidth
        value={lead.name}
        onChange={(e) => setLead({ ...lead, name: e.target.value })}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Phone"
        fullWidth
        value={lead.phone}
        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
        sx={{ mt: 2 }}
      />

      {/* File Upload */}
      <Typography variant="body1" sx={{ mt: 2 }}>Upload File:</Typography>
      <input type="file" onChange={handleFileChange} />

     
      {filePreview && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">File Preview:</Typography>
          <img src={filePreview} alt="Uploaded File" width={150} />
        </Box>
      )}

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpdate}>
        Update Lead
      </Button>
    </Box>
  );
};

export default EditLead;
