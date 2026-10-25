import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { RiStickyNoteFill } from 'react-icons/ri';
import {
  HiOutlineClipboardList,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineLogout,
} from 'react-icons/hi';
import { MdOutlineArchive, MdLanguage } from 'react-icons/md';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';
import useConfirm from '../hooks/useConfirm';

function Header({ authedUser, onLogout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { locale, toggleLocale, content } = useContext(LocaleContext);
  const confirm = useConfirm();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .trim()
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const handleLogoutClick = async () => {
    const isConfirmed = await confirm(content.logoutConfirm);
    if (isConfirmed) {
      onLogout();
    }
  };

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand" aria-label={content.brand}>
          <span className="header__brand-icon">
            <RiStickyNoteFill />
          </span>
          <span className="header__brand-title">{content.brand}</span>
        </Link>

        {authedUser && (
          <>
            <span className="header__sep" aria-hidden="true" />
          <nav className="nav nav--main" aria-label="Main Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              <HiOutlineClipboardList size={18} />
              <span>{content.navNotes}</span>
            </NavLink>
            <NavLink
              to="/archived"
              className={({ isActive }) =>
                isActive ? 'nav__link nav__link--active' : 'nav__link'
              }
            >
              <MdOutlineArchive size={18} />
              <span>{content.navArchive}</span>
            </NavLink>
          </nav>
          </>
        )}

        <div className="header__controls">
          {/* Locale Switcher Button */}
          <button
            type="button"
            className="control-btn control-btn--locale"
            onClick={toggleLocale}
            title={content.switchLocale}
            aria-label={content.switchLocale}
          >
            <MdLanguage size={18} />
            <span className="control-btn__badge">{content.currentLocaleBadge}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="control-btn control-btn--theme"
            onClick={toggleTheme}
            title={theme === 'light' ? content.themeToDark : content.themeToLight}
            aria-label={theme === 'light' ? content.themeToDark : content.themeToLight}
          >
            {theme === 'light' ? <HiOutlineMoon size={18} /> : <HiOutlineSun size={18} />}
          </button>

          {/* User info & Logout (if logged in) */}
          {authedUser ? (
            <div className="header__user-wrapper">
              <div
                className="user-badge"
                title={`${content.greeting}, ${authedUser.name} (${authedUser.email})`}
              >
                <div className="user-badge__avatar" aria-hidden="true">
                  {getInitials(authedUser.name)}
                </div>
                <span className="user-badge__name">{authedUser.name}</span>
              </div>
              <button
                type="button"
                className="control-btn control-btn--logout"
                onClick={handleLogoutClick}
                title={content.logout}
                aria-label={content.logout}
              >
                <HiOutlineLogout size={18} />
                <span className="control-btn__text">{content.logout}</span>
              </button>
            </div>
          ) : (
            <nav className="nav nav--auth" aria-label="Authentication Navigation">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'auth-link auth-link--active' : 'auth-link'
                }
              >
                {content.navLogin}
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? 'auth-link auth-link--highlight auth-link--active'
                    : 'auth-link auth-link--highlight'
                }
              >
                {content.navRegister}
              </NavLink>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  authedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  authedUser: null,
};

export default Header;
