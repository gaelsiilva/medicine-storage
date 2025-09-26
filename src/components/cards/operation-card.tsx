"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  EllipsisVertical,
  ShieldQuestion,
  SquareArrowDown,
  SquareArrowUp,
} from "lucide-react";

interface OperationProps {
  date: string;
  dateV: string;
  med: string;
  quant: number;
  down?: boolean;
  pacient: string;
  responsible: string;
}

export default function OperationCard({
  date,
  dateV,
  med,
  quant,
  down,
  pacient,
  responsible,
}: OperationProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="h-9 flex items-center border-b border-b-gray-300 text-sm relative">
        <span className="px-5">
          {down ? (
            <SquareArrowDown size={23} color="#CE1D1D" />
          ) : (
            <SquareArrowUp size={23} color="#16B847" />
          )}
        </span>

        <span className="w-72">
          <p>{med}</p>
        </span>

        <span className="w-40">
          <p>{date}</p>
        </span>

        <span className="w-72">
          <p>{responsible}</p>
        </span>

        <span className="px-3 font-medium">
          <p className={`${down ? "text-red-600" : "text-green-600"}`}>
            {down ? `- ${quant}` : `+ ${quant}`}
          </p>
        </span>

        <span className="ml-auto mr-5 relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center cursor-pointer"
          >
            <EllipsisVertical size={20} color="#9d9d9d" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-2 mt-2 w-32 font-medium bg-white rounded shadow-xl z-10">
              <button
                className="w-full text-left h-9 px-2 hover:bg-gray-100 text-sm cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Detalhes
              </button>

              <button
                className="w-full text-left px-2 h-9 hover:bg-gray-100 text-sm text-red-600 cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsConfirmOpen(true);
                }}
              >
                Cancelar
              </button>
            </div>
          )}
        </span>
      </div>

      <Transition appear show={isConfirmOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setIsConfirmOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-center transition-all">
                  <div className="flex flex-col justify-center">
                    <div className="mb-5">
                      <div className="flex flex-col">
                        <div className="mx-auto mb-3">
                          <ShieldQuestion size={30} color="#CE1D1D" />
                        </div>

                        <h3 className="font-semibold text-xl">
                          Tem certeza que deseja cancelar essa operação?
                        </h3>
                      </div>

                      <p className="text-sm text-gray-2 my-2">
                        Executar essa função fará com que as informações dessa operação sejam permanentemente apagadas, voltando a ser como antes.
                      </p>
                      <span className="text-xs text-gray-1">
                        Essa ação pode demorar um momento...
                      </span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <button
                        className="w-40 bg-gray-200 text-gray-3 py-3.5 rounded cursor-pointer hover:bg-gray-300 transition-all"
                        onClick={() => setIsConfirmOpen(false)}
                      >
                        Nâo, voltar
                      </button>
                      <button
                        className="w-40 bg-red-600 text-white py-3.5 rounded cursor-pointer hover:bg-red-700 transition-all"
                        onClick={() => setIsConfirmOpen(false)}
                      >
                        Sim, cancelar
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
