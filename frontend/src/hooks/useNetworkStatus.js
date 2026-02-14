import { useState, useEffect } from 'react';
import { showErrorToast, showInfoToast } from '../utils/toast';
import { useTranslation } from 'react-i18next';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { t } = useTranslation();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showInfoToast('connectionRestored');
    };

    const handleOffline = () => {
      setIsOnline(false);
      showErrorToast('connectionLost');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t]);

  return { isOnline };
};
