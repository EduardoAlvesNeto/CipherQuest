import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CreateFormTypes } from '../schemas/CreateFormSchema';

export const useCreateCard = () => {
  const navigate = useNavigate();

  function handleCreateCard(data: CreateFormTypes) {
    (async function () {
      try {
        await axios.post('http://localhost:3001/creditcards', {
          name: data.cardName,
          number: data.cardNumber,
          expiration: data.cardExp,
          cvv: Number(data.cardCvv)
        }, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        });

        navigate('/dashboard');
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
    })();


  }

  return { handleCreateCard };
};
