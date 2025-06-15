import { Text, View } from "react-native";
import { Link } from "expo-router";
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useCity } from './CityContext';

export default function StartPage() {
    const { city, setCity, cityList } = useCity();
    return (
    <View style={styles.container}>
        <Text>Choose your city!</Text>
        <Picker
          selectedValue={city}
          style={styles.input}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          {cityList.map((cityName) => (
            <Picker.Item label={cityName} value={cityName} key={cityName} />
          ))}
        </Picker>
        <Link href="/">Proceed</Link>
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
});