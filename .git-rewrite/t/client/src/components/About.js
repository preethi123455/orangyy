import React from 'react';
import './About.css'; // You can add your own styling here
import Navbar from './Navbar';

const About = () => {
  return (
    <div className="about-container">
        <Navbar />
      <section className="about-intro">
        <h1>Welcome to Our Grocery Shop</h1>
        <p>
          At [Shop Name], we are committed to providing you with the best
          quality produce, groceries, and everyday essentials. Our store offers
          fresh and organic options to meet all your shopping needs, delivered
          with exceptional service and great value.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          We believe in supporting local farmers, sourcing the freshest
          ingredients, and ensuring that our customers have access to a wide
          variety of organic, fresh, and healthy food options. Our mission is to
          make grocery shopping convenient, affordable, and sustainable for
          families and individuals in our community.
        </p>
      </section>

      <section className="about-vision">
        <h2>Our Vision</h2>
        <p>
          Our vision is to create a grocery shopping experience that is simple,
          enjoyable, and empowering. We want our customers to feel confident in
          the quality of their food and to know that they are supporting
          businesses that prioritize sustainability and ethical practices.
        </p>
      </section>

      <section className="about-values">
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Freshness:</strong> We offer only the freshest produce and
            groceries to ensure your family enjoys healthy meals every day.
          </li>
          <li>
            <strong>Quality:</strong> We carefully select our products to
            maintain the highest quality standards.
          </li>
          <li>
            <strong>Sustainability:</strong> We are committed to sustainable
            practices, including eco-friendly packaging and supporting local
            farmers.
          </li>
          <li>
            <strong>Customer Service:</strong> Our team is dedicated to providing
            exceptional service and making your shopping experience hassle-free.
          </li>
        </ul>
      </section>

      <section className="about-contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to get in touch with
          us:
        </p>
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

export default About;
