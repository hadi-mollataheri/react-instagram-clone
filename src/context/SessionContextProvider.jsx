/* eslint-disable react/prop-types */
import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuthStoreSelector } from '../stores/userAuth-store';

const SessionContext = createContext();
const SessionContextProvider = ({ children }) => {
  const sessionData = useUserAuthStoreSelector.use.sessionData();
  const updateSessionData = useUserAuthStoreSelector.use.updateSessionData;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionData) {
        updateSessionData(null); // Reset the sessionData
        localStorage.removeItem('sessionData'); // Remove the sessionData from localStorage
        window.alert('Session expired. Please log in again.');
        navigate('/logIn');
      }
    }, 3600000); //1 hour in milliseconds

    return () => clearInterval(interval); // Cleanup function to clear the interval on component unmount
  }, [updateSessionData, navigate, sessionData]);

  return <SessionContext.Provider>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
