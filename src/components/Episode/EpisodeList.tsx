import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar';
import { EpisodeNavigationProp } from '../store';
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const EpisodeList: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<EpisodeNavigationProp>();
 

  useEffect(() => {
    fetchEpisodes();
  }, [currentPage, searchQuery]);

  const fetchEpisodes = async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}&name=${searchQuery}`);
      const data = await response.json();
      if (data.error == "There is nothing here") {
        setEpisodes([]);
        setTotalPages(1);
        console.error("No episodes found");
        return;

      }
      
      setEpisodes(data.results);
      setTotalPages(data.info.pages);

    } catch (error) {
        console.error("Error");
    }
  };

  const renderEpisodeItem = ({ item }: { item: Episode }) => (
    <TouchableOpacity
      style={styles.episodeItem}
      onPress={() => navigation.navigate('EpisodeDetails', { episodeId: item.id })}
    >
      <Text style={styles.episodeName}>{item.name}</Text>
      <Text>{item.episode}</Text>
      <Text>{item.air_date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search episode..."
      />
      <FlatList
        data={episodes}
        renderItem={renderEpisodeItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => navigation.navigate('FavoriteCharacters')}
      >
        <Text style={styles.buttonText}>Favorite Characters</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  episodeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  episodeName: {
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EpisodeList;

