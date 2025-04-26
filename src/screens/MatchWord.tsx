import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  // GestureResponderEvent,
  // findNodeHandle,
  // UIManager,
} from 'react-native';
import ArrowLine from '../components/Arrow';

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

type Point = {
  x: number;
  y: number;
};

type Line = {
  from: Point;
  to: Point;
  fromWord: string;
  toWord: string;
};
const WordListScreen: React.FC = () => {
  const [selectedEnglishWord, setSelectedEnglishWord] = useState({
    word: '',
    point: {} as Point,
  });
  const englishWordRefs = useRef<(View | null)[]>([]);
  const frenchWordRefs = useRef<(View | null)[]>([]);
  const [lines, setLines] = useState([] as Line[]);
  const handleEnglishWordPress = (index: number, word: string) => {
    console.log({index, word});
    const ref = englishWordRefs.current[index];
    if (ref) {
      ref.measureInWindow((x, y, width, height) => {
        const rightX = x + width;
        const centerY = y - height / 2;

        setSelectedEnglishWord({word, point: {x: rightX, y: centerY}});
      });
    }
  };

  const handleFrenchWordPress = (index: number, word: string) => {
    if (!selectedEnglishWord.word) {
      return;
    }

    const selectAnExistedAnswer = lines.some(
      line =>
        line.fromWord === selectedEnglishWord.word || line.toWord === word,
    );

    if (selectAnExistedAnswer) {
      return;
    }

    const existedPair = lines.some(
      line =>
        line.fromWord === selectedEnglishWord.word && line.toWord === word,
    );
    if (existedPair) {
      // remove the existed line
      setLines(prevLines =>
        prevLines.filter(
          line =>
            line.fromWord !== selectedEnglishWord.word && line.toWord !== word,
        ),
      );
    } else {
      const ref = frenchWordRefs.current[index];
      if (ref) {
        ref.measureInWindow((x, y, width, height) => {
          const rightX = x;
          const centerY = y - height / 2;

          const frenchPoint = {x: rightX, y: centerY};
          const newLine = {
            from: selectedEnglishWord.point,
            to: frenchPoint,
            fromWord: selectedEnglishWord.word,
            toWord: word,
          };
          setLines(prevLines => [...prevLines, newLine]);
        });
      }
    }
    setSelectedEnglishWord({word: '', point: {} as Point});
  };

  const getBackgroundColor = (word: string, index: number) => {
    if (selectedEnglishWord.word === word) return '#86aad8'; // selected
    if (index % 2 !== 0) return 'white'; // odd row
    return '#e6f0fa'; // even row
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {lines.map((line, index) => (
          <ArrowLine
            key={index}
            from={{x: line.from.x, y: line.from.y}}
            to={{x: line.to.x, y: line.to.y}}
            color="red"
            strokeWidth={2}
          />
        ))}
        <View style={styles.columnContainer}>
          <View style={styles.titleBoxEnglish}>
            <Text style={styles.titleText}>English Word</Text>
          </View>
          {englishWords.map((word, index) => (
            <TouchableOpacity
              onPress={() => handleEnglishWordPress(index, word)}
              ref={ref => {
                englishWordRefs.current[index] = ref;
              }}
              style={{
                ...styles.wordBoxEnglish,
                backgroundColor: getBackgroundColor(word, index),
              }}
              key={word}>
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{width: 60}} />
        <View style={[styles.columnContainer, styles.frenchBox]}>
          <View style={styles.titleBoxFrench}>
            <Text style={styles.titleText}>French Word</Text>
          </View>
          {frenchWords.map((word, index) => (
            <TouchableOpacity
              onPress={() => handleFrenchWordPress(index, word)}
              ref={ref => {
                frenchWordRefs.current[index] = ref;
              }}
              key={word}
              style={{
                ...styles.wordBoxFrench,
                backgroundColor: index % 2 !== 0 ? 'white' : '#e8f5e9',
              }}>
              <Text style={styles.wordText}>{word}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
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
    marginTop: 60,
  },
});

export default WordListScreen;
