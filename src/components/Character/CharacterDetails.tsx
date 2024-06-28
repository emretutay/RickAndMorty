import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteCharacter, removeFavoriteCharacter } from '../slices/favoriteCharactersSlice';
import { RootState } from '../store'
import {  showMaxFavoritesNotification } from '../services/notification';
import { Character } from '../../types/types';

const CharacterDetails: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const route = useRoute();
  const { characterId } = route.params as { characterId: number };
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state: RootState) => state.favoriteCharacters.characters);

  useEffect(() => {
    fetchCharacterDetails();
  }, []);

  const fetchCharacterDetails = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.error('Error fetching character details:', error);
      Alert.alert('Error', 'Failed to fetch character details. Please try again.');
    }
  };
  
  const isFavorite = favoriteCharacters.some(char => char.id === character?.id);

  const toggleFavorite = () => {
    if (character) {
      if (isFavorite) {
        dispatch(removeFavoriteCharacter(character.id));
        Alert.alert('Success', `${character.name} removed from favorites.`);
      } else {
       
        if (favoriteCharacters.length < 10) {
          dispatch(addFavoriteCharacter(character));
          Alert.alert('Success', `${character.name} added to favorites.`);
        } else {
          showMaxFavoritesNotification();
          Alert.alert(
            'Limit Reached',
            'You have exceeded favorite limit. You have to remove another character from your favorites.',
            [{ text: 'OK' }]
          );
        }
      }
    }
  };

  if (!character) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading character details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.infoItem}>Status: <Text style={styles.infoValue}>{character.status}</Text></Text>
        <Text style={styles.infoItem}>Species: <Text style={styles.infoValue}>{character.species}</Text></Text>
        <Text style={styles.infoItem}>Type: <Text style={styles.infoValue}>{character.type || 'N/A'}</Text></Text>
        <Text style={styles.infoItem}>Gender: <Text style={styles.infoValue}>{character.gender}</Text></Text>
        <Text style={styles.infoItem}>Origin: <Text style={styles.infoValue}>{character.origin.name}</Text></Text>
        <Text style={styles.infoItem}>Location: <Text style={styles.infoValue}>{character.location.name}</Text></Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  infoValue: {
    color: '#333',
    fontWeight: '500',
  },
  favoriteButton: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CharacterDetails;