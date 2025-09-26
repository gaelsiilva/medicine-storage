import { useState } from 'react'
import OrderCard from '@/components/cards/order-card';

interface Order {
  id: number
  date: string
  status: 'pendente' | 'recebido'
  description?: string
  file?: string
}

const initialOrders: Order[] = [
  { id: 11423, date: '23/12/25', status: 'pendente', description:'fboaiusdgfpiuEW' },
  { id: 2462, date: '23/12/25', status: 'pendente', description:'fboaiusdgfpgfoiuawe eufghPIDWUGF uefgpiudsgfiuEW' },
  { id: 37648, date: '23/12/25', status: 'recebido', description:'fbIFUGPIWE Sufgpieugdfiu udfpdusg oaiusdgfpiuEW' },
]

export default function OrderSection({ selectedTab }: { selectedTab: 'pendentes' | 'recebidos' }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const toggleStatus = (id: number) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, status: order.status === 'pendente' ? 'recebido' : 'pendente' }
          : order
      )
    )
  }

  const filteredOrders = orders.filter(order =>
    selectedTab === 'pendentes' ? order.status === 'pendente' : order.status === 'recebido'
  )

  return (
    <div className="flex mx-5 gap-3 flex-wrap">
      {filteredOrders.length === 0 && (
        <p className="text-gray-500">Nenhum pedido {selectedTab}.</p>
      )}
      {filteredOrders.map(order => (
        <OrderCard key={order.id} order={order} onToggle={toggleStatus} />
      ))}
    </div>
  )
}
