'use client';

import Button from "@/components/buttons/button";
import SearchField from "@/components/search-field";
import Table from "@/components/stock-table";
import { ArrowDownUp, FileSymlink, Filter, Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import jsPDF from "jspdf";

interface Medicine {
  id: number;
  name: string;
  unit: string;
  date: string;
  balance: number;
}

const medicines: Medicine[] = [
  { id: 1, name: "Dipirona", unit: "Comprimido", date: "2025-12-01", balance: 260 },
  { id: 2, name: "Ibuprofeno", unit: "Cápsula", date: "2025-08-10", balance: 120 },
  { id: 3, name: "Paracetamol", unit: "Comprimido", date: "2024-11-05", balance: 300 },
];

export default function Tables() {
  const [isActiveFilter, setIsActiveF] = useState(false);
  const [isActiveReverse, setIsActiveR] = useState(false);
  const [pdfName, setPdfName] = useState<string>("");
  const [pdfSize, setPdfSize] = useState<number | null>(null);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [description, setDescription] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const generatePdf = () => {
    const today = new Date();
    const dia = String(today.getDate()).padStart(2, '0');
    const mes = String(today.getMonth() + 1).padStart(2, '0');
    const ano = today.getFullYear();
    const fileName = `pedido #${dia}-${mes}-${ano}.pdf`;
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text(`Pedido do dia ${dia}/${mes}/${ano}`, 10, 10);

    medicines.forEach((med, index) => {
      const qtd=quantities[med.id] || 0; 
      doc.text(
        `${med.id} - ${med.name} (${med.unit}) - Saldo: ${med.balance} | Solicitado: ${qtd}`, 10, 30 + index * 10
      );
    });

    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url); 

    setPdfSize((pdfBlob.size / 1024).toFixed(2) as unknown as number);

    setPdfName(fileName);
  };

  const handleQuantityChange = (id: number, value: string) => {
    const numberValue = parseInt(value) || 0;
    setQuantities(prev => ({ ...prev, [id]: numberValue }));
  };

  const handleFormSubmit = () => {
    generatePdf(); 
    setIsFormModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleSubmit = () => {
    setIsConfirmModalOpen(false);
    setIsSecurityModalOpen(true);
  };

  const handleSecurityConfirm = () => {
    setIsSecurityModalOpen(false);
    alert("pedido enviado");
    setDescription("");
    setQuantities({});
  };

  return (
    <>
      <section className="max-w-full">
        <div className="flex justify-between px-5 py-2">
          <div className="flex gap-2">
            <SearchField />

            <button
              className={`bg-white w-9 h-9 flex items-center justify-center border rounded cursor-pointer transition-all
                ${
                  isActiveFilter ? "border-light-green-base" : "border-gray-300"
                }`}
              onClick={() => setIsActiveF(!isActiveFilter)}
            >
              <Filter
                color={isActiveFilter ? "#2f9089" : "#d1d5dc"}
                size={20}
              />
            </button>

            {isActiveFilter && (
              <div className="absolute top-31 left-59 bg-white w-56 rounded shadow-lg z-50">
                <div className="flex justify-between p-2.5 bg-gray-100 rounded-t">
                  <span className="flex px-2 gap-2">
                    <Filter color="#9D9D9D" size={20} />
                    <span className="text-sm font-medium text-gray-1">Filtro</span>
                  </span>
                  <Plus
                    color="#9D9D9D"
                    size={20}
                    className="rotate-45 cursor-pointer"
                    onClick={() => setIsActiveF(false)}
                  />
                </div>
                <div className="flex flex-col py-3 px-5 space-y-1.5 text-gray-base text-gray-3">
                  {[
                    "Todos",
                    "Farmácia básica",
                    "Diabéticos",
                    "Contraceptivos",
                  ].map((label, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <input
                        className="w-4 h-4 border-gray-1"
                        type="checkbox"
                      />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <button
              className={`bg-white w-9 h-9 flex items-center justify-center border rounded cursor-pointer transition-all
                ${
                  isActiveReverse
                    ? "border-light-green-base"
                    : "border-gray-300"
                }`}
              onClick={() => setIsActiveR(!isActiveReverse)}
            >
              <ArrowDownUp
                color={isActiveReverse ? "#2f9089" : "#d1d5dc"}
                size={20}
              />
            </button>
          </div>

          <Button
            text="Fazer pedido"
            textColor="text-white"
            color="bg-light-green-base"
            onClick={() => setIsFormModalOpen(true)}
          />
        </div>

        <div className="flex items-center justify-center">
          <Table data={medicines} />
        </div>
      </section>

      <Transition appear show={isFormModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsFormModalOpen(false)}
        >
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
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded bg-white py-6 px-10 transition-all">
                  <div className="overflow-x-auto">
                    <div className="flex flex-col gap-5">
                      <h3 className="text-center text-lg font-medium">
                        Envio de solicitação de medicamentos
                      </h3>
                      <p className="text-start text-sm mb-5">
                        Preencha as caixas marcadas com a quantidade de lotes
                        que cada medicamento precisa.
                      </p>
                    </div>

                    <table className="min-w-full border border-gray-100">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-1 border font-medium">
                            Medicamento
                          </th>
                          <th className="p-1 border font-medium">Unidade</th>
                          <th className="p-1 border font-medium">
                            Saldo Atual
                          </th>
                          <th className="p-1 border font-medium">Solicitado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.map((med) => (
                          <tr key={med.id} className="text-sm text-gray-800">
                            <td className="p-1 border">{med.name}</td>
                            <td className="p-1 border">{med.unit}</td>
                            <td className="p-1 border">{med.balance}</td>
                            <td className="p-1 border bg-gray-200">
                              <input
                                type="number"
                                min={0}
                                value={quantities[med.id] || ""}
                                onChange={(e) =>
                                  handleQuantityChange(med.id, e.target.value)
                                }
                                className="w-24 rounded p-1 text-center focus:outline-none"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-6 flex justify-end gap-3">
                      <Button
                        text="Cancelar"
                        textColor="text-gray-400"
                        color="bg-gray-200"
                        onClick={() => setIsFormModalOpen(false)}
                      />
                      <Button
                        text="Salvar"
                        textColor="text-white"
                        color="bg-light-green-base"
                        onClick={handleFormSubmit}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isConfirmModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsConfirmModalOpen(false)}
        >
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
                  <div className="flex flex-col">
                    <span className="font-medium mb-1">Descrição</span>
                    <textarea
                      placeholder="Digite uma descrição para o pedido"
                      className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-light-green-base"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    {pdfUrl && (
                      <div className="flex items-center gap-2 mt-3">
                        <a
                          href={pdfUrl}
                          download={pdfName}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline"
                        >
                          <div className="w-full flex gap-3 border border-gray-300 p-2 pr-5 rounded">
                            <div className="bg-gray-300 flex justify-center items-center w-14 h-14 rounded">
                              <span className="text-gray-500 font-semibold">PDF</span>
                            </div>

                            <div className="flex flex-col justify-between text-gray-700 hover:underline">
                              <span>{pdfName}</span>
                              <span className="text-sm font-medium">{pdfSize} KB</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      text="Voltar"
                      textColor="text-gray-400"
                      color="bg-gray-200"
                      onClick={() => {
                        setIsConfirmModalOpen(false);
                        setIsFormModalOpen(true);
                      }}
                    />
                    <Button
                      text="Confirmar"
                      textColor="text-white"
                      color="bg-light-green-base"
                      onClick={handleSubmit}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isSecurityModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsSecurityModalOpen(false)}
        >
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
                          <FileSymlink size={30} color="green" />
                        </div>

                        <h3 className="font-semibold text-xl">
                          Tem certeza que deseja enviar o estoque atual?
                        </h3>
                      </div>

                      <p className="text-sm text-gray-2 my-2">
                        Executar essa função fará com que envie o PDF com as informações de saldo de todos os medicamentos atual e seu envio não poderá ser cancelado.
                      </p>
                      <span className="text-xs text-gray-1">
                        Essa ação pode demorar um momento...
                      </span>
                    </div>

                    <div className="flex justify-between font-medium">
                      <button
                        className="w-40 bg-red-500 text-white py-3.5 rounded cursor-pointer hover:bg-red-700 transition-all"
                        onClick={() => setIsSecurityModalOpen(false)}
                      >
                        Nâo, voltar
                      </button>
                      <button
                        className="w-40 bg-green-600 text-white py-3.5 rounded cursor-pointer hover:bg-green-700 transition-all"
                        onClick={handleSecurityConfirm}
                      >
                        Sim, prosseguir
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
