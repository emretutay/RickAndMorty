import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../../types/types';




interface FavoriteCharactersState {
  characters: Character[];
}

const initialState: FavoriteCharactersState = {
  characters: [],
};

const favoriteCharactersSlice = createSlice({
  name: 'favoriteCharacters',
  initialState,
  reducers: {
    addFavoriteCharacter: (state, action: PayloadAction<Character>) => {
      if (state.characters.length < 10) {
        state.characters.push(action.payload);
        AsyncStorage.setItem('favoriteCharacters', JSON.stringify(state.characters));
      }
    },
    removeFavoriteCharacter: (state, action: PayloadAction<number>) => {
      state.characters = state.characters.filter(char => char.id !== action.payload);
      AsyncStorage.setItem('favoriteCharacters', JSON.stringify(state.characters));
    },
    setFavoriteCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
  },
});

export const { addFavoriteCharacter, removeFavoriteCharacter, setFavoriteCharacters } = favoriteCharactersSlice.actions;
export default favoriteCharactersSlice.reducer;