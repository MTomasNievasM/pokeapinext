"use client";
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';
import { ChevronDown, Globe } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        <nav className="flex gap-8 items-center">
          <Link href="/" className="hover:text-yellow-400 transition-colors font-bold">
            {t.home}
          </Link>
          
            <div className="relative group cursor-pointer">
            <div className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors py-2">
              {t.generations} <ChevronDown size={16} />
            </div>
            
            {/*El dropdown*/}
            <div className="absolute hidden group-hover:block bg-white text-slate-800 top-full left-0 rounded shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col min-w-[200px] border border-gray-100 rounded overflow-hidden">
                <Link href="/generacion/1" className="px-4 py-3 hover:bg-slate-100 border-b transition-colors">{t.gen1}</Link>
                <Link href="/generacion/2" className="px-4 py-3 hover:bg-slate-100 border-b transition-colors">{t.gen2}</Link>
                {/*aqui esta el link al error*/}
                <Link href="/generacion/3" className="px-4 py-3 hover:bg-slate-100 border-b transition-colors">3ª Gen</Link>
                <Link href="/generacion/4" className="px-4 py-3 hover:bg-slate-100 transition-colors">4ª Generación</Link>
              </div>
            </div>
          </div>

          <Link href="/contacto" className="hover:text-yellow-400 transition-colors">
            {t.contact}
          </Link>
        </nav>

        <div className="flex gap-3 items-center bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <Globe size={18} className="text-slate-400" />
          <button onClick={() => setLang('sp')} className={`text-sm hover:text-yellow-400 ${lang === 'sp' ? 'text-yellow-400 font-bold underline' : ''}`}>SP</button>
          <button onClick={() => setLang('en')} className={`text-sm hover:text-yellow-400 ${lang === 'en' ? 'text-yellow-400 font-bold underline' : ''}`}>EN</button>
          <button onClick={() => setLang('fr')} className={`text-sm hover:text-yellow-400 ${lang === 'fr' ? 'text-yellow-400 font-bold underline' : ''}`}>FR</button>
        </div>
      </div>
    </header>
  );
}