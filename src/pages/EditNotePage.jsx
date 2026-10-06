import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineSave, HiOutlineX } from 'react-icons/hi';
import { RiEditLine } from 'react-icons/ri';
import { getNote, editNote } from '../utils/local-data';
import NoteActionButton from '../components/NoteActionButton';
import NotFoundPage from './NotFoundPage';

function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = getNote(id);

  const [title, setTitle] = useState(note ? note.title : '');
  const bodyRef = useRef(note ? note.body : '');

  if (!note) {
    return <NotFoundPage />;
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleBodyInput(e) {
    bodyRef.current = e.target.innerHTML;
  }

  function handleSave() {
    if (!title.trim()) {
      alert('Judul catatan tidak boleh kosong!');
      return;
    }
    editNote({ id: note.id, title, body: bodyRef.current });
    navigate(`/notes/${note.id}`);
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <main>
      <div className="add-page__inner">
        <div className="page-heading" style={{ marginBottom: '24px' }}>
          <span className="page-heading__icon">
            <RiEditLine />
          </span>
          <h2>Edit Catatan</h2>
        </div>

        <div className="add-new-page__input">
          <label className="add-page__label" htmlFor="edit-title">
            Judul
          </label>
          <input
            id="edit-title"
            className="add-new-page__input__title"
            type="text"
            placeholder="Judul catatan..."
            value={title}
            onChange={handleTitleChange}
            maxLength={50}
            autoFocus
          />

          <label className="add-page__label" htmlFor="edit-body">
            Isi Catatan
          </label>
          <div
            id="edit-body"
            className="add-new-page__input__body"
            data-placeholder="Tulis isi catatan di sini..."
            contentEditable
            suppressContentEditableWarning
            onInput={handleBodyInput}
            dangerouslySetInnerHTML={{ __html: note.body }}
          />
        </div>
      </div>

      <div className="page-actions">
        <NoteActionButton
          title="Batal"
          onClick={handleCancel}
          className="action-btn--danger"
        >
          <HiOutlineX />
        </NoteActionButton>
        <NoteActionButton
          title="Simpan Perubahan"
          onClick={handleSave}
          className="action-btn--primary"
        >
          <HiOutlineSave />
        </NoteActionButton>
      </div>
    </main>
  );
}

export default EditNotePage;
