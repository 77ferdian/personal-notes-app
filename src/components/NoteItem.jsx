import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { HiOutlineClock } from 'react-icons/hi';
import { MdOutlineArchive } from 'react-icons/md';
import { showFormattedDate } from '../utils';
import LocaleContext from '../contexts/LocaleContext';

function NoteItem({ id, title, body, createdAt, archived }) {
  const { locale, content } = useContext(LocaleContext);

  // Helper to safely parse or display body preview
  const renderBodyPreview = () => {
    if (!body || body.trim() === '') {
      return <em className="note-item__empty-body">({locale === 'id' ? 'Catatan kosong' : 'Empty note'})</em>;
    }
    try {
      return parser(body);
    } catch {
      return body;
    }
  };

  return (
    <article className="note-item-wrapper">
      <Link
        to={`/notes/${id}`}
        className="note-item"
        aria-label={`${title} - ${showFormattedDate(createdAt, locale)}`}
      >
        <div className="note-item__header">
          <h3 className="note-item__title">{title}</h3>
          {archived && (
            <span className="note-item__badge" title={content.archivedBadge}>
              <MdOutlineArchive size={13} />
              <span>{content.archivedBadge}</span>
            </span>
          )}
        </div>

        <div className="note-item__meta">
          <HiOutlineClock size={13} className="note-item__meta-icon" />
          <time dateTime={createdAt} className="note-item__createdAt">
            {showFormattedDate(createdAt, locale)}
          </time>
        </div>

        <div className="note-item__body">{renderBodyPreview()}</div>
      </Link>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool,
};

NoteItem.defaultProps = {
  archived: false,
};

export default NoteItem;
