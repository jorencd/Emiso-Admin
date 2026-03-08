import { useState, useCallback } from 'react';

export const usePopup = (duration = 3000) => {
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: false
  });

  const showPopup = useCallback((msg, success = false) => {
    setPopup({ show: true, message: msg, success });
    
    if (duration > 0) {
      setTimeout(() => {
        setPopup({ show: false, message: "", success: false });
      }, duration);
    }
  }, [duration]);

  const hidePopup = useCallback(() => {
    setPopup({ show: false, message: "", success: false });
  }, []);

  return {
    popup,
    showPopup,
    hidePopup
  };
};