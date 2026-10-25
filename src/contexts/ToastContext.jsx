import React, { createContext, useReducer, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineCheck, HiOutlineX, HiOutlineInformationCircle } from 'react-icons/hi';

const ToastContext = createContext();

function toastReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

const icons = {
  success: <HiOutlineCheck size={15} />,
  error:   <HiOutlineX size={15} />,
  info:    <HiOutlineInformationCircle size={15} />,
};

function ToastItem({ id, message, type, dispatch }) {
  return (
    <div className={`toast toast--${type}`} role="alert" aria-live="assertive">
      <span className="toast__icon" aria-hidden="true">{icons[type]}</span>
      <span className="toast__msg">{message}</span>
      <button
        type="button"
        className="toast__close"
        onClick={() => dispatch({ type: 'REMOVE', id })}
        aria-label="Tutup"
      >
        <HiOutlineX size={13} />
      </button>
    </div>
  );
}

ToastItem.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info']).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback((message, type, duration) => {
    const id = Date.now();
    dispatch({ type: 'ADD', payload: { id, message, type } });
    setTimeout(() => dispatch({ type: 'REMOVE', id }), duration);
  }, []);

  const toast = useMemo(() => ({
    success: (msg) => addToast(msg, 'success', 3200),
    error:   (msg) => addToast(msg, 'error',   4500),
    info:    (msg) => addToast(msg, 'info',    3000),
  }), [addToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {toasts.length > 0 && (
        <div className="toast-container" aria-label="Notifikasi">
          {toasts.map((t) => (
            <ToastItem key={t.id} {...t} dispatch={dispatch} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastContext;
