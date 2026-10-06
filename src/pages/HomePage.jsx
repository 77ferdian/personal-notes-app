import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { HiOutlineClipboardList, HiOutlinePlus } from 'react-icons/hi';
import { getActiveNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import NoteActionButton from '../components/NoteActionButton';

function HomePage({ onAddNote }) {
  const location = useLocation();
  const [notes, setNotes] = useState(getActiveNotes());
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    setNotes(getActiveNotes());
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
          <HiOutlineClipboardList />
        </span>
        <h2>Catatan Aktif</h2>
      </div>
      <p className="page-subtitle">
        {totalCount} catatan tersimpan
        {keyword && ` · menampilkan ${filteredNotes.length} hasil untuk "${keyword}"`}
      </p>

      <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />

      <NoteList
        notes={filteredNotes}
        emptyMessage={keyword ? 'Catatan tidak ditemukan.' : 'Belum ada catatan.'}
        emptyHint={keyword ? `Tidak ada catatan dengan judul "${keyword}".` : 'Tekan tombol + untuk membuat catatan baru.'}
      />

      <div className="page-actions">
        <NoteActionButton
          title="Tambah Catatan Baru"
          onClick={onAddNote}
          className="action-btn--primary"
        >
          <HiOutlinePlus />
        </NoteActionButton>
      </div>
    </main>
  );
}

export default HomePage;
