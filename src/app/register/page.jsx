"use client";
import { useState } from 'react';
import { createAuthClient } from "better-auth/react";
import { useRouter } from 'next/navigation';

const authClient = createAuthClient();

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/my-profile" 
            });

            if (error) {
                alert(error.message);
            } else {
                alert("Registration Successful!");
                router.push('/my-profile');
            }
        } catch (err) {
            console.error("Registration error:", err);
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
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button 
                        type="submit" 
                        className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}