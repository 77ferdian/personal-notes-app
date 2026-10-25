import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { getNote, updateNote, deleteNote, addNote } from '../utils/network-data';
import NoteActionButton from '../components/NoteActionButton';
import LoadingIndicator from '../components/LoadingIndicator';
import LocaleContext from '../contexts/LocaleContext';
import useConfirm from '../hooks/useConfirm';
import useToast from '../hooks/useToast';

const MAX_TITLE_LENGTH = 50;

function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content } = useContext(LocaleContext);
  const confirm = useConfirm();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalNote, setOriginalNote] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchNote() {
      setIsLoading(true);
      const { error, data } = await getNote(id);
      if (isMounted) {
        if (!error && data) {
          setOriginalNote(data);
          setTitle(data.title || '');
          setBody(data.body || '');
        } else {
          navigate('/', { replace: true });
        }
        setIsLoading(false);
      }
    }

    fetchNote();
    return () => { isMounted = false; };
  }, [id, navigate]);

  const handleTitleChange = (e) => {
    const val = e.target.value;
    if (val.length <= MAX_TITLE_LENGTH) setTitle(val);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error(content.titleRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      const isArchived = Boolean(originalNote?.archived);
      const { error, data, message } = await updateNote(id, {
        title: title.trim(),
        body: body.trim(),
        archived: isArchived,
      });

      if (!error && data) {
        toast.success(content.updateSuccess);
        navigate(`/notes/${data.id}`, { replace: true });
      } else {
        toast.error(message || 'Gagal menyimpan perubahan.');
      }
    } catch (err) {
      toast.error(err.message || 'Terjadi kesalahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = async () => {
    const isDirty =
      title.trim() !== (originalNote?.title || '').trim() ||
      body.trim() !== (originalNote?.body || '').trim();

    if (isDirty) {
      const confirmed = await confirm(content.discardConfirm);
      if (!confirmed) return;
    }
    navigate(-1);
  };

  const charsLeft = MAX_TITLE_LENGTH - title.length;
  const isNearLimit = charsLeft <= 10;

  if (isLoading) {
    return (
      <main className="main-content">
        <div className="editor-loading">
          <LoadingIndicator text={content.loadingData} />
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      {/* Page header */}
      <div className="page-header-section">
        <div className="page-heading">
          <h2 className="page-heading__title">{content.editNoteTitle}</h2>
        </div>
        <p className="page-subtitle">{content.editNoteSubtitle}</p>
      </div>

      {/* Editor card */}
      <div className="editor-card">
        {/* Title field */}
        <div className="editor-field editor-field--title">
          <div className="editor-field__meta-row">
            <span className="editor-field__label">{content.noteTitleLabel}</span>
            <span className={`editor-field__counter ${isNearLimit ? 'editor-field__counter--warn' : ''}`}>
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
            onChange={handleBodyChange}
            disabled={isSubmitting}
            rows={16}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="page-actions">
        <NoteActionButton
          title={content.discardChanges}
          onClick={handleDiscard}
          disabled={isSubmitting}
          className="action-btn--secondary"
        >
          <HiOutlineX />
        </NoteActionButton>

        <NoteActionButton
          title={isSubmitting ? content.updating : content.updateNote}
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

export default EditNotePage;
