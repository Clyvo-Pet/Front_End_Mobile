import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@clyvo_cart';

export default function CarrinhoScreen({ navigate, cart, updateCartQty }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cart)).catch(() => {});
  }, [cart]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const frete = subtotal > 0 ? (subtotal >= 150 ? 0 : 15.9) : 0;
  const total = subtotal + frete;

  if (orderPlaced) {
    return (
      <View style={styles.comingSoonContainer}>
        <View style={styles.comingSoonCard}>
          <Text style={styles.comingSoonEmoji}>🚀</Text>
          <Text style={styles.comingSoonTitle}>Em breve!</Text>
          <Text style={styles.comingSoonDesc}>
            O pagamento online está quase aqui. Em breve você poderá finalizar suas compras diretamente pelo app com total segurança.
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>💳  Cartão de crédito e débito</Text>
            <Text style={styles.featureItem}>📦  Rastreamento de pedidos</Text>
            <Text style={styles.featureItem}>🔔  Notificações de entrega</Text>
          </View>
          <TouchableOpacity
            style={styles.voltarBtn}
            onPress={() => setOrderPlaced(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.voltarBtnText}>Voltar ao carrinho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => { setOrderPlaced(false); navigate('Home'); }}
            activeOpacity={0.7}
          >
            <Text style={styles.homeBtnText}>Ir para o início</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
        <Text style={styles.emptyDesc}>
          Adicione produtos do marketplace para vê-los aqui.
        </Text>
        <TouchableOpacity
          style={styles.continuarBtn}
          onPress={() => navigate('Marketplace')}
          activeOpacity={0.8}
        >
          <Text style={styles.continuarBtnText}>Ir para a loja</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate('Marketplace')} activeOpacity={0.7}>
          <Text style={styles.backBtn}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carrinho</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemEmoji}>
              <Text style={styles.itemEmojiText}>{item.emoji || '📦'}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
              </Text>
              {item.qty > 1 && (
                <Text style={styles.itemUnitPrice}>
                  R$ {item.price.toFixed(2).replace('.', ',')} / un.
                </Text>
              )}
            </View>
            <View style={styles.qtyControl}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateCartQty(item.id, -1)} activeOpacity={0.7}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateCartQty(item.id, 1)} activeOpacity={0.7}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.freteCard}>
          <Text style={styles.freteIcon}>🚚</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.freteTitle}>Frete</Text>
            <Text style={styles.freteDesc}>
              {subtotal >= 150 ? 'Grátis para compras acima de R$ 150' : 'Frete padrão'}
            </Text>
          </View>
          <Text style={[styles.freteValor, frete === 0 && styles.freteFree]}>
            {frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}
          </Text>
        </View>

        <View style={styles.resumoCard}>
          <Text style={styles.resumoTitle}>Resumo do pedido</Text>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>Subtotal ({cart.reduce((a, i) => a + i.qty, 0)} itens)</Text>
            <Text style={styles.resumoValue}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.resumoRow}>
            <Text style={styles.resumoLabel}>Frete</Text>
            <Text style={[styles.resumoValue, frete === 0 && styles.freteFree]}>
              {frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.resumoRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.finalizarBtn} onPress={() => setOrderPlaced(true)} activeOpacity={0.8}>
          <Text style={styles.finalizarBtnText}>Finalizar pedido</Text>
          <Text style={styles.finalizarBtnSub}>  R$ {total.toFixed(2).replace('.', ',')}</Text>
        </TouchableOpacity>
      </View>
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
  backBtn: { fontSize: 14, color: '#2e7d32', fontWeight: '600' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#1a1a1a' },
  list: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  itemCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  itemEmoji: {
    width: 48, height: 48, borderRadius: 10, backgroundColor: '#f0f7f0',
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  itemEmojiText: { fontSize: 24 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: '#2e7d32' },
  itemUnitPrice: { fontSize: 11, color: '#999', marginTop: 1 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 8, backgroundColor: '#f0f7f0',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#c8e6c9',
  },
  qtyBtnText: { fontSize: 16, color: '#2e7d32', fontWeight: '700', lineHeight: 20 },
  qtyValue: { fontSize: 15, fontWeight: '600', color: '#1a1a1a', marginHorizontal: 10, minWidth: 18, textAlign: 'center' },
  freteCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 3, elevation: 1,
  },
  freteIcon: { fontSize: 22, marginRight: 12 },
  freteTitle: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  freteDesc: { fontSize: 12, color: '#888', marginTop: 2 },
  freteValor: { fontSize: 14, fontWeight: '600', color: '#1a1a1a' },
  freteFree: { color: '#2e7d32' },
  resumoCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3, elevation: 1,
  },
  resumoTitle: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 14 },
  resumoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  resumoLabel: { fontSize: 13, color: '#666' },
  resumoValue: { fontSize: 13, color: '#333', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 10 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  totalValue: { fontSize: 16, fontWeight: '700', color: '#2e7d32' },
  footer: {
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
  },
  finalizarBtn: {
    backgroundColor: '#2e7d32', borderRadius: 12, paddingVertical: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
  },
  finalizarBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  finalizarBtnSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },

  // Empty
  emptyContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 40, backgroundColor: '#f7f7f7',
  },
  emptyIcon: { fontSize: 56, marginBottom: 20 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 10, textAlign: 'center' },
  emptyDesc: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 21, marginBottom: 32 },
  continuarBtn: { backgroundColor: '#2e7d32', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32 },
  continuarBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },

  // Coming soon
  comingSoonContainer: {
    flex: 1, backgroundColor: '#f7f7f7',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  comingSoonCard: {
    backgroundColor: '#fff', borderRadius: 20, padding: 28,
    alignItems: 'center', width: '100%',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  comingSoonEmoji: { fontSize: 64, marginBottom: 16 },
  comingSoonTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  comingSoonDesc: {
    fontSize: 14, color: '#666', textAlign: 'center',
    lineHeight: 22, marginBottom: 24,
  },
  featureList: {
    backgroundColor: '#f0f7f0', borderRadius: 12, padding: 16,
    width: '100%', marginBottom: 28, gap: 10,
  },
  featureItem: { fontSize: 14, color: '#2e7d32', fontWeight: '500' },
  voltarBtn: {
    backgroundColor: '#2e7d32', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 32,
    width: '100%', alignItems: 'center', marginBottom: 10,
  },
  voltarBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  homeBtn: {
    borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32,
    width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#e0e0e0',
  },
  homeBtnText: { color: '#888', fontSize: 14, fontWeight: '500' },
}); 