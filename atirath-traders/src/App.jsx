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
import AllProducts from './components/AllProducts';
import { SignIn, SignUp } from './components/AuthPages';
import Profile from './components/Profile';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProductType, setCurrentProductType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthForm, setShowAuthForm] = useState(null); // 'signin', 'signup', or null
  const [fromAllProducts, setFromAllProducts] = useState(false);
  const [preFilledEmail, setPreFilledEmail] = useState(''); // For auto-filling email after signup

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });
    
    // Check for saved user ONLY - no page state
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
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

  const handleNavigate = (page, productType = null, options = {}) => {
    console.log('Navigating to:', page, 'with product:', productType, 'options:', options);
    setCurrentPage(page);
    setShowAuthForm(null); // Hide auth forms when navigating to other pages
    
    // Set fromAllProducts flag based on navigation context
    if (options.fromAllProducts !== undefined) {
      setFromAllProducts(options.fromAllProducts);
    } else if (page === 'all-products') {
      // When going to all-products, reset the flag
      setFromAllProducts(false);
    }
    
    if (page === 'product' && productType) {
      setCurrentProductType(productType);
    } else if (page === 'home') {
      setCurrentProductType(null);
      setFromAllProducts(false); // Reset flag when going home
    } else {
      setCurrentProductType(null);
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

  const handleServiceClick = (productType, context = {}) => {
    console.log('Service clicked:', productType, 'context:', context);
    
    // Determine if we're coming from AllProducts
    const fromAllProducts = context.fromAllProducts || currentPage === 'all-products';
    
    handleNavigate('product', productType, { fromAllProducts });
  };

  const handleViewAllClick = () => {
    console.log('View All clicked - navigating to all-products');
    handleNavigate('all-products');
  };

  const handleSignIn = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowAuthForm(null);
    
    setTimeout(() => {
      alert('Sign in successful! Welcome back!');
      handleNavigate('home'); // Navigate to home after successful sign in
    }, 100);
  };

  const handleSignUp = (user, email) => {
    // After successful sign up, show sign in form with pre-filled email
    setPreFilledEmail(email);
    setShowAuthForm('signin');
    
    setTimeout(() => {
      alert('Sign up successful! Please sign in with your credentials.');
    }, 100);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    handleNavigate('home');
  };

  const closeAuthForm = () => {
    setShowAuthForm(null);
    setPreFilledEmail(''); // Reset pre-filled email when closing auth form
  };

  const renderCurrentPage = () => {
    console.log('Current page:', currentPage);
    console.log('From AllProducts:', fromAllProducts);
    
    switch (currentPage) {
      case 'home':
        return (
          <div id="home-page">
            <Hero />
            <About id="about" />
            <Leadership id="leadership" />
            <Services 
              id="services" 
              onServiceClick={handleServiceClick}
              onViewAllClick={handleViewAllClick}
            />
            <Feedback id="feedback" />
            <Footer id="contact" />
          </div>
        );
      case 'product':
        return (
          <ProductPage 
            productType={currentProductType} 
            onNavigate={handleNavigate}
            fromAllProducts={fromAllProducts}
          />
        );
      case 'all-products':
        return (
          <AllProducts 
            onProductClick={(productType) => handleServiceClick(productType, { fromAllProducts: true })}
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
            <Services 
              id="services" 
              onServiceClick={handleServiceClick}
              onViewAllClick={handleViewAllClick}
            />
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
              onNavigate={setShowAuthForm} // Use setShowAuthForm to switch between signin/signup
              onSignIn={handleSignIn}
              onClose={closeAuthForm}
              preFilledEmail={preFilledEmail}
            />
          ) : (
            <SignUp 
              onNavigate={setShowAuthForm} // Use setShowAuthForm to switch between signin/signup
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