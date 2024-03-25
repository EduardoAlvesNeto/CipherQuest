import { useEffect, useState, useContext, useRef } from 'react';
import { CardContext } from '../../../contexts/CardContext';
import axios from 'axios';

export const useDeleteCard = () => {
  const { setCards } = useContext(CardContext);
  const [toDelete, setToDelete] = useState<string>();
  const isFirstRender = useRef(true);

  function handleDeleteCard(cardId: string) {
    setToDelete(cardId);
  }
  try {
    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      if (!toDelete) return;

      if (toDelete) {
        const fetchData = async () => {
          await axios.delete(`http://localhost:3001/creditcards/${toDelete}`, {
            headers: {
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
            },
          });
        };

        fetchData();
        setCards((prevState) => prevState.filter((card) => card.id !== toDelete));
      }
    }, [toDelete, setCards]);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err);
      if (err.response?.status === 401) {
        window.localStorage.removeItem('token');
      }
    } else {
      console.error('Erro ao obter dados:', err);
    }
  }

  return { handleDeleteCard };
};
