import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@mui/material"; 
import { useNavigate } from "react-router-dom";
import { UserPlus, Building } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" , marginTop: "30px"}}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "600" }}>Welcome back</h1>
            <p style={{ color: "#6b7280" }}>Here's an overview of your CRM today.</p>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <Button variant="contained" startIcon={<UserPlus />} onClick={() => navigate("/add-lead")}>
              Add Lead
            </Button>
            <Button variant="contained" startIcon={<Building />} onClick={() => navigate("/add-property")}>
              Add Property
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
