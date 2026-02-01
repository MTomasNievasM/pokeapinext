"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';


const translations: any = {
  sp: {
    home: "Inicio",
    generations: "Generaciones",
    gen1: "1ª Generación",
    gen2: "2ª Generación",
    gen3: "3ª Generación",
    contact: "Contacto",
    welcome: "¡Bienvenido a la PokéApp!",
    randomTitle: "Pokémon Aleatorio del Día",
    footer: "Desarrollado con Next.js y PokeAPI",
    studentInfo: "Esta web está generada en NEXT por el alumno Tomas Nievas del IES Cura Valera."
  },
  en: {
    home: "Home",
    generations: "Generations",
    gen1: "1st Generation",
    gen2: "2nd Generation",
    gen3: "3rd Generation",
    contact: "Contact",
    welcome: "Welcome to PokéApp!",
    randomTitle: "Random Pokémon of the Day",
    footer: "Developed with Next.js and PokeAPI",
    studentInfo: "This website is generated in NEXT by the student Tomas Nievas from IES Cura Valera."
  },
  fr: {
    home: "Accueil",
    generations: "Générations",
    gen1: "1ère Génération",
    gen2: "2ème Génération",
    gen3: "3ème Génération",
    contact: "Contact",
    welcome: "Bienvenue sur PokéApp!",
    randomTitle: "Pokémon Aléatoire du Jour",
    footer: "Développé avec Next.js et PokeAPI",
    studentInfo: "Ce site web est généré en NEXT par l'étudiant Tomas Nievas de l'IES Cura Valera."
  }
};


const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState('sp');

  const value = {
    lang,
    setLang,
    t: translations[lang]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return context;
};