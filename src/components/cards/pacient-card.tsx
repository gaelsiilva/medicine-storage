import { ArrowRight, UserRound } from "lucide-react";

interface Pacient {
  id: string;
  name: string;
  phone: string;
  cpf: string;
  address: string;
  birthDate: string;
  historic: Medication[];
}

interface Medication {
  med: string;
  qta: number;
  date: string;
}

interface PacientCardProps {
  patient: Pacient;
  isSelected: boolean;
  onClick: () => void;
}

export default function PacientCard({
  patient,
  isSelected,
  onClick,
}: PacientCardProps) {
  return (
    <div
      className={` flex justify-between items-center py-3 px-6 rounded hover:bg-light-green-base/5 transition-all 
        ${isSelected ? "bg-light-green-base/10" : "bg-white"}`}
    >
      <div className="flex items-center gap-6 font-medium">
        <UserRound size={25} color="#9d9d9d" />

        <div className="flex flex-col gap-0.5">
          <span className="text-gray-2">{patient.name}</span>
          <span className="text-gray-1 text-sm">{patient.phone}</span>
        </div>
      </div>

      <div className="cursor-pointer" onClick={onClick}>
        <ArrowRight size={25} color="#9d9d9d" />
      </div>
    </div>
  );
}
