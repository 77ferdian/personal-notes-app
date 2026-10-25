import React, { createContext, useState, useCallback, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from './LocaleContext';

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const { content } = useContext(LocaleContext);
  const [state, setState] = useState({ open: false, message: '', resolve: null });

  const confirm = useCallback((message) => new Promise((resolve) => {
    setState({ open: true, message, resolve });
  }), []);

  const handleYes = useCallback(() => {
    state.resolve?.(true);
    setState({ open: false, message: '', resolve: null });
  }, [state]);

  const handleNo = useCallback(() => {
    state.resolve?.(false);
    setState({ open: false, message: '', resolve: null });
  }, [state]);

  const value = useMemo(() => confirm, [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {state.open && (
        <div
          className="confirm-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-msg"
          onClick={(e) => { if (e.target === e.currentTarget) handleNo(); }}
        >
          <div className="confirm-modal">
            <p id="confirm-msg" className="confirm-modal__msg">{state.message}</p>
            <div className="confirm-modal__actions">
              <button type="button" className="confirm-btn confirm-btn--cancel" onClick={handleNo}>
                {content.cancel || 'Batal'}
              </button>
              <button type="button" className="confirm-btn confirm-btn--ok" onClick={handleYes} autoFocus>
                {content.yes || 'Ya'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

ConfirmProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ConfirmContext;
