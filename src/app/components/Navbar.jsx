"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from "@/lib/auth-client"; // আপনার পাথ অনুযায়ী

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // সেশন ডেটা নিয়ে আসা
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ডায়নামিক লিঙ্কের লজিক
  const baseLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Animals', path: '/animals' },
  ];

  // ইউজার লগইন না থাকলে এই লিঙ্কগুলো দেখাবে
  const guestLinks = [
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  const navLinks = session ? baseLinks : [...baseLinks, ...guestLinks];

  return (
    <nav className={`fixed top-0 w-full z-100 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-white py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="bg-green-600 p-2 rounded-xl"
            >
              <span className="text-white font-black text-xl">P</span>
            </motion.div>
            <span className="text-2xl font-black text-gray-800 tracking-tight">
              Poshur<span className="text-green-600">Hat</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-bold transition-all relative group ${
                    pathname === link.path ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <motion.div 
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* User Profile / Dropdown - শুধুমাত্র লগইন থাকলে দেখাবে */}
            {session && (
              <div className="relative">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 p-1 bg-gray-50 rounded-full border border-gray-200 hover:border-green-400 transition-all shadow-sm"
                >
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name)}&background=059669&color=fff`} 
                    alt="User"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <>
                      <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)}></div>
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-110 overflow-hidden"
                      >
                        <div className="px-5 py-3 border-b border-gray-50 mb-2">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Account Settings</p>
                          <p className="text-xs font-bold text-gray-600 truncate mt-1">{session.user.email}</p>
                        </div>

                        <Link 
                          href="/my-profile" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-5 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          My Profile
                        </Link>

                        <Link 
                          href="/my-profile/update" 
                          onClick={() => setIsOpen(false)}
                          className="flex items-center px-5 py-3 text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        >
                          Update Profile
                        </Link>

                        <div className="mt-2 pt-2 border-t border-gray-50">
                          <button 
                            onClick={async () => {
                              setIsOpen(false);
                              await authClient.signOut();
                              router.push("/login");
                            }}
                            className="w-full text-left px-5 py-3 text-sm font-black text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button className="text-gray-600 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
             </button>
          </div>

        </div>
      </div>
    </nav>
  );
}