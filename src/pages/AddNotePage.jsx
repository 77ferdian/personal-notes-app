import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSave, HiOutlineX } from 'react-icons/hi';
import { RiStickyNoteLine } from 'react-icons/ri';
import { addNote } from '../utils/local-data';
import NoteActionButton from '../components/NoteActionButton';

function AddNotePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const bodyRef = useRef('');

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
    addNote({ title, body: bodyRef.current || '' });
    navigate('/');
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <main>
      <div className="add-page__inner">
        <div className="page-heading" style={{ marginBottom: '24px' }}>
          <span className="page-heading__icon">
            <RiStickyNoteLine />
          </span>
          <h2>Catatan Baru</h2>
        </div>

        <div className="add-new-page__input">
          <label className="add-page__label" htmlFor="note-title">
            Judul
          </label>
          <input
            id="note-title"
            className="add-new-page__input__title"
            type="text"
            placeholder="Judul catatan..."
            value={title}
            onChange={handleTitleChange}
            maxLength={50}
            autoFocus
          />

          <label className="add-page__label" htmlFor="note-body">
            Isi Catatan
          </label>
          <div
            id="note-body"
            className="add-new-page__input__body"
            data-placeholder="Tulis isi catatan di sini... (mendukung bold, italic, dan format lainnya)"
            contentEditable
            suppressContentEditableWarning
            onInput={handleBodyInput}
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
          title="Simpan Catatan"
          onClick={handleSave}
          className="action-btn--primary"
        >
          <HiOutlineSave />
        </NoteActionButton>
      </div>
    </main>
  );
}

export default AddNotePage;
