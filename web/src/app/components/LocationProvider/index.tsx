import { AnimatePresence } from 'framer-motion';

type LocationProviderProps = {
  children: React.ReactNode
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  return <AnimatePresence mode='wait'>{children}</AnimatePresence>;
};
