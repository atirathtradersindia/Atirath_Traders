import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Leadership from './components/Leadership';
import Services from './components/Services';
import Feedback from './components/Feedback';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import { SignIn, SignUp } from './components/AuthPages';
import Profile from './components/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProductType, setCurrentProductType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(null); // 'signin', 'signup', or null

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });
    
    // Check for saved user ONLY - no page state
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    // REMOVED: Loading saved page state
    // Always start on home page regardless of previous session

    // Handle hash URL navigation
    const handleHashChange = () => {
      if (window.location.hash && currentPage === 'home') {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 300);
      }
    };

    // Initial hash check
    setTimeout(handleHashChange, 500);

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentPage]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigate = (page, productType = null) => {
    setCurrentPage(page);
    setShowAuthForm(null); // Hide auth forms when navigating to other pages
    
    if (page === 'product' && productType) {
      setCurrentProductType(productType);
      // REMOVED: localStorage saving for page state
    } else if (page === 'home') {
      setCurrentProductType(null);
      // REMOVED: localStorage clearing for page state
    } else {
      setCurrentProductType(null);
      // REMOVED: localStorage saving for page state
    }
    
    window.scrollTo(0, 0);
  };

  const handleAuthNavigation = (formType) => {
    if (currentUser) {
      handleNavigate('profile');
    } else {
      setShowAuthForm(formType);
      window.scrollTo(0, 0);
    }
  };

  const handleServiceClick = (productType) => {
    handleNavigate('product', productType);
  };

  const handleSignIn = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowAuthForm(null);
    
    setTimeout(() => {
      alert('Sign in successful! Welcome back!');
    }, 100);
  };

  const handleSignUp = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowAuthForm(null);
    
    setTimeout(() => {
      alert('Sign up successful! Welcome!');
    }, 100);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    handleNavigate('home');
  };

  const closeAuthForm = () => {
    setShowAuthForm(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div id="home-page">
            <Hero />
            <About id="about" />
            <Leadership id="leadership" />
            <Services id="services" onServiceClick={handleServiceClick} />
            <Feedback id="feedback" />
            <Footer id="contact" />
          </div>
        );
      case 'product':
        return (
          <ProductPage 
            productType={currentProductType} 
            onNavigate={handleNavigate}
          />
        );
      case 'profile':
        return (
          <div className="profile-page">
            <Profile 
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          </div>
        );
      default:
        return (
          <div id="home-page">
            <Hero />
            <About id="about" />
            <Leadership id="leadership" />
            <Services id="services" onServiceClick={handleServiceClick} />
            <Feedback id="feedback" />
            <Footer id="contact" />
          </div>
        );
    }
  };

  const renderAuthForm = () => {
    if (!showAuthForm) return null;

    return (
      <div className="auth-overlay">
        <div className="auth-form-container">
          {showAuthForm === 'signin' ? (
            <SignIn 
              onNavigate={handleNavigate}
              onSignIn={handleSignIn}
              onClose={closeAuthForm}
            />
          ) : (
            <SignUp 
              onNavigate={handleNavigate}
              onSignUp={handleSignUp}
              onClose={closeAuthForm}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`App ${showAuthForm ? 'auth-overlay-active' : ''}`}>
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onAuthNavigate={handleAuthNavigation}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      {renderAuthForm()}
      
      {!showAuthForm && renderCurrentPage()}
    </div>
  );
}

export default App;