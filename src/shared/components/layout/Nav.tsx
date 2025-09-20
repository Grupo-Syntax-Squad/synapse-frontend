import type { FC } from "react";
import { NavLink } from "react-router-dom";
import "datatables.net-dt";


const Nav: FC = () => {
  const links = [
    { name: "Relatórios", path: "/reports" },
    { name: "Usuários", path: "/users" },
    // { name: "Chatbot", path: "/chatbot" },
    { name: "Configurações", path: "/settings" }
  ];


  return (
    <>
    <p className="text-2xl font-bold underline decoration-violet-900 p-5">Bem Vindo(a)!</p>
      <nav className="text-black px-6 py-3">
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.path}>
            <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-violet-900 transition ${
                    isActive ? "font-semibold text-violet-900 underline decoration-violet-900" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
