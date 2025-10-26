import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, ImageOff } from 'lucide-react';
import { productsData, brandsData } from '../data/productsData';
import BuyModal from './BuyModal';

const ProductPage = ({ productType, onNavigate, profile, fromAllProducts = false }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    console.log('ProductPage: productType:', productType, 'productsData:', productsData[productType]);
    console.log('ProductPage: fromAllProducts:', fromAllProducts);
    
    // Reset states when productType changes
    setIsLoading(true);
    setSelectedBrand('all');
    setImageErrors({});
    
    if (productType && productsData[productType]) {
      const productList = productsData[productType];
      const brandList = brandsData[productType] || [];
      
      setProducts(productList);
      setFilteredProducts(productList);
      setBrands(brandList);
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    } else {
      console.warn('ProductPage: No products found for productType:', productType);
      setIsLoading(false);
    }
  }, [productType, fromAllProducts]);

  useEffect(() => {
    let filtered = products;
    
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }
    
    setFilteredProducts(filtered);
  }, [selectedBrand, products]);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSidebarOpen(false);
    setMobileMenuOpen(false);
  };

  const handleOrderNow = (product) => {
    console.log('ProductPage: Opening BuyModal for product:', product);
    setSelectedProduct({ 
      ...product, 
      quantity: 1,
      name: product.name,
      brand: product.brand,
      category: productType
    });
    setIsBuyModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    console.log('ProductPage: Closing BuyModal');
    setIsBuyModalOpen(false);
    setSelectedProduct(null);
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const handleBackClick = () => {
    console.log('ProductPage: Back button clicked, fromAllProducts:', fromAllProducts);
    if (fromAllProducts) {
      // If we came from AllProducts, go back to All Products
      onNavigate('all-products');
    } else {
      // Otherwise, go back to home
      onNavigate('home');
    }
  };

  // Format brand name for display
  const formatBrandName = (brand) => {
    if (brand === 'all') return 'All Brands';
    return brand.charAt(0).toUpperCase() + brand.slice(1).replace(/_/g, ' ');
  };

  // Fallback images for different categories
  const getFallbackImage = (category, productName) => {
    const fallbackImages = {
      rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60',
      spices: 'https://images.unsplash.com/photo-1557841450-9aa4b8cbf6c0?w=500&auto=format&fit=crop&q=60',
      oil: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=500&auto=format&fit=crop&q=60',
      construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=60',
      fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&auto=format&fit=crop&q=60',
      vegetables: 'https://images.unsplash.com/photo-1594282486306-7a6f8b590dd1?w=500&auto=format&fit=crop&q=60',
      pulses: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/2/15/0/HE_dried-legumes-istock-2_s4x3.jpg.rend.hgtvcom.1280.1280.85.suffix/1455572939649.webp',
      default: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&auto=format&fit=crop&q=60'
    };
    return fallbackImages[category] || fallbackImages.default;
  };

  if (!productType) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="text-center">
          <p className="h5 text-muted">No category selected.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={handleBackClick}
          >
            Back to {fromAllProducts ? 'All Products' : 'Home'}
          </button>
        </div>
      </div>
    );
  }

  if (!productsData[productType]) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="text-center">
          <p className="h5 text-muted">No products available for this category.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={handleBackClick}
          >
            Back to {fromAllProducts ? 'All Products' : 'Home'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      {/* Desktop Categories Toggle */}
      <button 
        className="categories-toggle d-none d-md-flex"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-5 h-5" /> Brands
      </button>
      
      {/* Mobile Categories Toggle */}
      <button 
        className="categories-toggle-mobile d-md-none"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="w-5 h-5" /> Brands
      </button>
      
      {/* Desktop Sidebar - Fixed sliding animation */}
      <div className={`categories-sidebar ${sidebarOpen ? 'active' : ''} d-none d-md-block`}>
        <div className="sidebar-header">
          <h3 className="h4 fw-bold accent mb-0">
            {productType.charAt(0).toUpperCase() + productType.slice(1)} Brands
          </h3>
          <button 
            className="btn btn-link p-0 text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="brand-list-container">
          <ul className="brand-list">
            <li
              className={`brand-item ${selectedBrand === 'all' ? 'active' : ''}`}
              onClick={() => handleBrandSelect('all')}
            >
              <span className="brand-text">All Brands</span>
            </li>
            {brands.map((brand, index) => (
              <li
                key={brand}
                className={`brand-item ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => handleBrandSelect(brand)}
              >
                <span className="brand-text">{formatBrandName(brand)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mobile Categories Menu */}
      <div className={`mobile-categories-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-categories-header">
          <h3 className="h4 fw-bold accent mb-0">
            {productType.charAt(0).toUpperCase() + productType.slice(1)} Brands
          </h3>
          <button 
            className="btn btn-link p-0 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mobile-categories-content">
          <div className="brand-list-container-mobile">
            <div className="brand-list-mobile">
              <div
                className={`brand-item-mobile ${selectedBrand === 'all' ? 'active' : ''}`}
                onClick={() => handleBrandSelect('all')}
              >
                <span className="brand-text">All Brands</span>
              </div>
              {brands.map((brand, index) => (
                <div
                  key={brand}
                  className={`brand-item-mobile ${selectedBrand === brand ? 'active' : ''}`}
                  onClick={() => handleBrandSelect(brand)}
                >
                  <span className="brand-text">{formatBrandName(brand)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      <div 
        className={`overlay ${sidebarOpen || mobileMenuOpen ? 'active' : ''}`}
        onClick={() => {
          setSidebarOpen(false);
          setMobileMenuOpen(false);
        }}
      />
      
      {/* Main Content */}
      <div className={`product-main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <button 
          className="back-button"
          style={{ top: isMobile ? '180px' : '120px' }} // Increased top position for more space above the back button, with higher value for mobile view
          onClick={handleBackClick}
          title={`Back to ${fromAllProducts ? 'All Products' : 'Home'}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="loading-products">
            <div className="spinner-border text-accent" role="status">
              <span className="visually-hidden">Loading products...</span>
            </div>
            <p className="mt-3 text-muted">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Selected Brand Info */}
            {selectedBrand !== 'all' && (
              <div className="selected-brand-info mb-4">
                <span>Showing: <strong>{formatBrandName(selectedBrand)}</strong></span>
                <button 
                  className="btn btn-outline-accent btn-sm ms-2"
                  onClick={() => handleBrandSelect('all')}
                >
                  Show All
                </button>
              </div>
            )}
            
            {/* Products Grid */}
            <div 
              className="products-grid"
              style={{ marginTop: isMobile ? '0rem' : '0.5rem' }} // Further decreased top margin for even less space above the cards, with smaller value for mobile
            >
              {filteredProducts.length === 0 ? (
                <div className="no-products-message">
                  <p className="h5 accent">No products found</p>
                  <p className="text-sm opacity-80 mt-2">Try selecting a different brand</p>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <div key={product.id} className="product-card" data-aos="fade-up">
                    <div className="product-image-container">
                      {imageErrors[product.id] ? (
                        <div className="product-image-fallback">
                          <ImageOff className="w-8 h-8 text-muted" />
                          <span className="text-xs text-muted mt-2">Image not available</span>
                        </div>
                      ) : (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-image"
                          onError={() => handleImageError(product.id)}
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="product-info">
                      <h3 className="product-title fw-semibold mb-2">{product.name}</h3>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="product-price fw-bold text-accent mb-0">{product.price}</p>
                      </div>
                      <p className="text-xs opacity-70 mt-1">Brand: {formatBrandName(product.brand)}</p>
                      <div className="product-actions d-flex gap-2 mt-3">
                        <button 
                          className="btn btn-success btn-sm w-100"
                          onClick={() => handleOrderNow(product)}
                          aria-label={`Order ${product.name} now`}
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>

      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={handleCloseBuyModal}
        product={selectedProduct}
        profile={profile || null}
      />
    </div>
  );
};

export default ProductPage;