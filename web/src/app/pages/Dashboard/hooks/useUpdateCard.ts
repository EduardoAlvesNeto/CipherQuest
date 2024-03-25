import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { CreateFormTypes } from '../schemas/CreateFormSchema';

export const useUpdateCard = () => {
  const navigate = useNavigate();

  function handleUpdateCard(data: CreateFormTypes, id: string) {

    try {
      (async function () {
        await axios.put(`http://localhost:3001/creditcards/${id}`, {
          name: data.cardName,
          number: data.cardNumber,
          expiration: data.cardExp.replace(/^(0[1-9]|1[0-2])\/(2[4-9]|[3-9][0-9])/, '$').trim(),
          cvv: Number(data.cardCvv)
        }, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
          }
        });
        navigate('/dashboard');
      })();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.status === 401) {
          window.localStorage.removeItem('token');
        } else {
          console.error('Erro ao obter dados:', err.message);
        }
      } else {
        console.error('Erro ao obter dados:', err);
      }
    }
  }

  return { handleUpdateCard };
};
