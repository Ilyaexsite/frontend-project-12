import { toast } from 'react-toastify';
import i18n from '../i18n';

export const showSuccessToast = (messageKey, options = {}) => {
  let message;
  
  if (i18n.exists(`toast.success.${messageKey}`)) {
    message = i18n.t(`toast.success.${messageKey}`);
  } else if (typeof messageKey === 'string') {
    message = messageKey;
  } else {
    message = i18n.t('common.success');
  }
  
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
  let message;
  
  if (i18n.exists(`auth.errors.${messageKey}`)) {
    message = i18n.t(`auth.errors.${messageKey}`);
  } else if (i18n.exists(`toast.error.${messageKey}`)) {
    message = i18n.t(`toast.error.${messageKey}`);
  } else if (typeof messageKey === 'string') {
    message = messageKey;
  } else {
    message = i18n.t('common.error');
  }
  
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
  let message;
  
  if (i18n.exists(`toast.info.${messageKey}`)) {
    message = i18n.t(`toast.info.${messageKey}`);
  } else if (i18n.exists(`profanity.${messageKey}`)) {
    message = i18n.t(`profanity.${messageKey}`);
  } else if (typeof messageKey === 'string') {
    message = messageKey;
  } else {
    message = i18n.t('toast.info.connecting');
  }
  
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
  let message;
  
  if (i18n.exists(`profanity.${messageKey}`)) {
    message = i18n.t(`profanity.${messageKey}`);
  } else if (i18n.exists(`toast.warning.${messageKey}`)) {
    message = i18n.t(`toast.warning.${messageKey}`);
  } else if (typeof messageKey === 'string') {
    message = messageKey;
  } else {
    message = 'Предупреждение';
  }
  
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
