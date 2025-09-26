"use client";

import { createComponentClient } from "@/lib/supabase";
import { useState } from "react";

export default function Register() {
    const supabase = createComponentClient();
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [ubslocal, setUbslocal] = useState("");
    const [position, setPosition] = useState("");

    const handleRegister = async () => {
        const createAccount = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { name, role, ubslocal, position}
            }
        })

        console.log(createAccount)
    }

    return (
        <main className="flex justify-center">
            <section className="w-1/2">
                a
            </section>

            <section className="flex flex-col w-1/2">
                <div>
                    <h3 className="text-lg font-semibold">Registre-se</h3>
                </div>
                <div className="space-y-3">
                    <div className="flex flex-col w-96 gap-1">
                        <span className="font-medium">Nome</span>
                        <input
                            className="border border-gray-400 bg-gray-100 text-gray-700 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                            type="text"
                            placeholder="Digite seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col w-96 gap-1">
                        <span className="font-medium">Email</span>
                        <input
                            className="border border-gray-400 bg-gray-100 text-gray-700 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col w-96 gap-1">
                        <span className="font-medium">Senha</span>
                        <input
                            className="border border-gray-400 bg-gray-100 text-gray-700 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col w-48 gap-1">
                        <span className="font-medium">Selecione a rede</span>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border border-gray-400 bg-gray-100 text-gray-700 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                        >
                            <option value="ubs">UBS</option>
                            <option value="farmacia">Farmácia</option>
                        </select>
                    </div>

                    {role === "ubs" && (
                        <div className='flex'>
                            <div className="flex flex-col w-48 gap-1 pr-3">
                                <span className="font-medium">UBS</span>
                                <select
                                    value={ubslocal}
                                    onChange={(e) => setUbslocal(e.target.value)}
                                    className="border border-gray-400 bg-gray-100 text-gray-700 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                                >
                                    <option value="ubs1">UBS - bairro 1</option>
                                    <option value="ubs2">UBS - bairro 2</option>
                                    <option value="ubs3">UBS - bairro 3</option>
                                </select>
                            </div>

                            <div className="flex flex-col w-48 gap-1">
                                <span className="font-medium">Cargo</span>
                                <select
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}
                                    className="border border-gray-400 bg-gray-100 text-gray-700 h-10 px-2 rounded focus:outline-none focus:border-light-green-base"
                                >
                                    <option value="recepcionista">Recepcionista</option>
                                    <option value="enfermeiro">Enfermeiro</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <button className="w-96 p-2 mx-5 font-medium text-white bg-light-green-base rounded cursor-pointer"
                    onClick={handleRegister}>Registrar</button>
                </div>
            </section>
        </main>
    )
}
