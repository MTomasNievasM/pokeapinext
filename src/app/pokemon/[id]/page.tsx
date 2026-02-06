"use client";
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { X, Heart, Sword, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PokemonDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { lang } = useLanguage();
  const [poke, setPoke] = useState<any>(null);

  // Convertimos el ID a número para navegar
  const currentId = parseInt(id);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(setPoke)
      .catch(err => console.error("Error:", err));
  }, [id]);

  if (!poke) return null;

  // Traducciones locales para los botones
  const labels: any = {
    sp: { hp: "Vida", atk: "Ataque", def: "Defensa", back: "Volver", prev: "Anterior", next: "Siguiente" },
    en: { hp: "HP", atk: "Attack", def: "Defense", back: "Back", prev: "Previous", next: "Next" },
    fr: { hp: "Vie", atk: "Attaque", def: "Défense", back: "Retour", prev: "Précédent", next: "Suivant" }
  };
  const ui = labels[lang] || labels.sp;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
        
        <button 
          onClick={() => router.push('/')} 
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-full z-10 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full scale-125 blur-sm opacity-50"></div>
            <img 
              src={poke.sprites.other['official-artwork'].front_default} 
              className="w-48 h-48 relative z-10 drop-shadow-2xl" 
              alt={poke.name} 
            />
          </div>

          <h2 className="text-4xl font-black capitalize text-slate-800 mb-1">{poke.name}</h2>
          <p className="text-blue-600 font-mono font-bold text-lg mb-8 tracking-widest"># {poke.id}</p>
          
          <div className="w-full space-y-5 mb-8">
            {/* HP */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span className="flex items-center gap-2"><Heart size={16} className="text-red-500"/> {ui.hp}</span>
                <span>{poke.stats[0].base_stat}</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${(poke.stats[0].base_stat / 255) * 100}%` }}></div>
              </div>
            </div>

            {/* Ataque */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span className="flex items-center gap-2"><Sword size={16} className="text-orange-500"/> {ui.atk}</span>
                <span>{poke.stats[1].base_stat}</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full transition-all duration-1000" style={{ width: `${(poke.stats[1].base_stat / 190) * 100}%` }}></div>
              </div>
            </div>

            {/* Defensa */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span className="flex items-center gap-2"><Shield size={16} className="text-blue-500"/> {ui.def}</span>
                <span>{poke.stats[2].base_stat}</span>
              </div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${(poke.stats[2].base_stat / 230) * 100}%` }}></div>
              </div>
            </div>
          </div>

          {/* BOTONES DE NAVEGACIÓN ANTERIOR Y SIGUIENTE */}
          <div className="grid grid-cols-2 gap-3 w-full mb-3">
            <Link 
              href={`/pokemon/${currentId - 1}`}
              className={`flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all ${currentId <= 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
              <ChevronLeft size={18} /> {ui.prev}
            </Link>
            <Link 
              href={`/pokemon/${currentId + 1}`}
              className="flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all"
            >
              {ui.next} <ChevronRight size={18} />
            </Link>
          </div>

          <button 
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95"
          >
            {ui.back}
          </button>
        </div>
      </div>
    </div>
  );
}