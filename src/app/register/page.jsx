"use client";
import { useState } from 'react';

import { authClient } from "@/lib/auth-client"; 
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        try {
           
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/login" 
            }, {
               
                onRequest: () => console.log("Creating account..."),
                onSuccess: () => {
                    alert("Registration Successful!");
                    router.push('/login');
                },
                onError: (ctx) => {
                    alert(ctx.error.message || "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করো।");
                }
            });

        } catch (err) {
            console.error("Registration error:", err);
            alert("সার্ভারে সমস্যা হচ্ছে, দয়া করে একটু অপেক্ষা করো।");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
            <form onSubmit={handleRegister} className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-black text-gray-800 mb-2">Create Account</h2>
                <p className="text-gray-500 mb-6 font-medium">নতুন অ্যাকাউন্ট তৈরি করুন</p>
                
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" 
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 ${
                            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                    >
                        {isLoading ? "Processing..." : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    );
}