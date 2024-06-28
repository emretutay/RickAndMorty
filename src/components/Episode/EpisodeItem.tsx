import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Episode } from '../../types/types';

interface EpisodeItemProps {
  episode: Episode;
  onPress: () => void;
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{episode.name}</Text>
      <Text style={styles.info}>{`Episode: ${episode.episode}`}</Text>
      <Text style={styles.info}>{`Air Date: ${episode.air_date}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
});

export default EpisodeItem;