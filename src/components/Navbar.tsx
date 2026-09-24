import { NavLink } from "react-router-dom";
import { Dumbbell, ListChecks, Calendar } from "lucide-react";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Entrenar", to: "/", icon: <Dumbbell size={20} /> },
  { label: "Ejercicios", to: "/ejercicios", icon: <ListChecks size={20} /> },
  { label: "Control", to: "/control", icon: <Calendar size={20} /> },
];

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-4xl mx-auto flex justify-around sm:justify-center sm:gap-10 px-4 py-2">
        {navItems.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
