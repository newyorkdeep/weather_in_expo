import { Stack } from 'expo-router';
import { CityProvider } from './CityContext';

export default function RootLayout() {
  return (
    <CityProvider>
      <Stack />
    </CityProvider>
  );
}
