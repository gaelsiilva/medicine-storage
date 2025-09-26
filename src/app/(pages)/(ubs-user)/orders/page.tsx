'use client'

import { useState } from 'react'
import OrderSection from '@/components/order-section'
import SearchField from '@/components/search-field'

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<'pendentes' | 'recebidos'>('pendentes')

  return (
    <main className="max-w-full">
      <section className='flex justify-between mt-2'>
        <div className="flex space-x-4 px-5">
          <button
            className={`
              h-9 px-4 rounded-t text-sm font-medium transition-colors duration-300 cursor-pointer
              ${selectedTab === 'pendentes'
                ? 'bg-light-green-base text-white'
                : 'bg-gray-200 text-gray-400 hover:bg-gray-300'}
            `}
            onClick={() => setSelectedTab('pendentes')}
          >
            Pendentes
          </button>

          <button
            className={`
              h-9 px-4 rounded-t text-sm font-medium transition-colors duration-300 cursor-pointer
              ${selectedTab === 'recebidos'
                ? 'bg-light-green-base text-white'
                : 'bg-gray-200 text-gray-400 hover:bg-gray-300'}
            `}
            onClick={() => setSelectedTab('recebidos')}
          >
            Recebidos
          </button>
        </div>
      </section>

      <section className="flex flex-col w-full h-full border-t border-t-gray-300 bg-gray-100">
        <div className="mx-5 my-4">
          <SearchField />
        </div>

        <OrderSection selectedTab={selectedTab} />
      </section>
    </main>
  )
}
