import React from 'react';
import { StyleSheet, View } from 'react-native';
import MovieNavigation from './component/navigation/MovieNavigation';

export default function App() {

  return (
    <View style={styles.container}>
      <MovieNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});