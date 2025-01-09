import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { database, ref, onValue } from '../firebase'; 
import '../styles/Home.css';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';


function Home() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const plantsRef = ref(database, 'plants'); 
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object of objects to array of objects with ID
        const plantList = Object.entries(data).map(([id, plant]) => ({
          id, 
          ...plant
        }));
        setPlants(plantList);
      } else {
        setPlants([]);
      }
    });
  }, []);

  return (
    <div className="home">
      <Header />
        <div className="text-box">
          <p>Seeding Innovation, Harvesting Efficiency</p>
        </div>

      {/* Dynamically generated plant-specific links */}
      <ul className="plant-list">
        {plants.map((plant) => (
          <li key={plant.id}>
            <Link to={`/dashboard/${plant.id}`} className="plant-link">
              {plant.name || `Plant ${plant.id}`} {/* Use plant name or fallback */}
            </Link>
          </li>
        ))}
      </ul>
      <Navbar />
    </div>

    
  );
}

export default Home;
