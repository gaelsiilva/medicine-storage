"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import Button from "../buttons/button";

export default function EntryModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const medicamentos = [
    "Paracetamol",
    "Dipirona",
    "Amoxicilina",
    "Ibuprofeno",
    "Omeprazol",
    "Losartana",
    "Metformina",
    "Atorvastatina",
    "Hidroclorotiazida",
    "Cetoprofeno",
  ];

  const [filter, setFilter] = useState("");
  const [showSelect, setshowSelect] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredMed = medicamentos.filter((med) =>
    med.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEscolha = (valor: string) => {
    setFilter(valor); 
    setshowSelect(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden py-6 px-10 rounded bg-white text-left shadow-xl">
              <Dialog.Title className="text-lg font-medium text-center">
                Entrada de Medicamento
              </Dialog.Title>
              <form className="flex flex-col gap-3 mt-5">
                <div className="flex flex-col gap-2 relative" ref={containerRef}>
                  <span className="text-start font-medium">Medicamento</span>
                  <input
                    type="text"
                    className="border border-gray-300 text-gray-500 p-2 rounded focus:outline-none focus:border-light-green-base"
                    placeholder="Selecione o medicamento"
                    value={filter}
                    onChange={(e) => {
                      setFilter(e.target.value);
                      setshowSelect(true);
                    }}
                    onFocus={() => setshowSelect(true)}
                  />
                  {showSelect && (
                    <select
                      className="absolute top-full h-auto left-0 w-full border border-gray-200 rounded mt-1 bg-white shadow-md z-50"
                      size={3}
                      onChange={(e) => handleEscolha(e.target.value)}
                    >
                      {filteredMed.length > 0 ? (
                        filteredMed.map((med, i) => (
                          <option className='p-2 hover:bg-gray-200 cursor-pointer checked:bg-gray-400' key={i} value={med}>
                            {med}
                          </option>
                        ))
                      ) : (
                        <option disabled>Nenhum medicamento encontrado</option>
                      )}
                    </select>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex">
                    <div className="w-1/2 flex flex-col gap-1 pr-3">
                      <span className="font-medium">Lote</span>
                      <input
                        className="border border-gray-300 text-gray-500 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                        type="text"
                        placeholder="#000000"
                      />
                    </div>

                    <div className="w-1/2 flex flex-col gap-1 mr-3">
                      <span className="font-medium">Data de validade</span>
                      <input
                        className="border border-gray-300 text-gray-500 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                        type="text"
                        placeholder="00/00/00"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 w-1/2 pr-3">
                    <span className="font-medium">Quantidade</span>
                    <input
                      className="border border-gray-300 text-gray-500 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                      type="text"
                      placeholder="Qta: 0"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-300 mx-5 my-3"></div>

                <div className='flex justify-end gap-3'>
                  <Button text="Cancelar" textColor="text-gray-400" color="bg-gray-200" onClick={onClose}/>
                  <Button text="Salvar" textColor="text-white" color="bg-light-green-base" />
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
