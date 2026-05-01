"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { authClient } from "@/lib/auth-client";
import { useRouter } from 'next/navigation';

export default function MyProfile() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

 
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  
  if (!session) return null;

  const { user } = session;
  const displayPhoto = user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=059669&color=fff&size=128`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-32 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="h-32 bg-linear-to-r from-green-500 to-green-700"></div>
        <div className="px-8 pb-12">
          <div className="flex justify-center -mt-16 mb-6">
            <div className="relative">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={displayPhoto}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover bg-white"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">{user.name}</h2>
            <p className="text-gray-500 font-semibold mt-1">{user.email}</p>
            <div className="mt-4 inline-block px-4 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full uppercase">
              Verified User
            </div>
          </div>
          
          <div className="space-y-4">
            <Link href="/my-profile/update" className="block w-full py-4 bg-green-600 text-white rounded-2xl font-bold text-center hover:bg-green-700 transition-all shadow-lg active:scale-95">
              Update Information
            </Link>
            
            <button 
              onClick={async () => {
                await authClient.signOut();
                router.push("/login");
              }}
              className="block w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold text-center hover:bg-red-100 transition-all active:scale-95 border border-red-50"
            >
              Logout Account
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}