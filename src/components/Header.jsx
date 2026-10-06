import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiStickyNoteFill } from 'react-icons/ri';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { MdOutlineArchive } from 'react-icons/md';

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">
          <span className="header__brand-icon">
            <RiStickyNoteFill />
          </span>
          Catatan Pribadi
        </Link>

        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
          >
            <HiOutlineClipboardList size={17} />
            <span>Catatan</span>
          </NavLink>
          <NavLink
            to="/archived"
            className={({ isActive }) =>
              isActive ? 'nav__link nav__link--active' : 'nav__link'
            }
          >
            <MdOutlineArchive size={17} />
            <span>Arsip</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
