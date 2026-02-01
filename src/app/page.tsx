"use client";
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Link from 'next/link';

export default function Home() {
  const { t, lang } = useLanguage();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
 
    const randomId = Math.floor(Math.random() * 386) + 1;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(err => console.error("Error cargando Pokémon:", err));
  }, []);


  const btnText: any = {
    sp: "Ver detalles",
    en: "View details",
    fr: "Voir détails"
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 text-center tracking-tight">
        {t.welcome}
      </h1>
      <p className="text-slate-500 mb-10 text-lg font-medium">{t.randomTitle}</p>
      
   
      <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-8 border border-slate-100 w-full max-w-sm text-center transition-transform hover:scale-[1.02]">
        <h2 className="text-xl font-bold text-blue-600/40 mb-2 font-mono"># {pokemon?.id}</h2>
        
        {pokemon ? (
          <>
            <div className="bg-slate-50 rounded-full p-6 mb-6 inline-block">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default} 
                alt={pokemon.name}
                className="w-48 h-48 mx-auto drop-shadow-2xl"
              />
            </div>
            
            <h3 className="text-3xl font-black capitalize mt-2 text-slate-800 mb-8 tracking-tight">
              {pokemon.name}
            </h3>

         
            <Link 
              href={`/pokemon/${pokemon.id}`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 uppercase text-sm tracking-widest"
            >
              {btnText[lang] || btnText.sp}
            </Link>
          </>
        ) : (
          <div className="py-20 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <p className="text-slate-400 font-medium animate-pulse text-sm">Buscando Pokémon...</p>
          </div>
        )}
      </div>
    </div>
  );
}