import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/components/store';
import EpisodeList from './src/components/Episode/EpisodeList';
import EpisodeDetails from './src/components/Episode/EpisodeDetails';
import CharacterDetails from './src/components/Character/CharacterDetails';
import favoriteCharactersSlice from './src/components/slices/favoriteCharactersSlice';
import { configureNotifications, requestNotificationPermission } from './src/components/services/notification';
import FavoriteCharactersScreen from './src/components/FavoriteCharacterScreen';

const Stack = createStackNavigator();

const App: React.FC = () => {
  useEffect(() => {
    configureNotifications();
    requestNotificationPermission();
  }, []);
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EpisodeList">
          <Stack.Screen name="EpisodeList" component={EpisodeList} options={{ title: 'Episodes' }} />
          <Stack.Screen name="EpisodeDetails" component={EpisodeDetails} options={{ title: 'Episode Details' }} />
          <Stack.Screen name="CharacterDetails" component={CharacterDetails} options={{ title: 'Character Details' }} />
          <Stack.Screen name="FavoriteCharacters" component={FavoriteCharactersScreen} options={{ title: 'Favorite Characters' }} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;