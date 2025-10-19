import React, { useState, useEffect } from "react";
import { ShoppingCart, Car, Stethoscope, Users, LayoutDashboard, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sendSOS = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const message = `HELP!!. My location: https://maps.google.com/?q=${latitude},${longitude}`;
      window.location.href = `https://wa.me/+919345306937?text=${encodeURIComponent(message)}`;
    },
    (error) => {
      alert("Unable to fetch location. Please check your GPS settings.");
    }
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");
  const [userEmail, setUserEmail] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;  // Keep listening continuously
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
      const service = serviceCards.find((s) => s.title.toLowerCase().includes(command));
      if (service) navigate(service.link);
    };

    recognition.onerror = (error) => {
      console.error("Speech recognition error:", error);
    };

    recognition.onend = () => {
      // Restart recognition when it stops
      recognition.start();
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail("");
    navigate("/login");
  };

  const images = [
    "https://images.pexels.com/photos/5591274/pexels-photo-5591274.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-5591274.jpg&fm=jpg",
    "https://images.pexels.com/photos/6667801/pexels-photo-6667801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/8899552/pexels-photo-8899552.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <LayoutDashboard size={30} style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")} />
          <h2 style={{ marginLeft: "10px" }}>SeniorEase</h2>
        </div>
        <div className="sos-container">
          <button onClick={sendSOS} className="sos-button">🚨 SOS</button>
        </div>
        <div>
          <button style={styles.button} onClick={() => setFontSize(fontSize + 2)}>A+</button>
          <button style={styles.button} onClick={() => setFontSize(fontSize - 2)}>A-</button>
          {userEmail ? (
            <>
              <span style={styles.userText}>Welcome, {userEmail}</span>
              <button style={styles.button} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button style={styles.button} onClick={() => navigate("/login")}>Login</button>
              <button style={styles.button} onClick={() => navigate("/signup")}>Signup</button>
            </>
          )}
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.dropdown}>
            <option value="English">English</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Hindi">हिंदी (Hindi)</option>
          </select>
        </div>
      </nav>

      <div style={styles.carouselContainer}>
        <img src={images[currentImage]} alt="Carousel" style={styles.carouselImage} />
      </div>

      <br />
      <center>
        <h1>Services for Senior Citizens</h1>
      </center>
      <br />

      <div style={styles.cardContainer}>
        {serviceCards.map((service, index) => (
          <div className="card" key={index} style={styles.card}>
            {service.icon}
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <button className="card-button" style={styles.cardButton} onClick={() => navigate(service.link)}>
              {service.buttonText}
            </button>
          </div>
        ))}
      </div>
      <br />

      <footer style={styles.footer}>
        <p>&copy; 2025 SeniorEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  navbar: { display: "flex", justifyContent: "space-between", padding: "10px", background: "#6a0dad", color: "white" },
  navLeft: { display: "flex", alignItems: "center" },
  button: { margin: "5px", padding: "5px 10px", cursor: "pointer" },
  dropdown: { margin: "5px", padding: "5px" },
  userText: { marginRight: "10px" },
  carouselContainer: { textAlign: "center", margin: "0px 0" },
  carouselImage: { width: "100%",height:"680px", borderRadius: "0px" },
  cardContainer: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" },
  card: { border: "1px solid #ddd", padding: "20px", textAlign: "center", borderRadius: "10px", width: "250px" },
  cardButton: { marginTop: "10px", padding: "5px 10px", cursor: "pointer" },
  footer: { textAlign: "center", padding: "10px", background: "#6a0dad", color: "white", marginTop: "20px" },
};

const serviceCards = [
  { icon: <ShoppingCart size={40} color="#6a0dad" />, title: "Grocery Assistance", description: "Order groceries online with ease.", buttonText: "Shop Now", link: "/grocery" },
  { icon: <Car size={40} color="#6a0dad" />, title: "Cab Booking", description: "Book safe and reliable rides anytime.", buttonText: "Book a Ride", link: "/cab" },
  { icon: <Stethoscope size={40} color="#6a0dad" />, title: "Doctor Consultation", description: "Online consultations with doctors.", buttonText: "Consult Now", link: "/cohome" },
  { icon: <Users size={40} color="#6a0dad" />, title: "Loneliness Support", description: "Connect with NGOs for companionship.", buttonText: "Connect Now", link: "/ngo" },
];

export default Home;
