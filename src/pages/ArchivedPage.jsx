import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { MdOutlineArchive } from 'react-icons/md';
import { getArchivedNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';

function ArchivedPage() {
  const location = useLocation();
  const [notes, setNotes] = useState(getArchivedNotes());
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    setNotes(getArchivedNotes());
  }, [location.key]);

  function handleKeywordChange(newKeyword) {
    if (newKeyword) {
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

  const totalCount = notes.length;

  return (
    <main>
      <div className="page-heading">
        <span className="page-heading__icon">
          <MdOutlineArchive />
        </span>
        <h2>Arsip Catatan</h2>
      </div>
      <p className="page-subtitle">
        {totalCount === 0
          ? 'Belum ada catatan yang diarsipkan'
          : `${totalCount} catatan diarsipkan`}
        {keyword && ` · menampilkan ${filteredNotes.length} hasil untuk "${keyword}"`}
      </p>

      <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />

      <NoteList
        notes={filteredNotes}
        emptyMessage={keyword ? 'Catatan tidak ditemukan.' : 'Arsip kosong.'}
        emptyHint={
          keyword
            ? `Tidak ada catatan arsip dengan judul "${keyword}".`
            : 'Arsipkan catatan dari halaman detail untuk menyimpannya di sini.'
        }
      />
    </main>
  );
}

export default ArchivedPage;
