import { toast } from 'react-toastify';
import i18n from '../i18n';

export const showSuccessToast = (messageKey, options = {}) => {
  const message = i18n.exists(`toast.success.${messageKey}`)
    ? i18n.t(`toast.success.${messageKey}`)
    : messageKey;
  
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showErrorToast = (messageKey, options = {}) => {
  const message = i18n.exists(`toast.error.${messageKey}`)
    ? i18n.t(`toast.error.${messageKey}`)
    : messageKey;
  
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showInfoToast = (messageKey, options = {}) => {
  const message = i18n.exists(`toast.info.${messageKey}`)
    ? i18n.t(`toast.info.${messageKey}`)
    : messageKey;
  
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const showWarningToast = (messageKey, options = {}) => {
  const message = i18n.exists(`toast.warning.${messageKey}`)
    ? i18n.t(`toast.warning.${messageKey}`)
    : messageKey;
  
  toast.warning(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};
