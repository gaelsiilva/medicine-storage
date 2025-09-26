'use client';

import OperationCard from '@/components/cards/operation-card';
import SearchField from '@/components/search-field';

export default function Operations(){
    return (
      <main>
        <div className='my-2 mx-5'>
          <SearchField />
        </div>

        <div className="bg-gray-200 w-full h-9 pl-16 flex items-center text-gray-4 text-sm font-medium">
          <span className='w-72'>Medicamento</span>
          <span className='w-40'>Data de lançamento</span>
          <span className='w-72'>Responsável</span>
          <span className=''>Quantidade</span>
        </div>

        <section className='bg-white'>
          <OperationCard responsible='responsavel@gmail.com' pacient='nome do paciente 1' date='00/00/00 - 00:00' dateV='00/00/00' med='medicamento 1' quant={60}  down />
          <OperationCard responsible='responsavel@gmail.com' pacient='nome do paciente 1' date='00/00/00 - 00:00' dateV='00/00/00' med='medicamento 1' quant={60}   />
          <OperationCard responsible='responsavel@gmail.com' pacient='nome do paciente 1' date='00/00/00 - 00:00' dateV='00/00/00' med='medicamento 1' quant={60}   />
        </section>
      </main>
    );
}