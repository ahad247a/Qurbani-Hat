// app/page.js
import Link from 'next/link';
import FeaturedAnimals from './components/FeaturedAnimals';

export default function HomePage() {
  return (
    <div>
      
      <section className="relative bg-green-50 py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-6">
              আপনার কুরবানির জন্য <span className="text-green-600">সেরা পশু</span> খুঁজুন এখানে!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              সুস্থ, সবল এবং ১০০% প্রাকৃতিক খাবার খাওয়ানো পশুর নিশ্চয়তা নিয়ে আমরা আছি আপনার পাশে। 
              ঘরে বসেই বুকিং দিন আপনার পছন্দের গরু বা ছাগল।
            </p>
            <div className="flex space-x-4">
              <Link href="/animals" className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 shadow-lg transition">
                Browse Animals
              </Link>
              <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
             
            <div className="bg-white p-4 rounded-2xl shadow-2xl rotate-3">
              <span className="text-[150px]">🐂</span>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Animals</h2>
      <FeaturedAnimals />
      </section>
    </div>
  );
}