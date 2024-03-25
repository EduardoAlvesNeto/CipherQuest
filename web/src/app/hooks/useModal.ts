import { useState } from 'react';

export const useModal = () => {
  const [modalState, setModalState] = useState({
    isCardModal: false,
    isEditModal: false,
    isCreateModal: false
  });
  // const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);



  function handleOpenModal(modalName: string) {
    setModalState(prevState => ({
      ...prevState,
      [modalName]: true
    }));
  }

  function handleCloseModal(modalName: string) {
    setModalState(prevState => ({
      ...prevState,
      [modalName]: false
    }));
  }

  return {
    isCardModal: modalState.isCardModal,
    isEditModal: modalState.isEditModal,
    isCreateModal: modalState.isCreateModal,
    handleOpenModal,
    handleCloseModal
  };

};
