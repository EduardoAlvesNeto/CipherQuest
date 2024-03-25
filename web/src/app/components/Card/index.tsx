import { FaEdit, FaMinusCircle } from 'react-icons/fa';

import { brands } from '../Brands/brands';

import './styles.css';


type CardProps = {
  cardName: string;
  brandName: string;
  onClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void
}


export const Card = ({ cardName, brandName, onClick, onEditClick, onDeleteClick }: CardProps) => {
  function handleShowCardInfo(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.target === event.currentTarget) {
      onClick();
    }
  }

  return (
    <>
      <div className="card-container" onClick={handleShowCardInfo}>
        <div className="card-data" onClick={onClick}>
          {brands[brandName]}
          <h2>{cardName}</h2>
        </div>
        <div className='card-options'>
          <FaEdit className='card-edit-icon' onClick={() => onEditClick()} />
          <FaMinusCircle className='card-minus-icon' onClick={() => onDeleteClick()} />
        </div>
      </div >
      <div className='card-separator'></div>
    </>
  );
};
