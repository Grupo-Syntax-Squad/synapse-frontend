export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Ativo" | "Inativo" | "Pendente";
  receiveReports: boolean;
}
