import { AnimatedRoutes } from './app/components/AnimatedRoutes';
import { LocationProvider } from './app/components/LocationProvider';
import { CardProvider } from './app/contexts/CardContext.tsx';

import './global.css';


function App() {
  return (
    <CardProvider>
      <LocationProvider>
        <AnimatedRoutes />
      </LocationProvider>
    </CardProvider>
  );
}


export default App;
