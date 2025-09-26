interface MedicineProps {
  id: number;
  name: string;
  unit: string;
  date: string;
  balance: number;
}

interface TableProps {
  data: MedicineProps[];
}

export default function Table({ data }: TableProps) {
  return (
    <section className="w-full bg-white">
      <div className="bg-gray-200 flex items-center text-sm text-gray-4 text-start font-medium h-9">
        <div className="w-24 pl-6">ID</div>
        <div className="w-68 pl-2">Nome</div>
        <div className="w-40 pl-2">Unidade</div>
        <div className="w-36 pl-2">Data de validade</div>
        <div className="w-28 pl-2">Saldo</div>
      </div>

      <div>
        {data.map((item) => (
          <div
            className="flex text-start text-sm h-7 border-b border-b-gray-300"
            key={item.id}
          >
            <span className="w-24 flex items-center h-7 pl-6 border-r border-r-gray-300">
              {item.id}
            </span>
            <span className="w-68 h-7 pl-2 flex items-center border-r border-r-gray-300">
              {item.name}
            </span>
            <span className="w-40 h-7 pl-2 flex items-center border-r border-r-gray-300">
              {item.unit}
            </span>
            <span className="w-36 h-7 pl-2 flex items-center border-r border-r-gray-300">
              {item.date}
            </span>
            <span className="w-28 h-7 pl-2 flex items-center">260</span>
          </div>
        ))}
      </div>
    </section>
  );
}
