import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';
import { RiStickyNoteFill } from 'react-icons/ri';
import useInput from '../hooks/useInput';
import useToast from '../hooks/useToast';
import { register } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';

function RegisterPage() {
  const { content } = useContext(LocaleContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [confirmPassword, handleConfirmPasswordChange] = useInput('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    if (password.length < 6) {
      toast.error(content.passwordTooShort);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(content.passwordMismatch);
      return;
    }

    setIsLoading(true);
    const { error, message } = await register({ name, email, password });
    setIsLoading(false);

    if (!error) {
      toast.success(content.registerSuccess);
      navigate('/login');
    } else {
      toast.error(message || content.registerError);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__brand-icon">
            <RiStickyNoteFill />
          </div>
          <h1 className="auth-card__title">{content.registerTitle}</h1>
          <p className="auth-card__subtitle">{content.registerSubtitle}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
              {content.registerNameLabel}
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <HiOutlineUser />
              </span>
              <input
                id="reg-name"
                type="text"
                className="form-input"
                placeholder={content.registerNamePlaceholder}
                value={name}
                onChange={handleNameChange}
                required
                autoComplete="name"
                autoFocus
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              {content.registerEmailLabel}
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <HiOutlineMail />
              </span>
              <input
                id="reg-email"
                type="email"
                className="form-input"
                placeholder={content.registerEmailPlaceholder}
                value={email}
                onChange={handleEmailChange}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">
              {content.registerPasswordLabel}
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <HiOutlineLockClosed />
              </span>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input form-input--password"
                placeholder={content.registerPasswordPlaceholder}
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="reg-confirm-password" className="form-label">
              {content.registerConfirmPasswordLabel}
            </label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">
                <HiOutlineLockClosed />
              </span>
              <input
                id="reg-confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-input form-input--password"
                placeholder={content.registerConfirmPasswordPlaceholder}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                autoComplete="new-password"
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                title={showConfirmPassword ? 'Hide password' : 'Show password'}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading || !name || !email || !password || !confirmPassword}
          >
            {isLoading ? (
              <span className="btn-loading-content">
                <span className="spinner-mini" />
                {content.registerSubmitting}
              </span>
            ) : (
              content.registerSubmit
            )}
          </button>
        </form>

        <div className="auth-card__footer">
          <p>
            {content.hasAccount}{' '}
            <Link to="/login" className="auth-switch-link">
              {content.loginHere}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
