import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { productsData, brandsData } from '../data/productsData';
import BuyModal from './BuyModal';

const ProductPage = ({ productType, onNavigate, profile }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    console.log('ProductPage: productType:', productType, 'productsData:', productsData[productType]);
    if (productType && productsData[productType]) {
      const productList = productsData[productType];
      const brandList = brandsData[productType] || [];
      
      setProducts(productList);
      setFilteredProducts(productList);
      setBrands(brandList);
    } else {
      console.warn('ProductPage: No products found for productType:', productType);
    }
  }, [productType]);

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
    console.log('ProductPage: isBuyModalOpen set to:', true);
  };

  const handleCloseBuyModal = () => {
    console.log('ProductPage: Closing BuyModal');
    setIsBuyModalOpen(false);
    setSelectedProduct(null);
  };

  if (!productType || !productsData[productType]) {
    return <div>No products available for this category.</div>;
  }

  return (
    <div className="product-page">
      {/* Desktop Categories Toggle */}
      <button 
        className="categories-toggle d-none d-md-flex"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-5 h-5" /> Categories
      </button>
      
      {/* Mobile Categories Toggle */}
      <button 
        className="categories-toggle-mobile d-md-none"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="w-5 h-5" /> Categories
      </button>
      
      {/* Desktop Sidebar */}
      <div className={`categories-sidebar ${sidebarOpen ? 'active' : ''} d-none d-md-block`}>
        <h3 className="h4 fw-bold accent mb-4 px-3 pt-3">
          {productType.charAt(0).toUpperCase() + productType.slice(1)} Brands
        </h3>
        <ul className="brand-list">
          {brands.map((brand, index) => (
            <li
              key={brand}
              className={`brand-item ${selectedBrand === brand ? 'active' : ''}`}
              onClick={() => handleBrandSelect(brand)}
              data-aos="slide-right"
              data-aos-delay={index * 50}
            >
              {brand.charAt(0).toUpperCase() + brand.slice(1)}
            </li>
          ))}
        </ul>
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
          <div className="brand-list-mobile">
            {brands.map((brand, index) => (
              <div
                key={brand}
                className={`brand-item-mobile ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => handleBrandSelect(brand)}
              >
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </div>
            ))}
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
      <div className="product-main-content">
        <button 
          className="back-button"
          onClick={() => onNavigate('home')}
          title="Back to Home"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products-message">
              <p className="h5 accent">No products found</p>
              <p className="text-sm opacity-80 mt-2">Try selecting a different brand</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="product-card" data-aos="fade-up">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-title fw-semibold mb-2">{product.name}</h3>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <p className="product-price fw-bold text-accent mb-0">{product.price}</p>
                  </div>
                  <p className="text-xs opacity-70 mt-1">Brand: {product.brand}</p>
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