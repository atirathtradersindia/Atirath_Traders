import React, { useState } from 'react';
import { X } from 'lucide-react';

const SignIn = ({ onNavigate, onSignIn, onClose, preFilledEmail = '' }) => {
  const [formData, setFormData] = useState({
    email: preFilledEmail,
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sign in - in real app, this would verify with server
    const user = {
      name: 'User Name', // This would come from server
      email: formData.email
    };
    onSignIn(user);
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      alert('Please enter your email address first to reset your password.');
      return;
    }
    alert(`Password reset link has been sent to ${formData.email}. Please check your email.`);
  };

  return (
    <div className="auth-form">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="back-button btn btn-link p-0 text-decoration-none"
          onClick={onClose}
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="logo-container-center">
          <div className="auth-logo">
            <img src="/img/icon2.png" alt="ATIRATH GROUP Logo" className="logo-img" />
          </div>
        </div>
        <div style={{ width: '24px' }}></div> {/* Spacer for alignment */}
      </div>
      
      <h2 className="h1 fw-bold accent text-center mb-4">Sign In</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control search-bar"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control search-bar"
            placeholder="Enter your password"
            required
          />
        </div>
        
        {/* Forgot Password and Sign Up Links - Side by Side */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="text-sm opacity-80">Don't have an account? </span>
            <button 
              type="button"
              className="btn btn-link accent p-0 text-decoration-none"
              onClick={() => onNavigate('signup')}
            >
              Sign Up
            </button>
          </div>
          <button 
            type="button"
            className="btn btn-link p-0 text-decoration-none forgot-password-link"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-100 py-3 fw-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

const SignUp = ({ onNavigate, onSignUp, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    // Simulate sign up - in real app, this would send to server
    const user = {
      name: formData.name,
      email: formData.email
    };
    onSignUp(user, formData.email);
  };

  return (
    <div className="auth-form">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button 
          className="back-button btn btn-link p-0 text-decoration-none"
          onClick={onClose}
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="logo-container-center">
          <div className="auth-logo">
            <img src="/img/icon2.png" alt="ATIRATH GROUP Logo" className="logo-img" />
          </div>
        </div>
        <div style={{ width: '24px' }}></div> {/* Spacer for alignment */}
      </div>
      
      <h2 className="h1 fw-bold accent text-center mb-4">Sign Up</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control search-bar"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control search-bar"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control search-bar"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="form-control search-bar"
            placeholder="Confirm your password"
            required
          />
        </div>
        
        {/* Sign In Link */}
        <div className="text-center mb-4">
          <span className="text-sm opacity-80">Already have an account? </span>
          <button 
            className="btn btn-link accent p-0 text-decoration-none"
            onClick={() => onNavigate('signin')}
          >
            Sign In
          </button>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-100 py-3 fw-semibold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export { SignIn, SignUp };