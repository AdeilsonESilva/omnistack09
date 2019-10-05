import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  AsyncStorage,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import api from '../services/api';

export default ({ navigation }) => {
  const [date, setDate] = useState('');

  const id = navigation.getParam('id');

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem('user');
    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      user_id: userId
    });

    Alert.alert('Solicitação de reserva enviada.');
    navigation.navigate('List');
  };

  const handleCancel = async () => {
    navigation.navigate('List');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput
        style={styles.input}
        placeholder='Qual data você quer reservar?'
        placeholderTextColor='#999'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10
  }
});
