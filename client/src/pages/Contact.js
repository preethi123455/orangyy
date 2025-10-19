import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been received.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ color: '#FF6B35', fontSize: '2.5rem', marginBottom: '20px' }}>Contact Us</h1>
      <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '30px' }}>
        Have questions or suggestions? Reach out to us using the form below, and we'll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="6"
          style={{ padding: '10px', fontSize: '1rem', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
        />
        <button type="submit" style={{ backgroundColor: '#FF6B35', color: '#fff', padding: '12px', fontSize: '1rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Send Message
        </button>
      </form>

      <div style={{ marginTop: '40px', fontSize: '1rem', color: '#333' }}>
        <p><strong>Email:</strong> support@orangyy.com</p>
        <p><strong>Phone:</strong> +1 234 567 8901</p>
        <p><strong>Address:</strong> 123 Orange Street, Citrus City, USA</p>
      </div>
    </div>
  );
};

export default ContactUs;
