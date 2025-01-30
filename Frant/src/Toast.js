import { toast, Bounce } from 'react-toastify';

const defaultOptions = {
  position: "top-left",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  //progress: 0.1,
  transition: Bounce,
};

const myToast = {
  info: (msg) => {
    toast.info(msg, { ...defaultOptions, theme: "colored" });
  },
  error: (msg) => {
    toast.error(msg, { ...defaultOptions, theme: "dark" });
  },
  warn: (msg) => {
    toast.warn(msg, { ...defaultOptions, theme: "dark" });
  },
  success: (msg) => {
    toast.success(msg, { ...defaultOptions, theme: "colored" });
  },
  toast: (msg) => {
    toast(msg, { ...defaultOptions, theme: "dark" });
  },
};

export { myToast };