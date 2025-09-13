import { type FC, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../../assets/logo.png";

const Header: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ backgroundColor: "#42009F" }} className="bg-blue-500 shadow-md sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="text-white text-lg font-bold">Synapse</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
