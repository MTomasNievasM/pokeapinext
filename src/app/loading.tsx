export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
     
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      
  
      <h2 className="text-2xl font-black text-slate-800 animate-pulse tracking-tight">
        CARGANDO POKÉDEX...
      </h2>
      <p className="text-slate-500 font-medium">Buscando datos en la PokeAPI</p>
    </div>
  );
}