"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
          
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <span className="text-white font-black text-xl">P</span>
              </div>
              <span className="text-2xl font-black tracking-tight">
                Poshur<span className="text-green-500">Hat</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              আপনার কুরবানির জন্য সেরা এবং সুস্থ পশুটি খুঁজে পেতে আমরা আছি আপনার পাশে। নিরাপদ ও নির্ভরযোগ্য পশুর হাট।
            </p>
          </div>

          
          <div>
            <h3 className="text-lg font-bold mb-6">লিঙ্কসমূহ</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-green-500 transition-colors">হোম</Link></li>
              <li><Link href="/animals" className="hover:text-green-500 transition-colors">সব পশু</Link></li>
              <li><Link href="/login" className="hover:text-green-500 transition-colors">লগইন</Link></li>
              <li><Link href="/register" className="hover:text-green-500 transition-colors">রেজিস্ট্রেশন</Link></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-lg font-bold mb-6">যোগাযোগ</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <p>ফরিদপুর পলিটেকনিক ইনস্টিটিউট</p>
              <p>ফরিদপুর, বাংলাদেশ</p>
              <p>ইমেইল: support@poshurhat.com</p>
            </div>
          </div>

        </div>

        
        <div className="mt-8 text-center text-gray-500 text-xs font-medium">
          <p>© {new Date().getFullYear()} PoshurHat. All rights reserved. Developed by You.</p>
        </div>
      </div>
    </footer>
  );
}