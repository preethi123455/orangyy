import React from 'react';

const About = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#FF6B35', fontSize: '2.5rem', marginBottom: '20px' }}>About Orangyy</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
        Orangyy is your go-to destination for the freshest, most delicious orange juice. 
        Our oranges are hand-picked from local farms to ensure the highest quality and natural taste. 
        We believe in providing healthy, refreshing beverages that bring a burst of sunshine to your day.
      </p>

      <h2 style={{ color: '#FF6B35', marginTop: '30px', marginBottom: '15px' }}>Our Mission</h2>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
        At Orangyy, our mission is to make fresh, natural, and nutritious orange juice accessible to everyone. 
        We are committed to sustainability, supporting local farmers, and delivering a product that is both healthy and tasty.
      </p>

      <h2 style={{ color: '#FF6B35', marginTop: '30px', marginBottom: '15px' }}>Why Choose Us?</h2>
      <ul style={{ fontSize: '1.1rem', color: '#333', lineHeight: '1.8' }}>
        <li>100% natural, no added sugar or preservatives.</li>
        <li>Freshly squeezed daily from local oranges.</li>
        <li>Sustainable sourcing supporting local farmers.</li>
        <li>Quick delivery right to your doorstep.</li>
      </ul>
    </div>
  );
};

export default About;
