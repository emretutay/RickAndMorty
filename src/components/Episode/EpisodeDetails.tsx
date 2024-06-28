import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CharacterListNavigationProp } from '../store';
import Pagination from '../Pagination/Pagination';
import CharacterSearchBar from '../CharacterSearchBar';
interface Character {
  id: number;
  name: string;
  image: string;
}

interface EpisodeDetails {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}
const PAGE_SIZE = 10;
const EpisodeDetails: React.FC = () => {
  const [episodeDetails, setEpisodeDetails] = useState<EpisodeDetails | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const navigation = useNavigation<CharacterListNavigationProp>();
  const route = useRoute();
  const { episodeId } = route.params as { episodeId: number };
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [characterUrls, setCharacterUrls] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  
  useEffect(() => {
    fetchEpisodeDetails();
  }, []);
   
 
  useEffect(() => {
    updateDisplayedCharacters();
  }, [allCharacters, page, searchQuery]);

  const fetchEpisodeDetails = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
      const data = await response.json();
      
      setEpisodeDetails(data);
      
      setPage(1);
      setTotalPages(1);
      
      setCharacterUrls(data.characters);
      
      fetchCharacters(data.characters);
      
    } catch (error) {
      console.error('Error fetching episode details:', error);
    }
  };

  const fetchCharacters = async (characterUrls: string[]) => {
    try {
      
     
      const totalPages = Math.ceil(characterUrls.length / PAGE_SIZE);
      setTotalPages(totalPages);
      
    
      const allPromises = characterUrls.map(url => fetch(url).then(res => res.json()));
      const allCharacterData = await Promise.all(allPromises);
      
      setAllCharacters(allCharacterData);
      
      
      
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };
  const updateDisplayedCharacters = () => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    
    let filtered = allCharacters;
    if(searchQuery.trim() !== ''){
      
      filtered = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    const characterData = filtered.slice(start, end);
    setCharacters(characterData);
    setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
    
   
  };


  const handlePage = (page:number) => {
    
      fetchCharacters(characterUrls);
      setPage(page );
    
  };

  const renderCharacterItem = ({ item }: { item: Character }) => (
    <TouchableOpacity
      style={styles.characterItem}
      onPress={() => navigation.navigate('CharacterDetails', { characterId: item.id })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  const handleCharacterSearch = (query: string) => {
    setSearchQuery(query);
    
    setPage(1);
  };

  if (!episodeDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{episodeDetails.name}</Text>
      <Text>Air Date: {episodeDetails.air_date}</Text>
      <Text>Episode: {episodeDetails.episode}</Text>
      <Text style={styles.charactersTitle}>Characters:</Text>
      <FlatList
        data={characters}
        renderItem={renderCharacterItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <CharacterSearchBar onSearch={handleCharacterSearch} />
     
          <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePage}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  charactersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  characterItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

});

export default EpisodeDetails;