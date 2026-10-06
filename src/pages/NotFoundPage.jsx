import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';
import { TbError404 } from 'react-icons/tb';

function NotFoundPage() {
  return (
    <main>
      <div className="not-found-page">
        <div className="not-found-page__code">404</div>
        <h2 className="not-found-page__title">Halaman Tidak Ditemukan</h2>
        <p className="not-found-page__desc">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          Periksa kembali URL yang Anda masukkan.
        </p>
        <Link to="/" className="btn-home">
          <HiOutlineHome size={18} />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
