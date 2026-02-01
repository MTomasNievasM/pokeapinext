"use client";
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-white p-8 mt-auto border-t border-slate-800">
      <div className="container mx-auto text-center">
        <p className="text-slate-400"> {t.footer}</p>
        <p className="text-xs mt-2 text-slate-500 underline decoration-yellow-500/50">
          Tomas Nievas - IES Cura Valera
        </p>
      </div>
    </footer>
  );
}