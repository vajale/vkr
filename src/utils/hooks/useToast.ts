import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultStyle = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
};

const useToast = () => {
    const notify = (message, options = {}) => {
        toast(message, defaultStyle);
    };

    const success = (message, options = {}) => {
        toast.success(message, defaultStyle);
    };

    const error = (message, options = {}) => {
        toast.error(message, defaultStyle);
    };

    const info = (message, options = {}) => {
        toast.info(message, defaultStyle);
    };

    const warning = (message, options = {}) => {
        toast.warn(message, defaultStyle);
    };

    return { notify, success, error, info, warning };
};

export default useToast;
