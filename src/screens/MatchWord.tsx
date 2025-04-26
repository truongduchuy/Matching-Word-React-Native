import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import ArrowLine from '../components/arrowLine';

const englishWords: string[] = [
  'bicycle',
  'railroad',
  'folder',
  'butter',
  'cereal',
  'hungry',
  'forest',
  'camel',
  'weekly',
  'desk',
  'sibling',
  'limestone',
];

const frenchWords: string[] = [
  'chameau',
  'chemin de fer',
  'frère et soeur',
  'hebdomadaire',
  'vélo',
  'beurre',
  'dossier',
  'forêt',
  'calcaire',
  'bureau',
  'céréale',
  'faim',
];

const WordListScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.columnContainer}>
        <View style={styles.titleBoxEnglish}>
          <Text style={styles.titleText}>English Word</Text>
        </View>
        {englishWords.map((word, index) => (
          <View
            key={word}
            style={{
              ...styles.wordBoxEnglish,
              backgroundColor: index % 2 !== 0 ? 'white' : '#e6f0fa',
            }}>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        ))}
        <ArrowLine from={{ x: 10, y: 10 }} to={{ x: 150, y: 150 }} color="red" strokeWidth={2} />
      </View>
      <View style={{width: 60}} /> {/* Spacer to increase distance */}
      <View style={[styles.columnContainer, styles.frenchBox]}>
        <View style={styles.titleBoxFrench}>
          <Text style={styles.titleText}>French Word</Text>
        </View>
        {frenchWords.map((word, index) => (
          <View
            key={word}
            style={{
              ...styles.wordBoxFrench,
              backgroundColor: index % 2 !== 0 ? 'white' : '#e8f5e9',
            }}>
            <Text style={styles.wordText}>{word}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginTop: 40,
  },
  columnContainer: {
    width: 128,
    alignItems: 'center',
  },
  titleBoxEnglish: {
    backgroundColor: '#337ab7',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleBoxFrench: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wordBoxEnglish: {
    borderColor: '#337ab7',
    borderWidth: 1,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 1,
  },
  wordBoxFrench: {
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 1,
  },
  wordText: {
    fontSize: 14,
  },
  frenchBox: {
    marginTop: 60
  }
});

export default WordListScreen;
