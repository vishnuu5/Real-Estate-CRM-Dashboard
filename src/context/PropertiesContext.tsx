import { createContext, useContext, useState, ReactNode } from "react";

type Property = {
  id: string;
  type: "residential" | "commercial" | "land";
  location: string;
  size: number;
  budget: number;
  availability: "available" | "sold" | "pending";
};

type PropertiesContextType = {
  properties: Property[];
  updateProperty: (updatedProperty: Property) => void;
};

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export const PropertiesProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([
    { id: "1", type: "residential", location: "123 Main St", size: 2000, budget: 500000, availability: "available" },
    { id: "2", type: "commercial", location: "456 Business Ave", size: 5000, budget: 1200000, availability: "pending" },
  ]);

  const updateProperty = (updatedProperty: Property) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === updatedProperty.id ? updatedProperty : prop))
    );
  };

  return (
    <PropertiesContext.Provider value={{ properties, updateProperty }}>
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertiesProvider");
  }
  return context;
};
