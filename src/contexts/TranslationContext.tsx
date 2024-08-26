import React, { createContext, useContext, useState, ReactNode } from 'react';

import en from '../locales/en.json';
import pt from '../locales/pt.json';

interface TranslationStrings {
  [key: string]: string;
}

interface Translations {
  [language: string]: TranslationStrings;
}

const translations: Translations = { en, pt };

interface TranslationContextType {
  translate: (key: string) => string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<string>('pt');

  const translate = (key: string): string => {
    const keys = key.split('.');
    let result: TranslationStrings | string = translations[language];

    for (const k of keys) {
      if (typeof result === 'string') {
        return key;
      }
      result = result[k];
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <TranslationContext.Provider value={{ translate, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation(): TranslationContextType {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}