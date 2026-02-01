"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="text-center mt-20">
      <h2 className="text-red-500 text-2xl font-bold">¡Vaya! Algo ha salido mal</h2>
      <button onClick={() => reset()} className="mt-4 bg-red-100 p-2 rounded">Reintentar</button>
    </div>
  );
}