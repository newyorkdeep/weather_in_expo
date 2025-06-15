import axios from 'axios';
import { Text, View, Button } from "react-native";
import React, { useEffect, useState } from 'react';
import { Link } from "expo-router";
import { StyleSheet } from 'react-native';
import { useCity } from './CityContext';

export default function WeatherComponent() {
  const [currentJoke, setCurrentJoke] = useState('Refreshing....');
  const { city } = useCity();
  const [weather, setWeather] = useState('');
  const [loadingWeather, setLoadingWeather] = useState(false);

  useEffect(()=> {
    fetchJoke();
  }, []);

  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setCurrentJoke(`${response.data.setup} - ${response.data.punchline}`);
    } catch (e) {
      console.error('Error fetching: ', e);
      setCurrentJoke('Something went wrong, try later!')
    }
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoadingWeather(true);
    setWeather('');
    try {
      const apiKey = 'beb499e483cd5c67240ce89c41d76e02';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
      const data = response.data;
      setWeather(`Weather in ${data.sys.country} ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`);
    } catch (e) {
      setWeather('Could not fetch weather. Check city name or try again.');
    }
    setLoadingWeather(false);
  };

  return (
    <View style={styles.container}>
      <p></p>
      <View style={styles.borderwhite}>
        <Text>The joke of the day:</Text>
        <Text>{currentJoke}</Text>
        <Link href="/startpage">Go to Start Page</Link>
      </View>
      <View style={{ marginTop: 40, width: '100%', alignItems: 'center' }}>
        <Text>Selected city: {city}</Text>
        <Button title={loadingWeather ? 'Loading...' : 'Get Weather'} onPress={fetchWeather} disabled={loadingWeather} />
        {weather ? <Text style={{ marginTop: 10 }}>{weather}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '80%',
  },
  borderwhite: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  }
});
