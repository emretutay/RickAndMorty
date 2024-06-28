import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteCharacter } from './slices/favoriteCharactersSlice';
import { RootState } from './store';
import { Character } from '../types/types';

const FavoriteCharactersScreen = () => {
  const favorites = useSelector((state:RootState) => state.favoriteCharacters.characters);
  const dispatch = useDispatch();

  const confirmDelete = (character:Character) => {
    Alert.alert(
      "Remove from favorites",
      `$ Do you want to remove the character named ${character.name} from your favorites?`,
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          onPress: () => dispatch(removeFavoriteCharacter(character.id))
        }
      ]
    );
  };

  const renderCharacterItem = ({ item }: { item: Character }) => (
    <View style={styles.characterItem}>
      <Text style={styles.characterName}>{item.name}</Text>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => confirmDelete(item)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Characters</Text>
      <Text style={styles.count}>Total Favorites: {favorites.length} / 10</Text>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderCharacterItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyMessage}>No favorite character added.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  count: {
    fontSize: 18,
    marginBottom: 16,
  },
  characterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  characterName: {
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default FavoriteCharactersScreen;