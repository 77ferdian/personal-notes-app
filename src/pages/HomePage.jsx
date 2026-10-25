import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { HiOutlineClipboardList, HiOutlinePlus } from 'react-icons/hi';
import { getActiveNotes } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import NoteActionButton from '../components/NoteActionButton';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const { content } = useContext(LocaleContext);
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    let isMounted = true;

    async function fetchNotes() {
      setIsLoading(true);
      const { error, data } = await getActiveNotes();
      if (isMounted) {
        if (!error && data) {
          setNotes(data);
        }
        setIsLoading(false);
      }
    }

    fetchNotes();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleKeywordChange(newKeyword) {
    if (newKeyword.trim()) {
      setSearchParams({ keyword: newKeyword });
    } else {
      setSearchParams({});
    }
  }

  function handleAddNote() {
    navigate('/notes/new');
  }

  const filteredNotes = keyword
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : notes;

  const subtitleText = keyword
    ? content.searchResults
        .replace('{count}', filteredNotes.length)
        .replace('{keyword}', keyword)
    : content.activeNotesCount.replace('{count}', notes.length);

  const emptyMessage = keyword
    ? content.emptySearchTitle
    : content.emptyActiveTitle;

  const emptyHint = keyword
    ? content.emptySearchHint.replace('{keyword}', keyword)
    : content.emptyActiveHint;

  return (
    <main className="main-content">
      <div className="page-header-section">
        <div className="page-heading">
          <span className="page-heading__icon">
            <HiOutlineClipboardList />
          </span>
          <h2 className="page-heading__title">{content.activeNotesTitle}</h2>
        </div>
        <p className="page-subtitle">{subtitleText}</p>
      </div>

      <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />

      <NoteList
        notes={filteredNotes}
        emptyMessage={emptyMessage}
        emptyHint={emptyHint}
        isLoading={isLoading}
      />

      <div className="page-actions" aria-label="Page Actions">
        <NoteActionButton
          title={content.addNoteBtn}
          onClick={handleAddNote}
          className="action-btn--primary action-btn--fab"
        >
          <HiOutlinePlus />
        </NoteActionButton>
      </div>
    </main>
  );
}

export default HomePage;
