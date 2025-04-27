import React, {useMemo, useRef, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import ArrowLine from '../components/Arrow';
import {shuffleArray, WORD_LIST, WORD_LIST_MAP} from '../constants';
import {Line, Point} from '../types';
import {styles} from '../styles/MatchWord';
import WordItem from '../components/WordItem';
import {randomBoldColor} from '../utils';

const initSelectedEnglishWord = {
  word: '',
  point: {} as Point,
};

const WordListScreen: React.FC = () => {
  const [selectedEnglishWord, setSelectedEnglishWord] = useState(
    initSelectedEnglishWord,
  );
  const englishWordRefs = useRef<Array<View | null>>([]);
  const frenchWordRefs = useRef<Array<View | null>>([]);
  const [lines, setLines] = useState([] as Line[]);
  const [showReset, setShowReset] = useState(false);
  const [randomizedWords, setRandomizedWords] = useState({
    english: shuffleArray(WORD_LIST.map(w => w.english)),
    french: shuffleArray(WORD_LIST.map(w => w.french)),
  });
  const handleEnglishWordPress = (index: number, word: string) => {
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

      return setSelectedEnglishWord(initSelectedEnglishWord);
    }

    const selectAnExistedAnswer = lines.some(line => line.toWord === word);

    if (selectAnExistedAnswer) {
      return;
    }

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
          color: randomBoldColor(),
        };
        setLines(prevLines => [...prevLines, newLine]);
      });
    }
    setSelectedEnglishWord(initSelectedEnglishWord);
  };

  const handleGrade = () => {
    setShowReset(true);
  };

  const gradePercentage = useMemo(() => {
    const countCorrectPair = lines.filter(line => {
      return WORD_LIST_MAP[line.fromWord] === line.toWord;
    }).length;

    return Math.round((countCorrectPair / WORD_LIST.length) * 100);
  }, [lines]);

  const handleReset = () => {
    setLines([]);
    setSelectedEnglishWord(initSelectedEnglishWord);
    setShowReset(false);
    setRandomizedWords({
      english: shuffleArray(WORD_LIST.map(w => w.english)),
      french: shuffleArray(WORD_LIST.map(w => w.french)),
    });
  };

  const setEnglishWordRef = (index: number) => (ref: View | null) => {
    englishWordRefs.current[index] = ref;
  };

  const setFrenchWordRef = (index: number) => (ref: View | null) => {
    frenchWordRefs.current[index] = ref;
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {lines.map((line, index) => (
          <ArrowLine
            key={index}
            from={{x: line.from.x, y: line.from.y}}
            to={{x: line.to.x, y: line.to.y}}
            color={line.color}
            strokeWidth={2}
          />
        ))}
        <View style={styles.columnContainer}>
          <View style={styles.titleBoxEnglish}>
            <Text style={styles.titleText}>English Word</Text>
          </View>
          {randomizedWords.english.map((word, index) => (
            <WordItem
              key={word}
              word={word}
              index={index}
              isSelected={selectedEnglishWord.word === word}
              onPress={handleEnglishWordPress}
              ref={setEnglishWordRef(index)}
            />
          ))}
        </View>
        <View style={{width: 60}} />
        <TouchableOpacity
          style={styles.button}
          onPress={showReset ? handleReset : handleGrade}>
          <Text style={styles.buttonText}>{showReset ? 'GO!' : 'GRADE'}</Text>
        </TouchableOpacity>
        {showReset && (
          <Text
            style={
              styles.gradeText
            }>{`Correct Answers: ${gradePercentage}%`}</Text>
        )}
        <View style={[styles.columnContainer, styles.frenchBox]}>
          <View style={styles.titleBoxFrench}>
            <Text style={styles.titleText}>French Word</Text>
          </View>
          {randomizedWords.french.map((word, index) => (
            <WordItem
              key={word}
              word={word}
              index={index}
              isSelected={false}
              isFrench
              onPress={handleFrenchWordPress}
              ref={setFrenchWordRef(index)}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default WordListScreen;
