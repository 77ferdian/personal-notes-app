import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { RiStickyNoteFill } from 'react-icons/ri';
import useInput from '../hooks/useInput';
import useToast from '../hooks/useToast';
import { login } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function LoginPage({ loginSuccess }) {
  const { content } = useContext(LocaleContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    setIsLoading(true);
    const { error, data, message } = await login({ email, password });
    setIsLoading(false);

    if (!error) {
      toast.success(content.loginSuccess);
      loginSuccess(data);
      navigate('/');
    } else {
      toast.error(message || content.loginError);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__brand-icon">
            <RiStickyNoteFill />
          </div>
          <h1 className="auth-card__title">{content.loginTitle}</h1>
          <p className="auth-card__subtitle">{content.loginSubtitle}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              {content.loginEmailLabel}
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <HiOutlineMail />
              </span>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder={content.loginEmailPlaceholder}
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="email"
                autoFocus
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              {content.loginPasswordLabel}
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <HiOutlineLockClosed />
              </span>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input form-input--password"
                placeholder={content.loginPasswordPlaceholder}
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleShowPassword}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <span className="btn-loading-content">
                <span className="spinner-mini" />
                {content.loginSubmitting}
              </span>
            ) : (
              content.loginSubmit
            )}
          </button>
        </form>

        <div className="auth-card__footer">
          <p>
            {content.noAccount}{' '}
            <Link to="/register" className="auth-switch-link">
              {content.registerHere}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
