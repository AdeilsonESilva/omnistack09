import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

export default () => {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const loadSpots = async () => {
      const userId = localStorage.getItem('user');
      const response = await api.get('dashboard', {
        headers: { user_id: userId }
      });

      setSpots(response.data);
      console.log('spots :', response.data);
    };

    loadSpots();
  }, []);

  return (
    <>
      <ul className='spot-list'>
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${encodeURI(spot.thumbnail_url)})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>
      <Link to='/new'>
        <button className='btn'>Cadastrar novo spot</button>
      </Link>
    </>
  );
};
