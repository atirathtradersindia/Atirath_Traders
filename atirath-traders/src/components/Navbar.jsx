import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ currentPage, onNavigate, onAuthNavigate, currentUser, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    setSearchVisible(currentPage === 'product');
  }, [currentPage]);

  const handleNavigation = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleSectionNavigation = (sectionId) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

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

  const handleAuthNavigation = (formType = 'signin') => {
    onAuthNavigate(formType);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="glass d-flex align-items-center justify-content-between px-4 py-3 fixed-top w-100 z-3">
        <div className="d-flex align-items-center">
          <div className="nav-logo">
            <img src="/img/icon2.png" alt="ATIRATH GROUP Logo" className="logo-img" />
          </div>
          <div className="ms-3">
            <div className="h5 fw-bold accent mb-0">ATIRATH TRADERS INDIA PVT.LTD</div>
            <div className="text-xs opacity-80">Diverse Businesses, One Vision</div>
          </div>
        </div>
        
        <div id="nav-search" className={`mx-auto ${searchVisible ? 'd-block' : 'd-none'}`} style={{ maxWidth: '300px' }}>
          <input 
            type="text" 
            className="search-bar form-control" 
            placeholder="Search products..." 
          />
        </div>
        
        <div className="d-none d-md-flex align-items-center gap-4">
          <button 
            className="btn btn-link text-white text-decoration-none hover-accent p-0 border-0"
            onClick={() => handleNavigation('home')}
          >
            Home
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none hover-accent p-0 border-0"
            onClick={() => handleSectionNavigation('about')}
          >
            About Us
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none hover-accent p-0 border-0"
            onClick={() => handleSectionNavigation('leadership')}
          >
            Leadership
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none hover-accent p-0 border-0"
            onClick={() => handleSectionNavigation('services')}
          >
            Products
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none hover-accent p-0 border-0"
            onClick={() => handleSectionNavigation('feedback')}
          >
            Feedback
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none hover-accent p-0 border-0"
            onClick={() => handleSectionNavigation('contact')}
          >
            Contact
          </button>
          <button 
            className="btn btn-primary py-2 px-3"
            onClick={() => handleAuthNavigation('signin')}
          >
            {currentUser ? 'Profile' : 'Sign In'}
          </button>
          {!currentUser && (
            <button 
              className="btn btn-primary py-2 px-3"
              onClick={() => handleAuthNavigation('signup')}
            >
              Sign Up
            </button>
          )}
        </div>
        
        <button 
          id="menu-btn" 
          className="d-md-none btn p-2 accent border-0"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${mobileMenuOpen ? 'visible' : ''}`}>
        <button 
          className="btn position-absolute top-0 end-0 m-3 p-2 text-white"
          onClick={() => setMobileMenuOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="d-flex flex-column align-items-center gap-4 w-100">
          <button 
            className="btn btn-link text-white text-decoration-none h5 w-100 text-center py-2 border-0"
            onClick={() => handleNavigation('home')}
          >
            Home
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none h5 w-100 text-center py-2 border-0"
            onClick={() => handleSectionNavigation('about')}
          >
            About Us
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none h5 w-100 text-center py-2 border-0"
            onClick={() => handleSectionNavigation('leadership')}
          >
            Leadership
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none h5 w-100 text-center py-2 border-0"
            onClick={() => handleSectionNavigation('services')}
          >
            Products
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none h5 w-100 text-center py-2 border-0"
            onClick={() => handleSectionNavigation('feedback')}
          >
            Feedback
          </button>
          <button 
            className="btn btn-link text-white text-decoration-none h5 w-100 text-center py-2 border-0"
            onClick={() => handleSectionNavigation('contact')}
          >
            Contact
          </button>
          <button 
            className="btn btn-primary w-100 py-2"
            onClick={() => handleAuthNavigation('signin')}
          >
            {currentUser ? 'Profile' : 'Sign In'}
          </button>
          {!currentUser && (
            <button 
              className="btn btn-primary w-100 py-2"
              onClick={() => handleAuthNavigation('signup')}
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;