import React, { useState } from 'react';
import './Contact.css'; // Add your custom styling here
import Navbar from './Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., sending the data to your backend or API)
    console.log('Form Data Submitted:', formData);
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' }); // Reset form fields
  };

  return (
    <div className="contact-container">
        <Navbar />
      <section className="contact-intro">
        <h1>Contact Us</h1>
        <p>We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.</p>
      </section>

      <section className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      </section>

      <section className="contact-info">
        <h2>Our Details</h2>
        <ul>
          <li>
            <strong>Email:</strong> contact@ourgroceryshop.com
          </li>
          <li>
            <strong>Phone:</strong> (123) 456-7890
          </li>
          <li>
            <strong>Address:</strong> 123 Main Street, Grocery Town, USA
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Contact;
