import React, { useEffect, useState } from 'react';
import { database, ref, onValue, set, remove } from '../firebase';
import '../styles/Plants.css'; // Import the CSS file
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';

function Plants() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({
    name: '',
    datePlanted: '',
    type: '',
    device: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const plantsRef = ref(database, 'plants');
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPlants(Object.entries(data));
      } else {
        setPlants([]);
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      setError(error.message);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlant({ ...newPlant, [name]: value });
  };

  const handleAddPlant = (e) => {
    e.preventDefault();
    const nextId = plants.length > 0 ? Math.max(...plants.map(([id]) => parseInt(id))) + 1 : 1;
    const newPlantRef = ref(database, `plants/${nextId}`);
    set(newPlantRef, newPlant)
      .then(() => {
        console.log('Plant added successfully');
        setNewPlant({
          name: '',
          datePlanted: '',
          type: '',
          device: '',
        });
      })
      .catch((error) => {
        console.error('Error adding plant:', error);
        setError(error.message);
      });
  };

  const handleDeletePlant = (plantId) => {
    remove(ref(database, `plants/${plantId}`))
      .then(() => {
        console.log('Plant deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting plant:', error);
        setError(error.message);
      });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="plant-page">
      <Header />
      <h1>Plant Profile</h1>
      <form onSubmit={handleAddPlant} className="add-plant-form">
        <input
          type="text"
          name="name"
          value={newPlant.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="date"
          name="datePlanted"
          value={newPlant.datePlanted}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="type"
          value={newPlant.type}
          onChange={handleInputChange}
          placeholder="Type"
          required
        />
        <input
          type="text"
          name="device"
          value={newPlant.device}
          onChange={handleInputChange}
          placeholder="Device"
          required
        />
        <button type="submit">Add Plant</button>
      </form>

      <ul className="plant-list">
        {plants.map(([id, plant]) => (
          <li key={id} className="plant-item">
            <p><strong>Name:</strong> {plant.name}</p>
            <p><strong>Date Planted:</strong> {plant.datePlanted}</p>
            <p><strong>Plant Type:</strong> {plant.type}</p>
            <p><strong>Device:</strong> {plant.device}</p>
            <button onClick={() => handleDeletePlant(id)}>Delete Plant</button>
          </li>
        ))}
      </ul>
      <Navbar />
    </div>
  );
}

export default Plants;
