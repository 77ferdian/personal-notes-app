import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { addNote } from '../utils/network-data';
import NoteActionButton from '../components/NoteActionButton';
import LocaleContext from '../contexts/LocaleContext';
import useToast from '../hooks/useToast';

const MAX_TITLE_LENGTH = 50;

function AddNotePage() {
  const { content } = useContext(LocaleContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_TITLE_LENGTH) setTitle(val);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error(content.titleRequired);
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await addNote({ title: title.trim(), body: body.trim() });
      if (!error) {
        toast.success(content.saveSuccess);
        navigate('/');
      } else {
        toast.error('Gagal menyimpan catatan.');
      }
    } catch (err) {
      toast.error(err.message || 'Terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => navigate(-1);

  const charsLeft = MAX_TITLE_LENGTH - title.length;
  const isNearLimit = charsLeft <= 10;

  return (
    <main className="main-content">
      <div className="page-header-section">
        <div className="page-heading">
          <h2 className="page-heading__title">{content.newNoteTitle}</h2>
        </div>
        <p className="page-subtitle">{content.newNoteSubtitle}</p>
      </div>

      <div className="editor-card">
        {/* Title field */}
        <div className="editor-field editor-field--title">
          <div className="editor-field__meta-row">
            <span className="editor-field__label">{content.noteTitleLabel}</span>
            <span
              className={`editor-field__counter ${
                isNearLimit ? 'editor-field__counter--warn' : ''
              }`}
            >
              {charsLeft}
            </span>
          </div>
          <input
            className="editor-input editor-input--title"
            type="text"
            placeholder={content.noteTitlePlaceholder}
            value={title}
            onChange={handleTitleChange}
            disabled={isSubmitting}
            maxLength={MAX_TITLE_LENGTH}
            autoFocus
          />
        </div>

        {/* Body field */}
        <div className="editor-field editor-field--body">
          <div className="editor-field__meta-row">
            <span className="editor-field__label">{content.noteBodyLabel}</span>
          </div>
          <textarea
            className="editor-input editor-input--body"
            placeholder={content.noteBodyPlaceholder}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isSubmitting}
            rows={14}
          />
        </div>
      </div>

      <div className="page-actions">
        <NoteActionButton
          title={content.cancel}
          onClick={handleCancel}
          disabled={isSubmitting}
          className="action-btn--secondary"
        >
          <HiOutlineX />
        </NoteActionButton>

        <NoteActionButton
          title={isSubmitting ? content.saving : content.saveNote}
          onClick={handleSave}
          disabled={isSubmitting || !title.trim()}
          className="action-btn--primary"
        >
          <HiOutlineCheck />
        </NoteActionButton>
      </div>
    </main>
  );
}

export default AddNotePage;
