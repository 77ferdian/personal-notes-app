import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineHome } from 'react-icons/hi';
import { TbError404 } from 'react-icons/tb';
import LocaleContext from '../contexts/LocaleContext';

function NotFoundPage() {
  const { content } = useContext(LocaleContext);

  return (
    <main className="main-content">
      <div className="not-found-page">
        <div className="not-found-page__card">
          <div className="not-found-page__icon-box">
            <TbError404 size={64} className="not-found-page__icon" />
          </div>
          <h1 className="not-found-page__title">{content.notFoundTitle}</h1>
          <p className="not-found-page__text">{content.notFoundSubtitle}</p>
          <div className="not-found-page__action">
            <Link to="/" className="action-btn action-btn--primary">
              <HiOutlineHome size={18} />
              <span>{content.goHome}</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;
