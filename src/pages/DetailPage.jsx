import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  HiOutlineTrash,
  HiOutlineArrowLeft,
  HiOutlinePencil,
  HiOutlineDocumentRemove,
} from 'react-icons/hi';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from '../utils/network-data';
import { showFormattedDate } from '../utils';
import NoteActionButton from '../components/NoteActionButton';
import LoadingIndicator from '../components/LoadingIndicator';
import LocaleContext from '../contexts/LocaleContext';
import useConfirm from '../hooks/useConfirm';
import useToast from '../hooks/useToast';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { locale, content } = useContext(LocaleContext);
  const confirm = useConfirm();
  const toast = useToast();

  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchNoteDetail() {
      setIsLoading(true);
      const { error, data } = await getNote(id);
      if (isMounted) {
        if (!error && data) {
          setNote(data);
        } else {
          setNote(null);
        }
        setIsLoading(false);
      }
    }

    fetchNoteDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!note) return;
    const isConfirmed = await confirm(content.deleteConfirm);
    if (!isConfirmed) return;

    setIsProcessing(true);
    const { error } = await deleteNote(note.id);
    setIsProcessing(false);

    if (!error) {
      toast.success(content.deleteSuccess);
      navigate('/');
    }
  };

  const handleArchive = async () => {
    if (!note) return;
    setIsProcessing(true);
    const { error } = await archiveNote(note.id);
    setIsProcessing(false);
    if (!error) {
      setNote((prev) => ({ ...prev, archived: true }));
      toast.success(content.archiveSuccess);
    }
  };

  const handleUnarchive = async () => {
    if (!note) return;
    setIsProcessing(true);
    const { error } = await unarchiveNote(note.id);
    setIsProcessing(false);
    if (!error) {
      setNote((prev) => ({ ...prev, archived: false }));
      toast.success(content.unarchiveSuccess);
    }
  };

  const handleBack = () => navigate(-1);
  const handleEdit = () => navigate(`/notes/${note.id}/edit`);

  /* ── Loading ── */
  if (isLoading) {
    return (
      <main className="main-content">
        <div className="detail-loading-wrapper">
          <LoadingIndicator text={content.loadingData} />
        </div>
      </main>
    );
  }

  /* ── Not found ── */
  if (!note) {
    return (
      <main className="main-content">
        <div className="detail-not-found">
          <div className="notes-list-empty__icon-box">
            <HiOutlineDocumentRemove className="notes-list-empty__icon" />
          </div>
          <h2 className="notes-list-empty__title">{content.noteNotFoundTitle}</h2>
          <p className="notes-list-empty__hint">{content.noteNotFoundSubtitle}</p>
          <div style={{ marginTop: '20px' }}>
            <Link to="/" className="detail-back-link">
              <HiOutlineArrowLeft size={16} />
              {content.backToNotes}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ── Detail view ── */
  return (
    <main className="main-content">
      {/* Breadcrumb / back */}
      <button type="button" className="detail-back-btn" onClick={handleBack}>
        <HiOutlineArrowLeft size={15} />
        <span>{content.back}</span>
      </button>

      <div className="detail-page">
        <div className="detail-page__card">
          {/* Header section */}
          <div className="detail-page__header">
            <div className="detail-page__top-row">
              <span
                className={`detail-page__badge ${
                  note.archived
                    ? 'detail-page__badge--archived'
                    : 'detail-page__badge--active'
                }`}
              >
                {note.archived ? content.archivedBadge : content.activeBadge}
              </span>

              {/* Action buttons inline with header */}
              <div className="detail-page__header-actions">
                {!note.archived && (
                  <button
                    type="button"
                    className="detail-action-btn"
                    onClick={handleEdit}
                    disabled={isProcessing}
                    title={content.editAction}
                  >
                    <HiOutlinePencil size={15} />
                    <span>{content.editAction}</span>
                  </button>
                )}

                {note.archived ? (
                  <button
                    type="button"
                    className="detail-action-btn"
                    onClick={handleUnarchive}
                    disabled={isProcessing}
                    title={content.unarchiveAction}
                  >
                    <MdOutlineUnarchive size={15} />
                    <span>{content.unarchiveAction}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="detail-action-btn"
                    onClick={handleArchive}
                    disabled={isProcessing}
                    title={content.archiveAction}
                  >
                    <MdOutlineArchive size={15} />
                    <span>{content.archiveAction}</span>
                  </button>
                )}

                <button
                  type="button"
                  className="detail-action-btn detail-action-btn--danger"
                  onClick={handleDelete}
                  disabled={isProcessing}
                  title={content.deleteAction}
                >
                  <HiOutlineTrash size={15} />
                  <span>{content.deleteAction}</span>
                </button>
              </div>
            </div>

            <h1 className="detail-page__title">{note.title}</h1>

            <time dateTime={note.createdAt} className="detail-page__meta">
              {showFormattedDate(note.createdAt, locale)}
            </time>
          </div>

          {/* Body section */}
          <div className="detail-page__body">
            {note.body && note.body.trim() !== '' ? (
              <p style={{ whiteSpace: 'pre-wrap' }}>{note.body}</p>
            ) : (
              <p className="detail-page__empty-body">
                <em>
                  {locale === 'id'
                    ? 'Catatan ini tidak memiliki isi.'
                    : 'This note has no content.'}
                </em>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailPage;
