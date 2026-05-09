import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// TODO: implementar esta tela
export default function CarrinhoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CarrinhoScreen</Text>
      <Text style={styles.sub}>Em construcao</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f7f7f7' },
  text: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  sub: { fontSize: 14, color: '#888' },
});
