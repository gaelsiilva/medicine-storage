"use client";

import { useState } from "react";
import { Plus, SquareChevronDown, SquareChevronUp } from "lucide-react";
import EntryModal from "./../modals/entry-modal";
import ExitModal from "./../modals/exit-modal";

export default function OperationButton() {
  const [isEntryModalOpen, setEntryModalOpen] = useState(false);
  const [isExitModalOpen, setExitModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className="group relative flex flex-col items-end space-y-2">
          <div
            className={`
            opacity-0 scale-95 translate-y-2
            group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
            transition-all duration-200 pointer-events-none group-hover:pointer-events-auto
            bg-white w-40 rounded shadow-lg
          `}
          >
            <div className="flex flex-col text-sm text-gray-700 font-medium">
              <button
                className="flex items-center p-2.5 gap-3 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => setEntryModalOpen(true)}
              >
                <SquareChevronUp size={20} />
                Entrada
              </button>

              <button
                className="flex items-center p-2.5 gap-3 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => setExitModalOpen(true)}
              >
                <SquareChevronDown size={20} />
                Saída
              </button>
            </div>
          </div>

          <button className="w-16 h-16 rounded-full bg-light-green-base text-white shadow-lg flex items-center justify-center hover:brightness-90 transition-all">
            <Plus />
          </button>
        </div>
      </div>

      <EntryModal
        isOpen={isEntryModalOpen}
        onClose={() => setEntryModalOpen(false)}
      />
      <ExitModal
        isOpen={isExitModalOpen}
        onClose={() => setExitModalOpen(false)}
      />
    </>
  );
}
