import React, { createContext, useState } from 'react';

type ICardData = {
  id: string;
  brand: string;
  name: string;
  number: string;
  expiration: string;
  cvv: string;
}

type ICardContext = {
  cards: ICardData[];
  setCards: React.Dispatch<React.SetStateAction<ICardData[]>>
}

// Inicializa o contexto com um objeto contendo um array vazio
export const CardContext = createContext<ICardContext>({ cards: [], setCards: () => { } });

type CardProviderProps = {
  children: React.ReactNode;
}

export const CardProvider = ({ children }: CardProviderProps) => {
  const [cards, setCards] = useState<ICardData[]>([]);

  return (
    <CardContext.Provider value={{ cards, setCards }}>
      {children}
    </CardContext.Provider>
  );
};
