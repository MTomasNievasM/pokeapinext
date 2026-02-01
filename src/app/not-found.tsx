"use client";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-9xl font-black text-gray-200">404</h1>
      <p className="text-2xl font-bold text-gray-800 mt-4">¡Oh no! Este Pokémon ha escapado.</p>
      <p className="text-gray-500 mt-2">La página que buscas no existe.</p>
      <Link 
        href="/" 
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition-transform hover:scale-105"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}