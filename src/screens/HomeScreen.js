import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SERVICES = [
  { id: 1, title: 'Consultas', desc: 'Agende consultas veterinárias', icon: 'medkit-outline', screen: null },
  { id: 2, title: 'Medicamentos', desc: 'Prescrição de tratamentos', icon: 'flask-outline', screen: null },
  { id: 3, title: 'Banho e Tosa', desc: 'Cuidados estéticos profissionais', icon: 'cut-outline', screen: null },
  { id: 4, title: 'Marketplace', desc: 'Produtos para o seu pet', icon: 'storefront-outline', screen: 'Marketplace' },
  { id: 5, title: 'Meu Pet', desc: 'Informações do seu animal', icon: 'paw-outline', screen: 'MeuPet' },
  { id: 6, title: 'Planos', desc: 'Planos de saúde pet', icon: 'shield-checkmark-outline', screen: 'Planos' },
];

const TIPS = [
  { id: 1, title: 'Vacinas em dia', text: 'Manter o calendario de vacinacao atualizado protege o seu pet de doencas graves.' },
  { id: 2, title: 'Alimentacao adequada', text: 'Consulte um veterinario para definir a dieta ideal para a raca e idade do seu animal.' },
  { id: 3, title: 'Exercicios regulares', text: 'Atividade fisica diaria contribui para a saude fisica e mental do seu pet.' },
];

export default function HomeScreen({ navigate, user, logout }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ola, {user?.name || 'Usuario'}</Text>
          <Text style={styles.greetingSub}>Bem-vindo ao Clyvo Pet</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Cuide bem do seu melhor amigo</Text>
        <Text style={styles.bannerDesc}>
          Acesse planos, produtos e consultas veterinarias em um so lugar.
        </Text>
        <TouchableOpacity style={styles.bannerBtn} onPress={() => navigate('Planos')}>
          <Text style={styles.bannerBtnText}>Conhecer planos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Servicos</Text>
        <View style={styles.grid}>
          {SERVICES.map(s => (
            <TouchableOpacity
              key={s.id}
              style={styles.card}
              onPress={() => s.screen && navigate(s.screen)}
              activeOpacity={s.screen ? 0.7 : 1}
            >
              <Text style={styles.cardTitle}>{s.title}</Text>
              <Text style={styles.cardDesc}>{s.desc}</Text>
              {s.screen && <Text style={styles.cardLink}>Acessar</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dicas de saude</Text>
        {TIPS.map(t => (
          <View key={t.id} style={styles.tip}>
            <View style={styles.tipAccent} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{t.title}</Text>
              <Text style={styles.tipText}>{t.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  greetingSub: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  logoutBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logoutText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  banner: {
    margin: 16,
    backgroundColor: '#2e7d32',
    borderRadius: 14,
    padding: 22,
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    lineHeight: 24,
  },
  bannerDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.82)',
    marginBottom: 18,
    lineHeight: 19,
  },
  bannerBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 13,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginRight: '2%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 12,
    color: '#777',
    lineHeight: 17,
  },
  cardLink: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
    marginTop: 10,
  },
  tip: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  tipAccent: {
    width: 4,
    backgroundColor: '#2e7d32',
  },
  tipContent: {
    flex: 1,
    padding: 14,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },
});
