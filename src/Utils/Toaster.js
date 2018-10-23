import { toast } from 'react-toastify';
import { css } from 'glamor';

export default {
  success(msg, options = {}) {
    return toast.success(msg, {
      ...options,
      className: {
        color: '#fff',
        minHeight: '60px',
        borderRadius: '8px',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      },
      autoClose: 2000,
      hideProgressBar: true,
      progressClassName: css({
        background: '#333'
      })
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...options,
      className: {
        color: '#fff',
        minHeight: '60px',
        borderRadius: '8px',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      },
      autoClose: 2000,
      hideProgressBar: true,
      progressClassName: css({
        background: '#333'
      })
    });
  }
};
