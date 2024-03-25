import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (loggedOut) {
      navigate('/login');
    }
  }, [loggedOut, navigate]);

  function handleLogout() {
    window.localStorage.removeItem('token');
    setLoggedOut(true);
  }

  return { handleLogout };

};
