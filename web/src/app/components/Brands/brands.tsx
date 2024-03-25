import { MasterCardBrand, VisaBrand, AmericanExpressBrand, DiscoverBrand } from './';

export const brands: Record<string, React.ReactNode> = {
  mastercard: <MasterCardBrand />,
  visa: <VisaBrand />,
  american: <AmericanExpressBrand />,
  discover: <DiscoverBrand />
};
