"use client";

import { Bell, LogOut, Moon, Palette, Sun, User, UserPen } from "lucide-react";
import { useState } from "react";
import Profile from "./modals/profile-modal";
import { createComponentClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function HeaderPrivate() {
  const supabase = createComponentClient();
  const router = useRouter();
  const [menuIsOpen, setMenuOpen] = useState(false);
  const [notiIsOpen, setNotiOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    return router.push('/login')
  }

  return (
    <header className="h-10 bg-white sticky flex items-center justify-end px-5 py-7 border-b border-b-gray-300">
      <div className="flex gap-3">
        <button
          className="bg-gray-100 w-10 h-9 flex relative items-center justify-center border border-gray-300 cursor-pointer rounded"
          onClick={() => setNotiOpen(!notiIsOpen)}
        >
          <Bell color="#9d9d9d" size={20} />
        </button>

        <button
          className="bg-gray-100 w-10 h-9 flex relative items-center justify-center border border-gray-300 cursor-pointer rounded"
          onClick={() => setMenuOpen(!menuIsOpen)}
        >
          <User color="#9d9d9d" size={20} />
        </button>
      </div>

      {menuIsOpen && (
        <div className="w-60 z-20 absolute top-full right-5 bg-white rounded shadow-lg text-sm cursor-pointer">
          <div
            className="py-3 flex items-center gap-3 px-4 hover:bg-gray-100"
            onClick={() => setProfileOpen(true)}
          >
            <UserPen size={20} />
            <span>Informações da conta</span>
            <Profile
              isOpen={isProfileOpen}
              onClose={() => setProfileOpen(false)}
            />
          </div>

          <div className="flex items-center gap-3 px-4 py-1 hover:bg-gray-100">
            <Palette size={20} />
            <span>Tema</span>
            <span className="bg-gray-200 w-28 p-1 flex items-center rounded ">
              <button className="bg-white w-14 p-1 flex justify-center rounded cursor-pointer">
                <Sun size={20} />
              </button>
              <button className="w-14 p-1 flex justify-center rounded cursor-pointer">
                <Moon size={20} />
              </button>
            </span>
          </div>

          <div className="border-t border-gray-300 my-2 mx-4"></div>

          <button className="w-full py-3 flex items-center gap-3 px-4 hover:bg-gray-100 cursor-pointer"
          onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      )}

      {notiIsOpen && (
        <div className="absolute top-full right-18 w-96 min-h-40 bg-white rounded shadow-lg">
          <div className="w-full px-5 py-3 font-medium text-sm text-gray-2 border-b border-b-gray-200">
            <span>Notificaçôes</span>
          </div>

          <div className="h-full flex flex-col justify-center items-center w-full">
            <span className="font-medium text-xs text-gray-1 my-5">
              Sem notificaçôes
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
