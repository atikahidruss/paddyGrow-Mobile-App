import React, { useEffect, useState } from 'react';
import { database, ref, onValue, update, remove } from '../firebase';
import '../styles/Plants.css';
import Navbar from '../components/Navbar.js';
import { useNavigate } from 'react-router-dom';

function Plants() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]); // Original plants data
  const [error, setError] = useState(null); // Error state
  const [sortOption, setSortOption] = useState('none'); // State for sorting option

  // Fetch plants and devices from Firebase
  useEffect(() => {
    const plantsRef = ref(database, 'plants');
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const plantList = Object.entries(data).map(([key, value]) => ({
          id: key, // Include the Firebase key as the plant's ID
          ...value,
        }));
        setPlants(plantList);
      }
    });
  }, []);
  

  const handleAddPlantNavigation = () => {
    navigate('/add-plant'); // Redirect to the Add Plant page
  };

  // Delete a plant and update the device status
  const handleDeletePlant = (plantId, device) => {
    if (!plantId || !device) {
      console.error('Invalid plant or device data');
      return;
    }
  
    const plantRef = ref(database, `plants/${plantId}`);
    const deviceRef = ref(database, `device/${device}`);
  
    update(deviceRef, { status: 'Available' })
      .then(() => {
        console.log(`Device ${device} status updated to "Available"`);
        return remove(plantRef); // Remove the plant from Firebase
      })
      .then(() => {
        console.log(`Plant with ID ${plantId} deleted successfully`);
      })
      .catch((error) => {
        console.error('Error deleting plant or updating device status:', error);
        setError(error.message);
      });
  };  

  // Sorting logic
  const sortPlants = (plants, option) => {
    if (option === 'infected-to-healthy') {
      // Sort with "Infected" first
      return [...plants].sort((a, b) => {
        const healthOrder = { Infected: 1, Good: 2 }; // Explicit order
        return healthOrder[a.healthStatus] - healthOrder[b.healthStatus];
      });
    } else if (option === 'healthy-to-infected') {
      // Sort with "Healthy" first
      return [...plants].sort((a, b) => {
        const healthOrder = { Good: 1, Infected: 2 }; // Explicit order
        return healthOrder[a.healthStatus] - healthOrder[b.healthStatus];
      });
    }
    return plants; // Default: no sorting
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update the selected sorting option
  };

  // Get sorted plants based on the selected sorting option
  const sortedPlants = sortPlants(Object.values(plants || {}).filter(Boolean), sortOption);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="plant-page">
      <h1 className="plants-header">Plant Profile</h1>
      <button 
        className="add-plant-button" 
        onClick={handleAddPlantNavigation}
      >Add New Plant
      </button>
      <div className="sorting-section">
        <label htmlFor="sort"class="sort-label">Sort by: </label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="infected-to-healthy">Infected to Healthy</option>
          <option value="healthy-to-infected">Healthy to Infected</option>
        </select>
      </div>

      <ul className="plant-list">
        {sortedPlants.map((plant, index) => (
            <li
                key={index}
                className="plant-item"
                style={{
                  backgroundImage: plant.image ? `url(${plant.image})` : 'none', // Use image if available
                  backgroundColor: plant.image ? 'transparent' : '#c4cc9e', // Set default color if no image
                }}
            >
                <p><strong>Name:</strong> {plant.name || 'N/A'}</p>
                <p><strong>Date Planted:</strong> {plant.datePlanted || 'N/A'}</p>
                <p><strong>Health Status:</strong> {plant.healthStatus || 'N/A'}</p>
                <p><strong>Device:</strong> {plant.device || 'N/A'}</p>
                <button onClick={() => handleDeletePlant(plant.id, plant.device)}>Delete Plant</button>
            </li>
        ))}
    </ul>
    <Navbar />
    </div>
  );
}

export default Plants;
