"use client";
import { useLanguage } from '../../context/LanguageContext';
import { GraduationCap, Award } from 'lucide-react';

export default function Contacto() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-white shadow-2xl rounded-[2.5rem] p-12 border border-slate-100 w-full max-w-3xl text-center relative overflow-hidden">
        
       
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

        <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
          <GraduationCap size={40} className="text-blue-600" />
        </div>

        <h1 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-[0.2em]">
          {t.contact}
        </h1>

        <div className="bg-slate-50 rounded-3xl p-10 border-2 border-slate-100 shadow-sm">
    
          <p className="text-2xl md:text-3xl text-slate-800 font-bold leading-relaxed">
            {t.studentInfo}
          </p>
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-2 text-slate-400 font-bold text-sm">
          <Award size={18} />
          
        </div>
      </div>
    </div>
  );
}