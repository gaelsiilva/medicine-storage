import { ElementType } from "react";

interface ButtonProps {
  icon?: ElementType;
  text?: string;
  color?: string;
  textColor: string;
  onClick?: () => void;
}

export default function Button({
  icon: Icon,
  text,
  color,
  textColor,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${color} flex items-center hover:brightness-90 rounded cursor-pointer transition-all duration-300
    ${Icon ? "gap-2 px-2.5 h-10" : "px-3.5 h-9"}`}
      onClick={onClick}
    >
      {Icon && <Icon size={20} color="white" />}
      <span className={`${textColor} text-sm`}>{text}</span>
    </button>
  );
}
