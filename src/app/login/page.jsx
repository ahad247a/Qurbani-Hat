"use client";
import { useState } from 'react';
import { authClient } from "@/lib/auth-client"; // আপনার পাথ অনুযায়ী চেক করে নিন
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // BetterAuth এর সাইন-ইন ফাংশন
            await authClient.signIn.email({
                email,
                password,
                callbackURL: "/my-profile", // লগইন সফল হলে যেখানে যাবে
            }, {
                onSuccess: () => {
                    alert("লগইন সফল হয়েছে!");
                    router.push("/my-profile");
                },
                onError: (ctx) => {
                    alert(ctx.error.message || "ইমেইল বা পাসওয়ার্ড ভুল।");
                    setIsLoading(false);
                },
            });
        } catch (err) {
            console.error("Login error:", err);
            setIsLoading(false);
        }
    };

    // গুগল দিয়ে লগইন করার ফাংশন (ঐচ্ছিক, যদি সেটআপ করা থাকে)
    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/my-profile",
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Login</h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full p-3 border rounded-lg focus:outline-green-500" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-3 border rounded-lg focus:outline-green-500" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg font-bold transition text-white ${
                            isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                        {isLoading ? "Checking..." : "Login"}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                    <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">Or</span></div>
                </div>

                <button 
                    onClick={handleGoogleLogin}
                    className="w-full border border-gray-300 py-3 rounded-lg font-bold flex items-center justify-center hover:bg-gray-50 transition"
                >
                    Login with Google
                </button>
                
                <p className="text-center mt-4 text-sm text-gray-600">
                    Account নেই? <span className="text-green-600 cursor-pointer font-bold" onClick={() => router.push('/register')}>Register করুন</span>
                </p>
            </div>
        </div>
    );
}