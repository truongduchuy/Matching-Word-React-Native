import {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles/MatchWord';

type WordItemProps = {
  word: string;
  index: number;
  isSelected: boolean;
  isFrench?: boolean;
  onPress: (index: number, word: string) => void;
};

const WordItem = forwardRef<View, WordItemProps>(
  ({word, index, isSelected, isFrench = false, onPress}, ref) => {
    const getBackgroundColor = () => {
      if (isSelected) return '#86aad8';
      if (index % 2 !== 0) return 'white';
      return isFrench ? '#e8f5e9' : '#e6f0fa';
    };

    return (
      <TouchableOpacity
        onPress={() => onPress(index, word)}
        ref={ref}
        style={{
          ...(isFrench ? styles.wordBoxFrench : styles.wordBoxEnglish),
          backgroundColor: getBackgroundColor(),
        }}>
        <Text style={styles.wordText}>{word}</Text>
      </TouchableOpacity>
    );
  },
);

export default WordItem;
