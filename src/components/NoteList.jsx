import React from 'react';
import PropTypes from 'prop-types';
import { HiOutlineDocumentText } from 'react-icons/hi';
import NoteItem from './NoteItem';

function NoteList({ notes, emptyMessage, emptyHint }) {
  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <div className="notes-list-empty__icon">
          <HiOutlineDocumentText />
        </div>
        <p>{emptyMessage}</p>
        {emptyHint && <span>{emptyHint}</span>}
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
    })
  ).isRequired,
  emptyMessage: PropTypes.string,
  emptyHint: PropTypes.string,
};

NoteList.defaultProps = {
  emptyMessage: 'Tidak ada catatan.',
  emptyHint: '',
};

export default NoteList;
