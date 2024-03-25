import { useContext, useEffect } from 'react';
import { CardContext } from '../../../contexts/CardContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useGetCards = () => {
  const { setCards } = useContext(CardContext);
  const navigate = useNavigate();

  const handleGetCards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/creditcards', {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      });

      if (response.data.length !== 0) {
        setCards(response.data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      } else {
        console.error('Erro ao obter dados:', err);
      }
    }
  };
  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      navigate('/login');
    } else {
      handleGetCards();
    }
  }, []);

  return { handleGetCards };
};

