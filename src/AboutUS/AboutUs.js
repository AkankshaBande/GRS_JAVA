import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1>About Us</h1>
        <p>We are committed to providing a transparent and efficient grievance redressal system to ensure the best experience for all our users.</p>
      </div>
    </section>
  
    {/* Mission Section */}
    <section className="mission-section">
      <div className="content-wrapper">
        <h2>Our Mission</h2>
        <p>
          Our mission is to create a platform where grievances are resolved swiftly and efficiently, ensuring that every complaint is addressed in a transparent and structured manner.
          We believe in empowering people with the right tools to raise and resolve their concerns seamlessly.
        </p>
      </div>
    </section>
  
    {/* Team Section */}
    <section className="team-section">
      <div className="content-wrapper">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/owner.png" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="/owner.png" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Head of Operations</p>
          </div>
          <div className="team-member">
            <img src="/owner.png" alt="Team Member 3" />
            <h3>Mike Johnson</h3>
            <p>Lead Developer</p>
          </div>
        </div>
      </div>
    </section>
  
    {/* Contact Us Section */}
 {/* <section className="contact-section">
  <div className="content-wrapper">
    <h2>Contact Us</h2>
    <p>Have any questions or concerns? Feel free to reach out to us using the form below or via the provided contact details.</p>

    <div className="contact-details">
      <p><strong>Email:</strong> support@grievancesystem.com</p>
      <p><strong>Phone:</strong> +1 234 567 890</p>
      <p><strong>Address:</strong> 123 Grievance Lane, Complaint City, USA</p>
    </div>

    <div className="contact-form-wrapper">
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</section> */}


  </div>
  
  );
};

export default AboutUs;