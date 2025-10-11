import React from 'react';
import { ArrowLeft } from 'lucide-react';

const Profile = ({ currentUser, onNavigate, onLogout }) => {
  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <button 
            className="back-button mb-4"
            onClick={() => onNavigate('home')}
            title="Back to Home"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="glass p-5 profile-card" data-aos="fade-up">
            <div className="logo-container-center mb-4">
              <div className="auth-logo">
                <img src="/img/icon2.png" alt="ATIRATH GROUP Logo" className="logo-img" />
              </div>
            </div>
            <h2 className="h1 fw-bold accent text-center mb-4">Profile</h2>
            
            <div className="text-center">
              <p className="mb-4">Please sign in to view your profile.</p>
              <button 
                className="btn btn-primary"
                onClick={() => onNavigate('signin')}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <button 
          className="back-button mb-4"
          onClick={() => onNavigate('home')}
          title="Back to Home"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="glass p-5 profile-card" data-aos="fade-up">
          <div className="logo-container-center mb-4">
            <div className="auth-logo">
              <img src="/img/icon2.png" alt="ATIRATH GROUP Logo" className="logo-img" />
            </div>
          </div>
          <h2 className="h1 fw-bold accent text-center mb-4">Profile</h2>
          
          <div className="profile-info">
            <div className="profile-avatar">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="profile-name">{currentUser.name || 'User Name'}</div>
            <div className="profile-email">{currentUser.email || 'user@example.com'}</div>
            <button 
              className="logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;