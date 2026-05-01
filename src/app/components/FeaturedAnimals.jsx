"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import allAnimals from "../data/animal.json"; 

export default function FeaturedAnimals() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  
  const featured = allAnimals.slice(0, 3);

  const handleViewDetails = (id) => {
    if (session) {
      router.push(`/animals/${id}`);
    } else {
      
      router.push("/login");
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Featured Animals</h2>
          <p className="text-gray-500 mt-2">আমাদের সেরা এবং সুস্থ পশুগুলো দেখে নিন</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((animal) => (
            <motion.div 
              key={animal.id} 
              whileHover={{ y: -5 }}
              className="bg-white rounded-4xl shadow-xl border border-gray-50 overflow-hidden group"
            >
              <div className="relative h-64 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={animal.image} 
                  alt={animal.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-black text-gray-800">{animal.name}</h3>
                <p className="text-green-600 font-black text-xl my-4">৳ {animal.price}</p>
                
                <button 
                  onClick={() => handleViewDetails(animal.id)}
                  className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-100"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}