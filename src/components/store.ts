import { configureStore } from '@reduxjs/toolkit';
import favoriteCharactersReducer from './slices/favoriteCharactersSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import {  RouteProp } from '@react-navigation/native';
export const store = configureStore({
  reducer: {
    favoriteCharacters: favoriteCharactersReducer,
  },
});
type RootStackParamList = {
    CharacterList: undefined;
    CharacterDetails: { characterId: number };
  };
type EpisodeStackParamList = {
    
    EpisodeDetails: { episodeId: number };
    FavoriteCharacters:undefined;
 };
export type CharacterListNavigationProp = StackNavigationProp<RootStackParamList, 'CharacterList'>;
export type CharacterDetailsRouteProp = RouteProp<RootStackParamList, 'CharacterDetails'>;
export type EpisodeNavigationProp = StackNavigationProp<EpisodeStackParamList, 'EpisodeDetails'>;



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;