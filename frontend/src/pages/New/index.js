import React, { useState, useMemo } from 'react';

import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default ({ history }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    const userID = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id: userID }
    });

    history.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        id='thumbnail'
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail && 'has-thumbnail'}
      >
        <input type='file' onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt='Select Img' />
      </label>
      <label htmlFor='company'>Empresa</label>
      <input
        id='company'
        placeholder='Sua empresa incrível'
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor='techs'>TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input
        id='techs'
        placeholder='Quais tecnologias usam?'
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor='price'>VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
      <input
        id='price'
        placeholder='Quais tecnologias usam?'
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button type='submit' className='btn'>Cadastrar</button>

    </form>
  );
};
