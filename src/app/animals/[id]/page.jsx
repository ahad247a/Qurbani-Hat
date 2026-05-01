"use client";
import { useParams, useRouter } from "next/navigation";
import allAnimals from "../../data/animal.json"; 
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Scale, Calendar, Info } from "lucide-react";
export default function AnimalDetails() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  
  const animal = allAnimals.find((item) => Number(item.id) === Number(id));

  if (!animal) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">দুঃখিত, পশুটি পাওয়া যায়নি!</h2>
        <button onClick={() => router.push("/")} className="mt-4 text-green-600 underline">হোমে ফিরে যান</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        
      
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-0">
          
       
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-100 lg:h-full min-h-100 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={animal.image} 
              alt={animal.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-green-600 text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg">
                {animal.category} Size
              </span>
            </div>
          </motion.div>

          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 lg:p-12 flex flex-col justify-center"
          >
            <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-2">{animal.breed} Breed</span>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-800 mb-6">{animal.name}</h1>
            
            <p className="text-3xl font-black text-gray-900 mb-8">
              ৳ {animal.price.toLocaleString()}
            </p>

          
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-white p-2 rounded-lg shadow-sm text-green-600"><Scale size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Weight</p>
                  <p className="text-lg font-bold text-gray-700">{animal.weight} KG</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-white p-2 rounded-lg shadow-sm text-green-600"><Calendar size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Age</p>
                  <p className="text-lg font-bold text-gray-700">{animal.age} Years</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-white p-2 rounded-lg shadow-sm text-green-600"><MapPin size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Location</p>
                  <p className="text-lg font-bold text-gray-700">{animal.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="bg-white p-2 rounded-lg shadow-sm text-green-600"><Info size={20} /></div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Type</p>
                  <p className="text-lg font-bold text-gray-700">{animal.type}</p>
                </div>
              </div>
            </div>

            
            <div className="mb-10">
              <h4 className="text-lg font-bold text-gray-800 mb-3">বিস্তারিত বর্ণনা:</h4>
              <p className="text-gray-500 leading-relaxed text-lg">
                {animal.description}
              </p>
            </div>

            
            <button className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-xl hover:bg-green-700 transition-all shadow-xl shadow-green-100 active:scale-[0.98]">
              অর্ডার করতে যোগাযোগ করুন
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}