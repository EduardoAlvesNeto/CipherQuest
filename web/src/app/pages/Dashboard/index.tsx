import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPowerOff, FaPlusCircle } from 'react-icons/fa';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Modal } from '../../components/Modal';
import { Card } from '../../components/Card';
import { CardMock } from '../../components/CardMock';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { PageTransition } from '../../components/PageTransition';

import { useModal } from '../../hooks/useModal';
import { useGetCards } from './hooks/useGetCards';
import { useCreateCard } from './hooks/useCreateCard';
import { useUpdateCard } from './hooks/useUpdateCard';
import { useDeleteCard } from './hooks/useDeleteCard';
import { useLogout } from './hooks/useLogout';
import { CardContext } from '../../contexts/CardContext';

import { schema as CreateFormSchema, CreateFormTypes } from './schemas/CreateFormSchema';

import './styles.css';

type ICardData = {
  id: string;
  brand: string;
  name: string;
  number: string;
  expiration: string;
  cvv: string;
}


export default function Dashboard() {
  document.title = 'Dashboard';

  const { handleCloseModal, handleOpenModal, isCardModal, isEditModal, isCreateModal } = useModal();
  const [selectedCard, setSelectedCard] = useState<ICardData | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormTypes>({
    resolver: zodResolver(CreateFormSchema)
  });
  const { cards } = useContext(CardContext);
  const navigate = useNavigate();

  const { handleCreateCard } = useCreateCard();
  const { handleUpdateCard } = useUpdateCard();
  const { handleDeleteCard } = useDeleteCard();
  const { handleLogout } = useLogout();

  useEffect(() => {
    if (!window.localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  useGetCards();

  function handleSelectedCard(card: ICardData, modalName: string) {
    if (modalName) {
      setSelectedCard(card);
      handleOpenModal(modalName);
    }
  }

  return (
    <PageTransition>
      <div className="container">
        <Header />
        <main className='dashboard-main'>
          <header className='dashboard-header'>
            <div className='add-card-icon' onClick={() => handleOpenModal('isCreateModal')}><FaPlusCircle /></div>
            <div className='logout-icon' onClick={handleLogout}><FaPowerOff /></div>
          </header>
          {cards.length < 1 && (
            <h1 className='empty-cards'>Nenhum cartão cadastrado</h1>
          )}
          {cards.map((card) => (
            <Card
              key={card.id}
              brandName={card.brand}
              cardName={card.name}
              onClick={() => handleSelectedCard(card, 'isCardModal')}
              onEditClick={() => handleSelectedCard(card, 'isEditModal')}
              onDeleteClick={() => handleDeleteCard(card.id)}
            />
          ))}
        </main>
        <Footer />
        {isCardModal && selectedCard && (
          <Modal onClose={() => handleCloseModal('isCardModal')}>
            <CardMock
              cardName={selectedCard.name}
              cardNumber={selectedCard.number.replace(/(\d{4})/g, '$1 ').trim()}
              cardExpiration={selectedCard.expiration}
              cardCVV={selectedCard.cvv}
              cardBrand={selectedCard.brand}
            />
          </Modal>
        )}


        {isEditModal && selectedCard && (
          <Modal onClose={() => handleCloseModal('isEditModal')}>
            <h2>Update Card</h2>
            <form onSubmit={handleSubmit((data) => handleUpdateCard(data, selectedCard.id))}>
              <Input
                {...register('cardName')}
                name='cardName'
                id='cardName'
                placeholder='Card Name'
                defaultValue={selectedCard.name}
                error={errors.cardName?.message}
              />
              <Input
                {...register('cardNumber')}
                name='cardNumber'
                id='cardNumber'
                placeholder='Number'
                maxLength={19}
                defaultValue={selectedCard.number}
                formatCardNumber
                error={errors.cardNumber?.message}
              />
              <Input
                {...register('cardExp')}
                name='cardExp'
                id='expiration'
                placeholder='Expiration'
                maxLength={5}
                defaultValue={selectedCard.expiration}
                formatCardExpiration
                error={errors.cardExp?.message}
              />
              <Input
                {...register('cardCvv')}
                name='cardCvv'
                id='cvv'
                placeholder='CVV'
                maxLength={3}
                defaultValue={selectedCard.cvv}
                error={errors.cardCvv?.message}
              />
              <Button type='submit'>Enter</Button>
            </form>
          </Modal>
        )}
        {isCreateModal && (
          <Modal onClose={() => handleCloseModal('isCreateModal')}>
            <h2>Create Card</h2>
            <form onSubmit={handleSubmit(handleCreateCard)}>
              <Input
                {...register('cardName')}
                name='cardName'
                id='cardName'
                placeholder='Card Name'
                error={errors.cardName?.message}
              />
              <Input
                {...register('cardNumber')}
                name='cardNumber'
                id='cardNumber'
                placeholder='Number'
                maxLength={19}
                formatCardNumber
                error={errors.cardNumber?.message}
              />
              <Input
                {...register('cardExp')}
                name='cardExp'
                id='expiration'
                placeholder='Expiration'
                maxLength={4}
                formatCardExpiration
                error={errors.cardExp?.message}
              />
              <Input
                {...register('cardCvv')}
                name='cardCvv'
                id='cvv'
                placeholder='CVV'
                maxLength={3}
                error={errors.cardCvv?.message}
              />

              <Button type='submit'>Enter</Button>
            </form>
          </Modal>
        )}
      </div>
    </PageTransition >
  );
}
