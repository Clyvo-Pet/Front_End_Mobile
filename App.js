import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import PlanosScreen from './src/screens/PlanosScreen';
import MeuPetScreen from './src/screens/MeuPetScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

const TABS = [
  { name: 'Home', label: 'Inicio' },
  { name: 'Marketplace', label: 'Loja' },
  { name: 'Planos', label: 'Planos' },
  { name: 'MeuPet', label: 'Meu Pet' },
];

const NO_TABS = ['Login', 'Register', 'Carrinho'];

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@clyvo_user').then(s => {
      if (s) setUser(JSON.parse(s));
    });
  }, []);

  const navigate = (name) => setScreen(name);

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const logout = async () => {
    await AsyncStorage.removeItem('@clyvo_user');
    setUser(null);
    setCart([]);
    navigate('Login');
  };

  const props = { navigate, user, setUser, cart, addToCart, updateCartQty, clearCart, logout };

  const renderScreen = () => {
    switch (screen) {
      case 'Login':       return <LoginScreen {...props} />;
      case 'Register':    return <RegisterScreen {...props} />;
      case 'Home':        return <HomeScreen {...props} />;
      case 'Marketplace': return <MarketplaceScreen {...props} />;
      case 'Planos':      return <PlanosScreen {...props} />;
      case 'MeuPet':      return <MeuPetScreen {...props} />;
      case 'Carrinho':    return <CarrinhoScreen {...props} />;
      default:            return <LoginScreen {...props} />;
    }
  };

  const showTabs = !NO_TABS.includes(screen);
  const totalItems = cart.reduce((a, i) => a + i.qty, 0);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>{renderScreen()}</View>
      {showTabs && (
        <View style={styles.tabBar}>
          {TABS.map(tab => {
            const active = screen === tab.name;
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.tabItem}
                onPress={() => navigate(tab.name)}
                activeOpacity={0.7}
              >
                {tab.name === 'Marketplace' && totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems}</Text>
                  </View>
                )}
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
                {active && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 10,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 4,
  },
  tabLabel: { fontSize: 12, color: '#999', fontWeight: '500' },
  tabLabelActive: { color: '#2e7d32', fontWeight: '700' },
  tabIndicator: {
    position: 'absolute',
    bottom: -10,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2e7d32',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 16,
    backgroundColor: '#c62828',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});