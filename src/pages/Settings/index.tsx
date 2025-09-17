import { FC, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import Nav from "@/shared/components/layout/Nav";
import Header from "@/shared/components/layout/Header";

const Settings: FC = () => {
  const [frequency, setFrequency] = useState<string | null>(null);

  const options = [
    { label: "Diariamente", value: "daily" },
    { label: "Semanalmente", value: "weekly" },
    { label: "Mensalmente", value: "monthly" }
  ];

  const handleSave = () => {
    console.log("Selected frequency:", frequency);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
    <Header />
      <Nav />
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Frequência de envio de relatórios</h2>

      <Dropdown
        value={frequency}
        onChange={(e) => setFrequency(e.value)}
        options={options}
        placeholder="Selecione a frequência"
        className="w-full mb-6"
      />

      <div className="flex gap-4">
        <Button label="Save Changes" className="p-button-success" onClick={handleSave} />
        <Button label="Back" className="p-button-secondary" onClick={handleBack} />
      </div>
    </div>
    </>
  );
};

export default Settings;
