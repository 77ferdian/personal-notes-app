import React from 'react';
import PropTypes from 'prop-types';

function LoadingIndicator({ text }) {
  return (
    <div className="loading-indicator" role="status" aria-live="polite">
      <div className="loading-indicator__spinner" />
      {text && <p className="loading-indicator__text">{text}</p>}
    </div>
  );
}

LoadingIndicator.propTypes = {
  text: PropTypes.string,
};

LoadingIndicator.defaultProps = {
  text: '',
};

export default LoadingIndicator;
