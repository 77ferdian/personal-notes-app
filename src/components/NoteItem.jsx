import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { HiOutlineClock } from 'react-icons/hi';
import { showFormattedDate } from '../utils';

function NoteItem({ id, title, body, createdAt }) {
  return (
    <Link to={`/notes/${id}`} className="note-item" aria-label={`Buka catatan: ${title}`}>
      <h3 className="note-item__title">{title}</h3>
      <div className="note-item__meta">
        <HiOutlineClock size={12} />
        <span className="note-item__createdAt">{showFormattedDate(createdAt)}</span>
      </div>
      <div className="note-item__body">{parser(body)}</div>
    </Link>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
