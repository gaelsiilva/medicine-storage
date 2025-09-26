'use client'

import { ChevronDown, CircleCheck, EllipsisVertical, File } from "lucide-react";
import { useState } from "react";

interface Order {
  id: number
  date: string
  status: 'pendente' | 'recebido'
  description?: string
  file?: string
}

export default function OrderCard({ order, onToggle }: { order: Order, onToggle: (id: number) => void }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative bg-white w-72 p-3 flex flex-col justify-between rounded transition-all duration-300 hover:shadow-lg 
      ${isExpanded ? 'h-auto' : 'h-24'}`}
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <CircleCheck size={20} color={order.status === 'recebido' ? 'green' : 'gray'} />
          <span className="font-medium">Pedido #{order.id}</span>
        </div>

        <EllipsisVertical
          size={20}
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="cursor-pointer"
        />
        {isMenuOpen && (
          <div className="absolute top-10 right-3 bg-white border border-gray-200 rounded shadow-md z-10">
            <button
              className="text-sm rounded py-2 px-3 cursor-pointer hover:bg-gray-100 block"
              onClick={() => {
                onToggle(order.id)
                setMenuOpen(false)
              }}
            >
              Marcar como {order.status === 'recebido' ? 'pendente' : 'recebido'}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between font-medium text-sm text-gray-500 mt-2">
        <div className={`${isExpanded ? '' : 'hidden' }`}>
          <span className="">{order.description && order.description}</span>
          <div className="bg-gray-200">
            <div className="bg-gray-300">
              <File />
            </div>

            <div>
              <span>Pedido #43124</span>
              <span>23KB</span>
            </div>
          </div>
        </div>
        <span>{order.date}</span>
        <ChevronDown
          size={20}
          className={`cursor-pointer transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          onClick={() => setExpanded(!isExpanded)}
        />
      </div>
    </div>
  );
}
