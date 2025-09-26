import { Search } from "lucide-react";

export default function SearchField() {
  return (
    <div className="relative w-80 bg-white cursor-pointer text-sm">
      <Search
        size={20}
        color="#9D9D9D"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      />
      <input
        className="w-full pl-10 pr-3 h-9 border border-gray-300 focus:outline focus:outline-light-green-base rounded"
        type="text"
        placeholder="Pesquise por nome, codigo..."
      />
    </div>
  );
}
