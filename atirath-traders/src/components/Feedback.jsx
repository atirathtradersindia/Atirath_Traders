import React, { useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a server
    console.log('Feedback submitted:', formData);
    
    // Show success message
    setShowPopup(true);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <section id="feedback" className="py-5 px-3">
      <div className="container">
        <h3 className="h2 fw-bold text-center accent mb-5" data-aos="zoom-in">Feedback</h3>
        <div className="row g-5">
          {/* Left side: Company Details */}
          <div className="col-lg-6" data-aos="fade-up">
            <div className="glass p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="footer-logo-icon">
                  <img src="/img/icon2.png" alt="ATIRATH GROUP Logo" className="logo-img" />
                </div>
                <div>
                  <h4 className="h5 fw-bold accent mb-0">ATIRATH TRADERS INDIA PVT.LTD</h4>
                  <p className="small opacity-80 mb-0">Diverse Businesses, One Vision</p>
                </div>
              </div>
              <div>
                <p className="small mb-2">
                  <span className="fw-semibold">Website:</span> www.atirathtraders.com
                </p>
                <p className="small mb-2">
                  <span className="fw-semibold">Email:</span> info@atirathtraders.com, Techteam@atirathtraders.com
                </p>
                <p className="small mb-2">
                  <span className="fw-semibold">Phone:</span> +91 7396007479
                </p>
                <p className="small mb-2">
                  <span className="fw-semibold">Social Media:</span> @AtirathTraders (LinkedIn, Instagram, Facebook, Twitter)
                </p>
                <p className="small mb-0">
                  <span className="fw-semibold">Address:</span> Flat No:45, Jai Hind Silicon valley, Madhapur Hyderabad, Telangana, 500081
                </p>
              </div>
            </div>
          </div>

          {/* Right side: Feedback Form */}
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <div className="glass p-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
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
                <div>
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
                <div>
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control search-bar"
                    placeholder="Write your feedback..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="popup visible">
          <div className="popup-content">
            <h3>Submit Successful</h3>
            <p>Thank you for your feedback! We appreciate your input.</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Feedback;
