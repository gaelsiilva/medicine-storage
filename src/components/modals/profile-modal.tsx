"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Lock, User, UserPen } from "lucide-react";
import Button from "../buttons/button";

export default function ExitModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

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
            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white py-6 px-8 shadow-xl">
              <section>
                <div className="flex justify-between pb-4">
                  <User size={35} color="#9d9d9d" />
                  <Button
                    text={isEditing ? "Editando..." : "Editar"}
                    textColor="text-white"
                    color={isEditing ? "bg-gray-400" : "bg-light-green-base"}
                    icon={UserPen}
                    onClick={() => setIsEditing(true)}
                  />
                </div>

                <div className="font-medium space-y-3 py-4 mb-3 border-t border-gray-200">
                  {[
                    { label: "Nome", placeholder: "nome do servidor" },
                    { label: "Email", placeholder: "emaildoservidor@gmail.com" },
                    { label: "UBS", placeholder: "nome da ubs" },
                    { label: "Cargo", placeholder: "cargo do servidor" },
                  ].map((field, i) => (
                    <div key={i} className="flex items-center">
                      <span className="w-28">{field.label}</span>
                      <div
                        className={`w-full flex border border-gray-300 items-center rounded ${
                          isEditing ? "bg-gray-100" : "bg-gray-200"
                        }`}
                      >
                        <input
                          className="w-full p-2 focus:outline-none"
                          disabled={!isEditing}
                          type="text"
                          placeholder={field.placeholder}
                        />
                        {!isEditing && (
                          <Lock className="mr-3" size={25} color="#9d9d9d" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end font-medium gap-3">
                  <Button
                    text="Cancelar"
                    textColor="text-gray-500"
                    color="bg-gray-300"
                    onClick={() => {
                      setIsEditing(false);
                      onClose();
                    }}
                  />
                  <Button
                    text="Salvar"
                    textColor="text-white"
                    color={isEditing ? "bg-light-green-base" : "bg-gray-400"}
                    disabled={!isEditing}
                    onClick={() => {
                      setIsEditing(false);
                      onClose();
                    }}
                  />
                </div>
              </section>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
