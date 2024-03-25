import { PageTransition } from '../PageTransition';
import { Button } from '../Button';

import './styles.css';

type ModalProps = {
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal = ({ onClose, children }: ModalProps) => {
  function handleCloseModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <PageTransition>
      <div className="modal-container" onClick={handleCloseModal}>
        <div className='modal'>
          {children}
          <footer>
            <Button style={{ backgroundColor: 'var(--red)' }} onClick={onClose}>Fechar</Button>
          </footer>
        </div>
      </div >
    </PageTransition>
  );
};
