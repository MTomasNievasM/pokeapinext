"use client";
import { useEffect, useState, use } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Link from 'next/link';

export default function GeneracionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGen = async () => {
      setLoading(true);
    
      const ranges: any = { 
        '1': { min: 1, max: 151 }, 
        '2': { min: 152, max: 251 }, 
        '3': { min: 252, max: 386 } 
      };
      
      const r = ranges[id] || ranges['1'];
      const ids = new Set<number>();
      
     
      while (ids.size < 10) {
        ids.add(Math.floor(Math.random() * (r.max - r.min + 1)) + r.min);
      }
      
      try {
        const res = await Promise.all(
          Array.from(ids).map(i => 
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(r => r.json())
          )
        );
        setPokemons(res);
      } catch (error) {
        console.error("Error cargando pokemons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGen();
  }, [id]);

  if (loading) return (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <div className="relative">
     
      <div className="w-20 h-20 bg-blue-100 rounded-full animate-ping opacity-20"></div>
    
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
    <p className="text-blue-900 font-black text-xl tracking-widest uppercase">
      Capturando Pokémon...
    </p>
  </div>
);
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-black text-center mb-10 capitalize text-slate-800 tracking-tight">
        {t[`gen${id}`]}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {pokemons.map(poke => (
          <div key={poke.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center hover:scale-105 transition-transform">
            <span className="text-gray-400 text-xs self-end font-bold mb-2">#{poke.id}</span>
            
            <div className="bg-slate-50 rounded-full p-4 mb-4">
              <img 
                src={poke.sprites.other['official-artwork'].front_default} 
                alt={poke.name}
                className="w-28 h-28 object-contain"
              />
            </div>

          
            <h2 className="text-xl font-black capitalize text-blue-950 mb-4 text-center">
              {poke.name}
            </h2>
            
            <Link 
              href={`/pokemon/${poke.id}`}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-3 rounded-xl transition-all font-bold uppercase text-center shadow-md shadow-blue-100"
            >
              {t.lang === 'sp' ? 'Ver detalles' : t.lang === 'fr' ? 'Détails' : 'View details'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}