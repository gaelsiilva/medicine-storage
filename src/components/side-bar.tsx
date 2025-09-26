"use client";

import {
  ChartColumnIncreasing,
  Package,
  TableProperties,
  History,
  Users,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarLink from "./sibe-bar-link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  return (
    <aside
      className={`h-screen sticky top-0 bg-white py-3 border-r border-r-gray-300 transition-all ${
        isOpen ? "w-64" : "w-20"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`flex h-10 justify-between items-center ${isOpen && "px-5"}`}
      >
        {isOpen && <div className="flex space-x-4"></div>}
      </div>

      <nav
        className={`flex-1 flex flex-col gap-1 ${
          !isOpen && "px-3"
        } transition-all`}
      >
        <SidebarLink
          icon={ChartColumnIncreasing}
          text="Estatísticas"
          href="/"
          active={path === "/"}
          open={isOpen}
        />
        <SidebarLink
          icon={TableProperties}
          text="Estoque"
          href="/table"
          active={path === "/table"}
          open={isOpen}
        />
        <SidebarLink
          icon={Package}
          text="Pedidos"
          href="/orders"
          active={path === "/orders"}
          open={isOpen}
        />
        <SidebarLink
          icon={Users}
          text="Pacientes"
          href="/patients"
          active={path === "/patients"}
          open={isOpen}
        />
        <SidebarLink
          icon={History}
          text="Operações"
          href="/operations"
          active={path === "/operations"}
          open={isOpen}
        />
      </nav>
    </aside>
  );
}
