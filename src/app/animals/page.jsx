// app/animals/page.jsx
"use client";
import { useState } from 'react';
import animalsData from '../data/animal.json';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; 
import { authClient } from "@/lib/auth-client";

export default function AllAnimalsPage() {
  const [animals, setAnimals] = useState(animalsData);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSort = (order) => {
    const sortedData = [...animals].sort((a, b) => {
      return order === 'low-to-high' ? a.price - b.price : b.price - a.price;
    });
    setAnimals(sortedData);
  };

 
  const handleViewDetails = (id) => {
    if (session) {
      
      router.push(`/animals/${id}`);
    } else {
      
      router.push("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row justify-between items-center mb-12 border-b pb-8 mt-20"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">আমাদের পশুর হাট</h1>
          <p className="text-gray-500 mt-2 font-medium">আপনার কুরবানির জন্য সেরা পশুটি বেছে নিন ({animals.length}টি পাওয়া গেছে)</p>
        </div>
        
        <div className="mt-6 md:mt-0 flex gap-4">
          <button 
            onClick={() => handleSort('low-to-high')} 
            className="px-5 py-2.5 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
          >
            দাম: কম ➔ বেশি
          </button>
          <button 
            onClick={() => handleSort('high-to-low')} 
            className="px-5 py-2.5 bg-white border-2 border-green-600 text-green-600 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm"
          >
            দাম: বেশি ➔ কম
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {animals.map((animal, index) => (
          <motion.div 
            key={animal.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-4xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
          >
            
            <div className="relative h-72 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={animal.image} 
                alt={animal.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-5 left-5">
                <span className="bg-white/90 backdrop-blur-md text-green-700 text-xs font-black px-4 py-2 rounded-full shadow-md uppercase tracking-wider">
                  {animal.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                {animal.name}
              </h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm text-gray-500 border-b border-dashed border-gray-200 pb-2">
                  <span className="font-medium">জাত: {animal.breed}</span>
                  <span className="font-bold text-gray-700">{animal.weight} কেজি</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span className="font-medium">ঠিকানা: {animal.location}</span>
                  <span className="font-bold text-gray-700">{animal.age} বছর</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">বিক্রয় মূল্য</p>
                  <p className="text-3xl font-black text-green-600">৳{animal.price.toLocaleString()}</p>
                </div>
                
                <button 
                  onClick={() => handleViewDetails(animal.id)}
                  className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 transition-all duration-300 active:scale-95"
                >
                  বিস্তারিত
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}