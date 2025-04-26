/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import WordListScreen from './src/screens/MatchWord';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <WordListScreen />
    </SafeAreaProvider>
  );
}

export default App;
