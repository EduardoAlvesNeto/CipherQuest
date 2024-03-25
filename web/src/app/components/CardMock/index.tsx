import { brands } from '../Brands/brands';

import './styles.css';

type CardMockProps = {
  cardName: string;
  cardNumber: string;
  cardExpiration: string;
  cardCVV: string
  cardBrand: string;
}

export const CardMock = (props: CardMockProps) => {
  return (
    <div className='cardmock-container'>
      <div className='cardmock-data'>
        <div className="cardmock-primary">
          <h2 className='cardmock-name'>{props.cardName}</h2>
          <h2 className='cardmock-number'>{props.cardNumber}</h2>
        </div>
        <div className='cardmock-secundary'>
          <p className='cardmock-expiration'>exp: {props.cardExpiration}</p>
          <p className='cardmock-cvv'>cvv: {props.cardCVV}</p>
        </div>
      </div>
      <div className='cardmock-brand'>{brands[props.cardBrand]}</div>
    </div>
  );
};
