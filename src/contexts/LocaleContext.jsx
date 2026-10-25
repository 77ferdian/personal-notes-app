import React, { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import localeContent from '../utils/locale-data';

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === 'id' ? 'en' : 'id'));
  };

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
      content: localeContent[locale] || localeContent.id,
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={localeContextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LocaleContext;
