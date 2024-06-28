import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../../types/types';




interface FavoriteCharactersState {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FavoriteCharactersState = {
  characters: [],
  isLoading: false,
  error: null,
};

export const loadFavoriteCharacters = createAsyncThunk(
  'favoriteCharacters/loadFavoriteCharacters',
  async (_, { rejectWithValue }) => {
    try {
      const storedCharacters = await AsyncStorage.getItem('favoriteCharacters');
      console.log(storedCharacters);
      if (storedCharacters) {
        return JSON.parse(storedCharacters) as Character[];
      }
      return [] as Character[];
    } catch (error) {
      return rejectWithValue('Failed to load favorite ch' );
  }}
);
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
  extraReducers: (builder) => {
    builder
      .addCase(loadFavoriteCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadFavoriteCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload;
      })
      .addCase(loadFavoriteCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addFavoriteCharacter, removeFavoriteCharacter, setFavoriteCharacters } = favoriteCharactersSlice.actions;
export default favoriteCharactersSlice.reducer;