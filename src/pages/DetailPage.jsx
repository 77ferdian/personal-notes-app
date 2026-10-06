import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import {
  HiOutlineTrash,
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlinePencil,
} from 'react-icons/hi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../utils/local-data';
import { showFormattedDate } from '../utils';
import NoteActionButton from '../components/NoteActionButton';
import NotFoundPage from './NotFoundPage';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(() => getNote(id));

  if (!note) {
    return <NotFoundPage />;
  }

  function handleDelete() {
    deleteNote(note.id);
    navigate('/');
  }

  function handleArchive() {
    archiveNote(note.id);
    setNote(getNote(note.id));
  }

  function handleUnarchive() {
    unarchiveNote(note.id);
    setNote(getNote(note.id));
  }

  function handleBack() {
    navigate(-1);
  }

  function handleEdit() {
    navigate(`/notes/${note.id}/edit`);
  }

  return (
    <main>
      <div className="detail-page">
        {note.archived && (
          <div style={{ marginBottom: '20px' }}>
            <span className="detail-page__archived-badge">
              <MdOutlineArchive size={14} />
              Catatan Diarsipkan
            </span>
          </div>
        )}

        <h1 className="detail-page__title">{note.title}</h1>

        <div className="detail-page__meta">
          <HiOutlineClock size={14} />
          <span className="detail-page__createdAt">
            {showFormattedDate(note.createdAt)}
          </span>
        </div>

        <div className="detail-page__body">{parser(note.body)}</div>
      </div>

      <div className="page-actions">
        <NoteActionButton
          title="Kembali"
          onClick={handleBack}
          className="action-btn--secondary"
        >
          <HiOutlineArrowLeft />
        </NoteActionButton>

        <NoteActionButton
          title="Edit Catatan"
          onClick={handleEdit}
          className="action-btn--warning"
        >
          <HiOutlinePencil />
        </NoteActionButton>

        {note.archived ? (
          <NoteActionButton
            title="Batal Arsip"
            onClick={handleUnarchive}
            className="action-btn--success"
          >
            <MdOutlineUnarchive />
          </NoteActionButton>
        ) : (
          <NoteActionButton
            title="Arsipkan Catatan"
            onClick={handleArchive}
            className="action-btn--secondary"
          >
            <MdOutlineArchive />
          </NoteActionButton>
        )}

        <NoteActionButton
          title="Hapus Catatan"
          onClick={handleDelete}
          className="action-btn--danger"
        >
          <HiOutlineTrash />
        </NoteActionButton>
      </div>
    </main>
  );
}

export default DetailPage;
