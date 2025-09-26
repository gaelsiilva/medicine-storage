import Link from "next/link";
import { ElementType } from "react";

interface LinkProps {
  icon: ElementType;
  text: string;
  href: string;
  active: boolean;
  open: boolean;
}

export default function SidebarLink({
  icon: Icon,
  text,
  href,
  active,
  open,
}: LinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center py-2.5 px-3 w-full font-medium cursor-pointer
          transition-all group
          ${
            active
              ? "bg-light-green-base shadow-xs text-white"
              : "text-gray-1 hover:text-light-green-base duration-300"
          }
          ${!open && "rounded-md"} 
          hover:brightness-90
        `}
    >
      <div
        className={`flex items-center overflow-hidden ${open ? "px-3" : ""}`}
      >
        <span className={`${open ? "" : "ml-0.5"}`}>
          <Icon />
        </span>

        <span
          className={`ml-3 text-sm font-medium truncate transition-all duration-300 ${
            open ? "w-auto" : "w-0 hidden"
          }`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
}
