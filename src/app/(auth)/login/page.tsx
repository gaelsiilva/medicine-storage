"use client";

import { createComponentClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login(){
    const router = useRouter();
    const supabase = createComponentClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async  () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error){
            alert('erro');
            console.log(error);
            return;
        }

        return router.push('/');
    }

    return(
        <main className="flex">
            <section className="w-1/2">

            </section>
            
            <section className="flex flex-col w-1/2">
                <div>
                    <h3 className="text-lg font-semibold">Login</h3>
                </div>
                <div className="space-y-3">
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
                </div>

                <div>
                    <button className="w-96 p-2 mx-5 font-medium text-white bg-light-green-base rounded cursor-pointer"
                    onClick={handleLogin}>Login</button>
                </div>
            </section>
        </main>
    )
}