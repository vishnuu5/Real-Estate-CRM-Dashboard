import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button, Grid, Typography, Box, TextField, Card, CardContent, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserPlus, Edit, Delete } from "lucide-react";
import { useSnackbar } from "notistack";


type Lead = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  file: string | null;
};

const Leads = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    setLeads(storedLeads);
  }, []);

  const handleDelete = (id: string) => {
    const updatedLeads = leads.filter((lead) => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    enqueueSnackbar("Lead deleted successfully.", { variant: "success" });
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-lead/${id}`);
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery)
  );

  return (
    <DashboardLayout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, marginTop: "50px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h5" fontWeight="600">Leads</Typography>
            <Typography variant="body2" color="textSecondary">
              View and manage your leads here.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" startIcon={<UserPlus />} onClick={() => navigate("/add-lead")}>
              Add Lead
            </Button>
          </Box>
        </Box>

        <TextField
          label="Search Leads"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Grid container spacing={2}>
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead: Lead) => (
              <Grid item xs={12} sm={6} md={4} key={lead.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{lead.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{lead.phone}</Typography>
                    <Typography variant="caption" color="textSecondary">Created: {lead.createdAt}</Typography>
                    {lead.file && (
                      <Box mt={2}>
                        <Typography variant="body2">File:</Typography>
                        {lead.file.startsWith("data:image") ? (
                        <img src={lead.file} alt="Uploaded File" width={150} />
                        ) : (
                        <a href={lead.file} download={`Lead-${lead.id}`} target="_blank" rel="noopener noreferrer">
                           Download File
                        </a>
                       )}
                      </Box>
                    )}
                    <Box display="flex" justifyContent="space-between" marginTop={2}>
                      <IconButton color="primary" onClick={() => handleEdit(lead.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(lead.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No leads found</Typography>
          )}
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default Leads;
