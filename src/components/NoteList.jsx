import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineDocumentText } from 'react-icons/hi';
import NoteItem from './NoteItem';
import LoadingIndicator from './LoadingIndicator';

function NoteList({ notes, emptyMessage, emptyHint, isLoading }) {
  if (isLoading) {
    return (
      <div className="notes-list-loading">
        <LoadingIndicator />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <div className="notes-list-empty__icon-box">
          <HiOutlineDocumentText className="notes-list-empty__icon" />
        </div>
        <h3 className="notes-list-empty__title">{emptyMessage}</h3>
        {emptyHint && <p className="notes-list-empty__hint">{emptyHint}</p>}
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
          archived={note.archived}
        />
      ))}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool,
    })
  ).isRequired,
  emptyMessage: PropTypes.string,
  emptyHint: PropTypes.string,
  isLoading: PropTypes.bool,
};

NoteList.defaultProps = {
  emptyMessage: 'Tidak ada catatan.',
  emptyHint: '',
  isLoading: false,
};

export default NoteList;
