import React, { useState, useEffect } from 'react';
import './Products.css'; // Ensure this file contains the relevant styling.
import 'boxicons';

const products = [
  {
    id: 1,
    name: 'Apple',
    image: 'https://img.freepik.com/free-photo/side-view-apple-mix-green-yellow-red-apples-background_141793-6853.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Apples are rich in fiber, vitamins, and minerals.',
    price: 120, // Price in INR
    tags: [{ label: 'Organic', color: '#d3b19a' }],
  },
  {
    id: 2,
    name: 'Banana',
    image: 'https://img.freepik.com/free-photo/delicious-bananas-hanging-outdoors_23-2150830486.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Bananas are a great source of potassium and energy.',
    price: 50, // Price in INR
    tags: [
      { label: 'Fresh', color: '#70b3b1' },
      { label: 'Organic', color: '#d05fa2' },
    ],
  },
  {
    id: 3,
    name: 'Orange',
    image: 'https://img.freepik.com/premium-photo/close-up-sliced-oranges-table-against-black-background_1048944-3176006.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Oranges are a rich source of vitamin C and antioxidants.',
    price: 80, // Price in INR
    tags: [{ label: 'Fresh', color: '#d3b19a' }],
  },
  {
    id: 4,
    name: 'Mango',
    image: 'https://img.freepik.com/premium-photo/ripe-cut-mango-with-water-splash-dark-background_392895-10100.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Mangos are high in vitamin A and great for digestion.',
    price: 150, // Price in INR
    tags: [{ label: 'Organic', color: '#d3b19a' }],
  },
  {
    id: 5,
    name: 'Pineapple',
    image: 'https://img.freepik.com/free-photo/fresh-pineapple-dark-wooden-surface_1150-42287.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Pineapples are rich in vitamin C and manganese.',
    price: 90, // Price in INR
    tags: [{ label: 'Fresh', color: '#ffb700' }],
  },
  {
    id: 6,
    name: 'Strawberry',
    image: 'https://img.freepik.com/free-photo/strawberries-bowl-black-table_23-2148352316.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Strawberries are high in antioxidants and vitamin C.',
    price: 200, // Price in INR
    tags: [{ label: 'Organic', color: '#ff6f61' }],
  },
  {
    id: 7,
    name: 'Watermelon',
    image: 'https://img.freepik.com/free-photo/cut-watermelon-knife-blue-table_53876-96799.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Watermelons are hydrating and rich in vitamins A and C.',
    price: 70, // Price in INR
    tags: [{ label: 'Fresh', color: '#ff4f5c' }],
  },
  {
    id: 8,
    name: 'Grapes',
    image: 'https://img.freepik.com/free-photo/grape-clusters-mini-bucket-wooden-surface-side-view_176474-6046.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Grapes are a great source of vitamins K and C.',
    price: 120, // Price in INR
    tags: [{ label: 'Organic', color: '#6b3fa0' }],
  },
  {
    id: 9,
    name: 'Peach',
    image: 'https://img.freepik.com/premium-photo/close-up-various-fruits-against-black-background_1048944-10655728.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Peaches are high in vitamins A and C, as well as antioxidants.',
    price: 150, // Price in INR
    tags: [{ label: 'Fresh', color: '#ff9a8b' }],
  },
  {
    id: 10,
    name: 'Plum',
    image: 'https://img.freepik.com/free-photo/close-up-ripe-plum-fruit-bowl_23-2148238701.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Plums are rich in fiber, vitamins, and antioxidants.',
    price: 90, // Price in INR
    tags: [{ label: 'Organic', color: '#9b59b6' }],
  },
  {
    id: 11,
    name: 'Kiwi',
    image: 'https://img.freepik.com/free-photo/fresh-kiwi-cut-into-half-put-dark-floor_1150-28127.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Kiwis are packed with vitamin C and fiber.',
    price: 180, // Price in INR
    tags: [{ label: 'Fresh', color: '#85cc40' }],
  },
  {
    id: 12,
    name: 'Lemon',
    image: 'https://img.freepik.com/premium-photo/close-up-lemons-against-black-background_1048944-19756430.jpg?ga=GA1.1.1370161864.1741603523&semt=ais_hybrid',
    description: 'Lemons are high in vitamin C and aid in digestion.',
    price: 60, // Price in INR
    tags: [{ label: 'Organic', color: '#ffdf3b' }],
  },
];

const ProductCard = ({ product, onAddToCart }) => {
  const { name, image, description, price, tags } = product;

  return (
    <div className="card">
      <div className="card-inner" style={{ '--clr': '#fff' }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={name} />
          </div>
          <div className="icon">
            <button className="iconBox" onClick={() => onAddToCart(product)}>
              <box-icon name="cart-add" type="solid" color="#ffffff"></box-icon>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Price: ₹{price}</p>
        <ul>
          {tags.map((tag, index) => (
            <li key={index} style={{ '--clr-tag': tag.color }} className="packaging">
              {tag.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Fruits = () => {
  const [cart, setCart] = useState([]);
      const [isListening, setIsListening] = useState(false);

      const numberWords = {
        "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
        "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
        "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
        "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
        "nineteen": 19, "twenty": 20
    };
    
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
        if (!SpeechRecognition) {
            alert('Your browser does not support speech recognition. Please use Chrome.');
            return;
        }
    
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
    
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
    
        recognition.onresult = (event) => {
            let transcript = event.results[0][0].transcript.toLowerCase();
            console.log("Recognized:", transcript);
    
            // Extract numeric quantity (e.g., "2") or convert words (e.g., "two")
            let words = transcript.split(" ");
            let quantity = 1; // Default quantity
    
            for (let word of words) {
                if (!isNaN(word)) {
                    quantity = parseInt(word, 10); // If a digit is found (e.g., "2"), use it
                    break;
                } else if (numberWords[word]) {
                    quantity = numberWords[word]; // Convert spoken number to integer
                    break;
                }
            }
    
            // Remove number from transcript to isolate product name
            let productName = words.filter(word => isNaN(word) && !numberWords[word]).join(" ");
    
            // Match with existing products
            const matchedProduct = products.find(product => product.name.toLowerCase().includes(productName.trim()));
    
            if (matchedProduct) {
                handleAddToCart(matchedProduct, quantity);
            } else {
                alert(`No matching product found for "${transcript}". Please try again.`);
            }
        };
    
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            alert("Error recognizing speech. Please try again.");
        };
    
        recognition.start();
    };
    
    const handleAddToCart = (product, quantity) => {
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
        let updatedCart = [...cart];
    
        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart.push({ ...product, quantity });
        }
    
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${quantity} x ${product.name} has been added to your cart!`);
    };
    
  return (
    <div>
      <section id="Products">
        <h2>Fruits</h2>
        <button className="mic-button" onClick={startListening}>
                        <box-icon name="microphone" type="solid" color={isListening ? "red" : "black"} size="lg"></box-icon>
                    </button>
        <div className="container" id="Product">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Fruits;
