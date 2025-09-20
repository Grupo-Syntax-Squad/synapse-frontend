import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import Header from "@/shared/components/layout/Header";
import Nav from "@/shared/components/layout/Nav";

const users = [
  { id: 1, name: "João Silva", email: "joao@email.com", status: "Ativo", receiveReports: true },
  { id: 2, name: "Maria Santos", email: "maria@email.com", status: "Ativo", receiveReports: false },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", status: "Inativo", receiveReports: true },
];

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const found = users.find((u) => u.id === Number(id));
    setUser(found || null);
  }, [id]);

  if (!user) {
    return <p className="p-6">Usuário não encontrado.</p>;
  }

  const handleSave = () => {
    console.log("Usuário atualizado:", user);
    navigate("/users"); // volta para a lista de usuários
  };

  return (
    <div>
      <Header />
      <Nav />

      <div className="container mx-auto px-4 py-6 flex justify-center">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-6 text-center">Editar Usuário</h1>

          <div className="flex flex-col gap-7">
            <span className="p-float-label">
              <InputText
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full"
              />
              <label htmlFor="name">Nome</label>
            </span>

            <span className="p-float-label">
              <InputText
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full"
              />
              <label htmlFor="email">E-mail</label>
            </span>

            <span className="p-float-label">
              <Dropdown
                id="status"
                value={user.status}
                options={["Ativo", "Inativo", "Pendente"]}
                onChange={(e) => setUser({ ...user, status: e.value })}
                className="w-full"
              />
              <label htmlFor="status">Status</label>
            </span>

            <div className="flex items-center gap-2">
              <Checkbox
                inputId="receiveReports"
                checked={user.receiveReports}
                onChange={(e) => setUser({ ...user, receiveReports: e.checked })}
              />
              <label htmlFor="receiveReports">Receber relatórios</label>
            </div>

            <div className="flex gap-2 mt-4 justify-center">
              <Button label="Salvar" icon="pi pi-check" onClick={handleSave} />
              <Button
                label="Cancelar"
                icon="pi pi-times"
                severity="secondary"
                onClick={() => navigate("/users")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
