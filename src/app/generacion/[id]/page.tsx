"use client";
import { use, useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext'; // CORREGIDO: ../../../
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function GeneracionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t } = useLanguage();
  const [pokemon, setPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // LOGICA DE ERROR: Si el ID es 3, mostramos la página 404
  if (id === '3') {
    notFound();
  }

  useEffect(() => {
    setLoading(true);
    // Definimos los rangos de la PokéAPI
    const ranges: any = {
      '1': { limit: 151, offset: 0 },
      '2': { limit: 100, offset: 151 },
      '4': { limit: 107, offset: 386 } // Pokémon del 387 al 493
    };

    const range = ranges[id] || ranges['1'];

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${range.limit}&offset=${range.offset}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-2xl font-bold animate-pulse text-slate-400">Cargando...</div>;

  return (
    <div className="py-10">
      <h1 className="text-4xl font-black text-slate-900 mb-8 capitalize tracking-tight text-center">
        {id === '1' ? t.gen1 : id === '2' ? t.gen2 : `Generación ${id}`}
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemon.map((p: any) => {
          const pokeId = p.url.split('/').filter(Boolean).pop();
          return (
            <Link 
              key={pokeId} 
              href={`/pokemon/${pokeId}`}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
            >
              <div className="bg-slate-50 rounded-xl p-2 mb-3 group-hover:bg-blue-50 transition-colors">
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`}
                  alt={p.name}
                  className="w-full h-auto drop-shadow-md"
                />
              </div>
              <p className="font-bold text-slate-700 capitalize text-sm">{p.name}</p>
              <p className="text-xs text-slate-400 font-mono mt-1"># {pokeId}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}