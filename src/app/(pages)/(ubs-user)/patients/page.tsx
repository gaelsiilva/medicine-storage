"use client";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import PacientCard from "@/components/cards/pacient-card";
import SearchField from "@/components/search-field";
import Button from "@/components/buttons/button";

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

export default function Patients() {
  const pacients: Pacient[] = [
    {
      id: "1",
      name: "Maria Silva",
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      address: "Rua das Flores, 123 - São Paulo",
      birthDate: "15/05/1985",
      historic: [
        {
          med: "Atorvastatina 20mg",
          qta: 1,
          date: "12/03/25",
        },
      ],
    },
    {
      id: "2",
      name: "João Santos",
      phone: "(11) 98888-8888",
      cpf: "987.654.321-00",
      address: "Av. Paulista, 1000 - São Paulo",
      birthDate: "20/09/1978",
      historic: [
        {
          med: "Atorvastatina 20mg",
          qta: 1,
          date: "12/03/25",
        },
        {
          med: "dipirona 20mg",
          qta: 2,
          date: "30/04/25",
        },
      ],
    },
    {
      id: "3",
      name: "Ana Costa",
      phone: "(11) 97777-7777",
      cpf: "456.789.123-00",
      address: "Rua Augusta, 500 - São Paulo",
      birthDate: "12/12/1990",
      historic: [
        {
          med: "Atorvastatina 20mg",
          qta: 1,
          date: "12/03/25",
        },
      ],
    },
  ];

  const [selectedPatient, setSelectedPatient] = useState<Pacient | null>(null);
  const [ isOpen, setIsOpen] = useState(false)

  const handlePatientClick = (patient: Pacient) => {
    setSelectedPatient(selectedPatient?.id === patient.id ? null : patient);
  };

  return (
    <>
    <main className="flex gap-5 p-5">
      <section className="w-1/2 space-y-5">
      <div className="flex justify-between">
        <SearchField />
        <button className="bg-light-green-base font-medium text-sm text-white py-2 px-3 rounded cursor-pointer"
        onClick={() => setIsOpen(true)}>Adicionar Paciente</button>
      </div>

      <div className="space-y-3">
          {pacients.map((patient) => (
            <PacientCard
              key={patient.id}
              patient={patient}
              isSelected={selectedPatient?.id === patient.id}
              onClick={() => handlePatientClick(patient)}
            />
        ))}
      </div>
        
      </section>

      <section className="w-1/2 bg-white py-7 px-8 rounded-lg">
        {selectedPatient ? (
          <div className="">
            <div className="font-medium space-y-3">
              <div className="flex flex-col">
                <span className="text-gray-1">Nome completo</span>
                <span className="text-gray-2">{selectedPatient?.name}</span>
              </div>

              <div>
                <div className="flex space-y-3">
                  <div className="flex flex-col w-1/2">
                    <span className="text-gray-1">Contato</span>
                    <span className="text-gray-2">
                      {selectedPatient?.phone}
                    </span>
                  </div>

                  <div className="flex flex-col w-1/2">
                    <span className="text-gray-1">CPF</span>
                    <span className="text-gray-2">{selectedPatient?.cpf}</span>
                  </div>
                </div>

                <div className="flex space-y-3">
                  <div className="flex flex-col w-1/2">
                    <span className="text-gray-1">Endereço</span>
                    <span className="text-gray-2">
                      {selectedPatient?.address}
                    </span>
                  </div>

                  <div className="flex flex-col w-1/2">
                    <span className="text-gray-1">Data de nascimento</span>
                    <span className="text-gray-2">
                      {selectedPatient?.birthDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-300 mx-5 mt-3 mb-5"></div>

            <div>
              <h3 className="font-medium mb-5">Histórico de medicamentos</h3>

              <div>
                {selectedPatient.historic.length > 0 ? (
                  <div className="space-y-3">
                    {selectedPatient.historic.map((medication, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-300"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-gray-2 font-medium text-base">
                            {medication.med}
                          </span>
                          <span className="text-gray-500 text-sm bg-blue-100 px-2 py-1 rounded">
                            {medication.qta}
                            {medication.qta === 1 ? "unidade" : "unidades"}
                          </span>
                        </div>
                        <span className="text-gray-1 text-sm">
                          Data: {medication.date}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-1 text-sm">
                      Nenhum medicamento no histórico
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-1 text-sm font-medium">
              Selecione um paciente para ver as informações
            </p>
          </div>
        )}
      </section>
    </main>

    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setIsOpen}>
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white py-6 px-10 transition-all">
                  <section className="flex flex-col gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-center">Adicionar paciente</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-start font-medium">Nome</span>
                        <input className="border border-gray-300 text-gray-500 p-2 rounded focus:outline-none focus:border-light-green-base" type="text" placeholder="Digite o nome do paciente"/>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-start font-medium">Endereço</span>
                        <input className="border border-gray-300 text-gray-500 p-2 rounded focus:outline-none focus:border-light-green-base" type="text" placeholder="Digite o endereço do paciente"/>
                      </div>

                      <div className='flex'>
                        <div className="flex flex-col gap-1 w-1/2 pr-3">
                          <span className="text-start font-medium">CPF</span>
                          <input className="border border-gray-300 text-gray-500 p-2 rounded focus:outline-none focus:border-light-green-base" type="text" placeholder="000.000.000-00"/>
                        </div>

                        <div className="flex flex-col gap-1 w-1/2">
                          <span className="text-start font-medium">Número</span>
                          <input className="border border-gray-300 text-gray-500 p-2 rounded focus:outline-none focus:border-light-green-base" type="text" placeholder="(00) 00000-0000"/>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 w-1/2 pr-3">
                        <span className="text-start font-medium">Data de nascimento</span>
                        <input className="border border-gray-300 text-gray-500 p-2 rounded focus:outline-none focus:border-light-green-base" type="text" placeholder="00/00/00"/>
                      </div>
                    </div>

                    <div className="border-t border-gray-300 mx-5 my-3"></div>

                    <div className='flex justify-end gap-3'>
                      <Button text="Cancelar" textColor="text-gray-400" color="bg-gray-200" onClick={() => setIsOpen(false)}/>
                      <Button text="Salvar" textColor="text-white" color="bg-light-green-base" />
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      </>
  );
}