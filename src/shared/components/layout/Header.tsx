import { type FC, useState, useRef } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { OverlayPanel } from "primereact/overlaypanel";
import logo from "../../../assets/logo.png";

const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const op = useRef<OverlayPanel>(null);

  const handleLogout = () => {
    console.log("Logout clicado!");
  };

  return (
    <header
      style={{ backgroundColor: "#42009F" }}
      className="shadow-md sticky top-0 z-50"
    >
      <div className="px-4 py-3 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-white text-lg font-bold">Synapse</span>
        </div>

        <div
          className="flex items-center gap-2 text-white cursor-pointer"
          onClick={(e) => op.current?.toggle(e)}
        >
          <User className="w-5 h-5" />
          <span>Admin</span>
        </div>

        <OverlayPanel ref={op}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            <LogOut className="w-4 h-4 text-red-600" />
            <span>Sair</span>
          </button>
        </OverlayPanel>
      </div>
    </header>
  );
};

export default Header;
