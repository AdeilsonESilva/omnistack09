import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
  AsyncStorage,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default () => {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(userId => {
      console.log('userId :', userId);
      const socket = socketio('http://192.168.1.109:3333', {
        query: { user_id: userId }
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());
      setTechs(techsArray);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
});
