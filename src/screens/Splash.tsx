import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const fadeAnim = useRef(new Animated.Value(0)).current; // 0 = invisible

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // fully visible
      duration: 1000, // 1 second fade
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleGoPress = () => {
    navigation.navigate('WordList');
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.title, {opacity: fadeAnim}]}>
        Welcome to Word Memory!
      </Animated.Text>
      <Animated.View style={{opacity: fadeAnim}}>
        <TouchableOpacity style={styles.goButton} onPress={handleGoPress}>
          <Text style={styles.goButtonText}>GO!</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  goButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  goButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
