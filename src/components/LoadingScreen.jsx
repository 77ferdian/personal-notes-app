import React from 'react';
import PropTypes from 'prop-types';

function LoadingScreen({ text }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-screen__card">
        <div className="loading-screen__icon-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
        </div>
        <h2 className="loading-screen__title">
          {typeof window !== 'undefined' && localStorage.getItem('locale') === 'en'
            ? 'Personal Notes'
            : 'Catatan Pribadi'}
        </h2>
        <div className="loading-screen__bar">
          <div className="loading-screen__bar-inner" />
        </div>
        <p className="loading-screen__text">{text}</p>
      </div>
    </div>
  );
}

LoadingScreen.propTypes = {
  text: PropTypes.string,
};

LoadingScreen.defaultProps = {
  text: 'Memuat...',
};

export default LoadingScreen;
