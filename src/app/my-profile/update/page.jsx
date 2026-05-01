"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function UpdateProfile() {
  const router = useRouter();

  const handleUpdate = (e) => {
    e.preventDefault();
   
    alert("Profile information updated locally!");
    router.push('/my-profile');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-50"
      >
        <h2 className="text-3xl font-black text-gray-800 mb-2">Update Info</h2>
        <p className="text-gray-500 mb-8 font-medium">আপনার প্রোফাইলের তথ্য পরিবর্তন করুন</p>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">New Name</label>
            <input 
              type="text" 
              placeholder="আপনার নতুন নাম লিখুন"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">New Photo URL</label>
            <input 
              type="text" 
              placeholder="ছবির নতুন লিঙ্ক দিন"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all font-medium"
            />
          </div>
          
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-green-600 transition-all shadow-xl hover:shadow-green-100"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}