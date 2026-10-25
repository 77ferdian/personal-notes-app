import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineArchive } from 'react-icons/md';
import { getArchivedNotes } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import LocaleContext from '../contexts/LocaleContext';

function ArchivedPage() {
  const { content } = useContext(LocaleContext);

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    let isMounted = true;

    async function fetchArchivedNotes() {
      setIsLoading(true);
      const { error, data } = await getArchivedNotes();
      if (isMounted) {
        if (!error && data) {
          setNotes(data);
        }
        setIsLoading(false);
      }
    }

    fetchArchivedNotes();

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

  const filteredNotes = keyword
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : notes;

  const subtitleText = keyword
    ? content.searchResults
        .replace('{count}', filteredNotes.length)
        .replace('{keyword}', keyword)
    : content.archiveNotesCount.replace('{count}', notes.length);

  const emptyMessage = keyword
    ? content.emptySearchTitle
    : content.emptyArchiveTitle;

  const emptyHint = keyword
    ? content.emptySearchHint.replace('{keyword}', keyword)
    : content.emptyArchiveHint;

  return (
    <main className="main-content">
      <div className="page-header-section">
        <div className="page-heading">
          <span className="page-heading__icon">
            <MdOutlineArchive />
          </span>
          <h2 className="page-heading__title">{content.archiveNotesTitle}</h2>
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
    </main>
  );
}

export default ArchivedPage;
