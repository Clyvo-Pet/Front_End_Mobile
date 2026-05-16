import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const DEFAULT_PET = {
  name: 'Mel',
  species: 'Cachorro',
  breed: 'Golden Retriever',
  age: '3 anos',
  weight: '28 kg',
  color: 'Dourado',
};

const TABS = [
  { id: 'info',    label: 'Informações' },
  { id: 'saude',   label: 'Saúde'       },
  { id: 'vacinas', label: 'Vacinas'     },
];

export default function MeuPetScreen({ navigate, user }) {
  const [pet]       = useState({ ...DEFAULT_PET });
  const [activeTab, setActiveTab] = useState('info');

  const petEmoji =
    pet.species === 'Cachorro' ? '🐶'
    : pet.species === 'Gato' ? '🐱'
    : pet.species === 'Pássaro' ? '🐦'
    : pet.species === 'Coelho' ? '🐰'
    : '🐾';

  return (
    <View style={styles.root}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Pet</Text>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
          <Text style={styles.editBtnText}>Editar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Card de perfil */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>{petEmoji}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed}</Text>
            <View style={styles.petTagRow}>
              <View style={styles.petTag}>
                <Text style={styles.petTagText}>{pet.species}</Text>
              </View>
              <View style={styles.petTag}>
                <Text style={styles.petTagText}>{pet.age}</Text>
              </View>
              <View style={styles.petTag}>
                <Text style={styles.petTagText}>{pet.weight}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Abas */}
        <View style={styles.tabRow}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Placeholder das seções */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'info'    ? 'Informações do pet'  : null}
            {activeTab === 'saude'   ? 'Histórico de saúde'  : null}
            {activeTab === 'vacinas' ? 'Carteira de vacinação' : null}
          </Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  editBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2e7d32',
  },
  editBtnText: {
    fontSize: 13,
    color: '#2e7d32',
    fontWeight: '600',
  },

  profileCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#f0f7f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#c8e6c9',
  },
  avatarEmoji: {
    fontSize: 38,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  petName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  petBreed: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  petTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  petTag: {
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  petTagText: {
    fontSize: 11,
    color: '#2e7d32',
    fontWeight: '600',
  },

  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#2e7d32',
  },
  tabText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#2e7d32',
    fontWeight: '700',
  },

  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },

});