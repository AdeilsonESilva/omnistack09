import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import './styles.css';
import api from '../../services/api';

export default () => {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const userId = localStorage.getItem('user');
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id: userId }
  }), [userId]);

  useEffect(() => {
    socket.on('booking_request', data => {
      console.log('data', data);
      setRequests([...requests, data]);
    });
  }, [requests, socket]);

  useEffect(() => {
    const loadSpots = async () => {
      const userId = localStorage.getItem('user');
      const response = await api.get('dashboard', {
        headers: { user_id: userId }
      });

      setSpots(response.data);
    };

    loadSpots();
  }, []);

  const handleAccept = async id => {
    await api.post(`/bookings/${id}/approvals`);
    setRequests(requests.filter(request => request._id !== id));
  };

  const handleReject = async id => {
    await api.post(`/bookings/${id}/rejections`);
    setRequests(requests.filter(request => request._id !== id));
  };

  return (
    <>
      <ul className='notifications'>
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
            </p>
            <button className='accept' onClick={() => handleAccept(request._id)}>ACEITAR</button>
            <button className='reject' onClick={() => handleReject(request._id)}>REJEITAR</button>
          </li>
        ))}
      </ul>
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
