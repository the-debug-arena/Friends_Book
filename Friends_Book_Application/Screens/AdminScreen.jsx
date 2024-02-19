import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Button} from 'react-native-paper';
function AdminScreen({navigation}) {
  const [userData, setUserData] = useState('');
  async function getData() {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    axios
      .post('http://192.168.1.30:5001/userdata', {token: token})
      .then(res => {
        console.log(res.data);
        setUserData(res.data.data);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  function signOut() {
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');
    AsyncStorage.setItem('userType', '');
    navigation.navigate('Login');
  }
  return (
    <View
      style={{
        display: 'flex',
      }}>
      <Text style={{fontSize: 25, color: 'black'}}>Admin Screen</Text>
      <View>
        <Text style={{fontSize: 25, color: 'black'}}>
          Name: {userData.name}
        </Text>
        <Text style={{fontSize: 25, color: 'black'}}>
          Email: {userData.email}
        </Text>
        <Text style={{fontSize: 25, color: 'black'}}>
          UserType: {userData.userType}
        </Text>
      </View>
      <Button onPress={() => signOut()}>Log Out</Button>
    </View>
  );
}
export default AdminScreen;
