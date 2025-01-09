import React, { useEffect, useState } from 'react';
import { database, ref, onValue, set, update } from '../firebase';
import '../styles/AddPlant.css';
import Header from '../components/Header.js';
import Navbar from '../components/Navbar.js';

function Plants() {
  const [plants, setPlants] = useState([]); // Original plants data
  const [availableDevices, setAvailableDevices] = useState([]); // List of available devices
  const [newPlant, setNewPlant] = useState({
    name: '',
    datePlanted: '',
    type: '',
    device: '',
    healthStatus: '',
    diseaseDetected: '',
    stage: '',
    daysSince: '',
    rgbColour: '',
    image: ''
  });
  const [error, setError] = useState(null); // Error state

  // Fetch plants and devices from Firebase
  useEffect(() => {
    const plantsRef = ref(database, 'plants');
    const devicesRef = ref(database, 'device');

    const unsubscribePlants = onValue(
      plantsRef,
      (snapshot) => {
        const data = snapshot.val();
        setPlants(data || []); // Store fetched plants
      },
      (error) => setError(error.message)
    );

    const unsubscribeDevices = onValue(
      devicesRef,
      (snapshot) => {
        const devicesData = snapshot.val();
        const available = Object.keys(devicesData || {}).filter(
          (device) => devicesData[device]?.status === 'Available'
        );
        setAvailableDevices(available); // Store available devices
      },
      (error) => setError(error.message)
    );

    return () => {
      unsubscribePlants();
      unsubscribeDevices();
    };
  }, []);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlant({ ...newPlant, [name]: value });
  };

  // Add a new plant
  const handleAddPlant = (e) => {
    e.preventDefault();
    const existingIds = Object.keys(plants || {}).map(Number);
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    const nextId = maxId + 1;

    const newPlantRef = ref(database, `plants/${nextId}`);
    const deviceRef = ref(database, `device/${newPlant.device}`);

    set(newPlantRef, newPlant)
      .then(() => {
        console.log('Plant added successfully');
        return update(deviceRef, { status: 'Not available' });
      })
      .then(() => {
        console.log('Device status updated to "Not available"');
        setNewPlant({
          name: '',
          datePlanted: '',
          type: '',
          device: '',
          healthStatus: '',
          diseaseDetected: '',
          stage: '',
          daysSince: '',
          rgbColour: '',
          image: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error.message);
      });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="addplant-page">
        <Header />
      <h1 className="addplant-header">Add New Plant</h1>
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
        <select
          name="device"
          value={newPlant.device}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>Select Device</option>
          {availableDevices.map((device) => (
            <option key={device} value={device}>
              {device}
            </option>
          ))}
        </select>
        <button type="submit">Add Plant</button>
      </form>
    <Navbar />
    </div>
  );
}

export default Plants;
