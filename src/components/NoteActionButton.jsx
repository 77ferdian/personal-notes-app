import React from 'react';
import PropTypes from 'prop-types';

function NoteActionButton({ title, onClick, className, disabled, children }) {
  return (
    <button
      type="button"
      className={`action-btn action-btn--icon ${className}`}
      title={title}
      onClick={onClick}
      disabled={disabled}
      aria-label={title}
    >
      {children}
    </button>
  );
}

NoteActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

NoteActionButton.defaultProps = {
  className: 'action-btn--secondary',
  disabled: false,
};

export default NoteActionButton;
