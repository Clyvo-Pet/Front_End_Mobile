import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, TextInput,
} from 'react-native';

const PRODUCTS = [
  { id: 1, name: 'Ração Premium Adulto 15kg', price: 129.9, category: 'Alimentação', emoji: '🥗' },
  { id: 2, name: 'Ração Filhote Frango 3kg', price: 54.9, category: 'Alimentação', emoji: '🍗' },
  { id: 3, name: 'Petisco Natural de Frango', price: 22.9, category: 'Petiscos', emoji: '🦴' },
  { id: 4, name: 'Shampoo Antipulgas 500ml', price: 34.9, category: 'Higiene', emoji: '🧴' },
  { id: 5, name: 'Escova Dental Pet', price: 18.9, category: 'Higiene', emoji: '🪥' },
  { id: 6, name: 'Coleira Antipulgas P', price: 45.0, category: 'Saúde', emoji: '🔵' },
  { id: 7, name: 'Brinquedo Mordedor Látex', price: 29.9, category: 'Brinquedos', emoji: '🧸' },
  { id: 8, name: 'Cama Pet Tamanho M', price: 89.9, category: 'Acessórios', emoji: '🛏️' },
  { id: 9, name: 'Bebedouro Automático 1.5L', price: 67.9, category: 'Acessórios', emoji: '💧' },
  { id: 10, name: 'Suplemento Vitamínico', price: 48.9, category: 'Saúde', emoji: '💊' },
];

const CATEGORIES = ['Todos', 'Alimentação', 'Higiene', 'Saúde', 'Brinquedos', 'Acessórios', 'Petiscos'];

export default function MarketplaceScreen({ navigate, cart, addToCart, updateCartQty }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Todos' || p.category === category;
    return matchSearch && matchCat;
  });

  const totalItems = cart.reduce((a, i) => a + i.qty, 0);

  const getCartQty = (id) => cart.find((i) => i.id === id)?.qty || 0;

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <Text style={styles.headerSub}>Produtos para o seu pet</Text>
        </View>
        <TouchableOpacity style={styles.cartBtn} onPress={() => navigate('Carrinho')} activeOpacity={0.7}>
          <Text style={styles.cartBtnText}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto..."
          placeholderTextColor="#bbb"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, category === cat && styles.catChipActive]}
            onPress={() => setCategory(cat)}
            activeOpacity={0.7}
          >
            <Text style={[styles.catChipText, category === cat && styles.catChipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {filtered.map((product) => {
            const qty = getCartQty(product.id);
            return (
              <View key={product.id} style={styles.productCard}>
                <View style={styles.productEmoji}>
                  <Text style={styles.productEmojiText}>{product.emoji}</Text>
                </View>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.productPrice}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </Text>
                {qty === 0 ? (
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addToCart(product)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addBtnText}>Adicionar</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateCartQty(product.id, -1)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyVal}>{qty}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => addToCart(product)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Cart floating button */}
      {totalItems > 0 && (
        <TouchableOpacity style={styles.floatingCart} onPress={() => navigate('Carrinho')} activeOpacity={0.9}>
          <Text style={styles.floatingCartText}>
            Ver carrinho ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
          </Text>
          <Text style={styles.floatingCartPrice}>
            R$ {cart.reduce((a, i) => a + i.price * i.qty, 0).toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f7f7f7' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  headerSub: { fontSize: 12, color: '#888', marginTop: 2 },
  cartBtn: { position: 'relative', padding: 4 },
  cartBtnText: { fontSize: 24 },
  cartBadge: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: '#c62828', borderRadius: 8,
    width: 16, height: 16, alignItems: 'center', justifyContent: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 9, fontWeight: 'bold' },

  // Search
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff' },
  searchInput: {
    backgroundColor: '#f7f7f7', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 10, fontSize: 14,
    color: '#1a1a1a', borderWidth: 1, borderColor: '#eaeaea',
  },

  // Categories
  catScroll: { backgroundColor: '#fff', maxHeight: 52 },
  catContent: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  catChip: {
    borderWidth: 1, borderColor: '#e0e0e0', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 6, backgroundColor: '#fafafa', marginRight: 8,
  },
  catChipActive: { backgroundColor: '#2e7d32', borderColor: '#2e7d32' },
  catChipText: { fontSize: 13, color: '#666', fontWeight: '500' },
  catChipTextActive: { color: '#fff', fontWeight: '600' },

  // Grid
  list: { flex: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12, gap: 10 },
  productCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    width: '47%', marginBottom: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  productEmoji: {
    width: 44, height: 44, borderRadius: 10, backgroundColor: '#f0f7f0',
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  productEmojiText: { fontSize: 24 },
  productCategory: { fontSize: 10, color: '#2e7d32', fontWeight: '600', textTransform: 'uppercase', marginBottom: 4 },
  productName: { fontSize: 13, fontWeight: '600', color: '#1a1a1a', marginBottom: 6, lineHeight: 18 },
  productPrice: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 12 },
  addBtn: {
    backgroundColor: '#2e7d32', borderRadius: 8,
    paddingVertical: 8, alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  qtyBtn: {
    width: 28, height: 28, borderRadius: 7, backgroundColor: '#f0f7f0',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#c8e6c9',
  },
  qtyBtnText: { fontSize: 16, color: '#2e7d32', fontWeight: '700', lineHeight: 20 },
  qtyVal: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },

  // Floating cart
  floatingCart: {
    position: 'absolute', bottom: 16, left: 16, right: 16,
    backgroundColor: '#2e7d32', borderRadius: 14, paddingVertical: 14, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2, shadowRadius: 6, elevation: 5,
  },
  floatingCartText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  floatingCartPrice: { color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '700' },
});