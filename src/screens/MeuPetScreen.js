import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
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

const SPECIES_LIST = ['Cachorro', 'Gato', 'Pássaro', 'Coelho', 'Outro'];

const HEALTH_HISTORY = [
  { id: 1, date: '08/05/2025', type: 'Consulta', desc: 'Check-up anual — Tudo ok!',              status: 'ok'    },
  { id: 2, date: '22/03/2025', type: 'Vacina',   desc: 'Antirrábica — dose anual aplicada',      status: 'ok'    },
  { id: 3, date: '10/02/2025', type: 'Exame',    desc: 'Hemograma completo — resultados normais', status: 'ok'    },
  { id: 4, date: '05/01/2025', type: 'Consulta', desc: 'Coceira na pele — tratamento prescrito',  status: 'alert' },
];

const NEXT_APPOINTMENTS = [
  { id: 1, date: '20/06/2025', time: '14h30', type: 'Consulta',   clinic: 'Clínica VetCare' },
  { id: 2, date: '15/07/2025', time: '10h00', type: 'Vacina V10', clinic: 'Pet Saúde Plus'  },
];

const VACCINES = [
  { name: 'Antirrábica',      date: '22/03/2025', next: '22/03/2026', status: 'ok'      },
  { name: 'V10 (Polivalente)', date: '10/10/2024', next: '10/10/2025', status: 'alert'   },
  { name: 'Gripe Canina',     date: '05/06/2024', next: '05/06/2025', status: 'expired' },
];

const STATUS_COLOR = { ok: '#2e7d32', alert: '#f57c00', expired: '#c62828' };
const STATUS_BG    = { ok: '#e8f5e9', alert: '#fff3e0', expired: '#ffebee' };
const STATUS_LABEL = { ok: 'Em dia',  alert: 'Atenção', expired: 'Vencida' };

const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

export default function MeuPetScreen({ navigate, user }) {
  const [pet,       setPet]       = useState({ ...DEFAULT_PET });
  const [draft,     setDraft]     = useState({ ...DEFAULT_PET });
  const [editing,   setEditing]   = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  const petEmoji =
    pet.species === 'Cachorro' ? '🐶'
    : pet.species === 'Gato'    ? '🐱'
    : pet.species === 'Pássaro' ? '🐦'
    : pet.species === 'Coelho'  ? '🐰'
    : '🐾';

  function handleSave() {
    setPet({ ...draft });
    setEditing(false);
    Alert.alert('Salvo!', 'Dados do pet atualizados com sucesso.');
  }

  function handleCancel() {
    setDraft({ ...pet });
    setEditing(false);
  }

  return (
    <View style={styles.root}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meu Pet</Text>
        {!editing && (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditing(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.editBtnText}>Editar</Text>
          </TouchableOpacity>
        )}
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

        {/* ── Aba: Informações ── */}
        {activeTab === 'info' && (
          <View style={styles.section}>
            {editing ? (
              <>
                <Text style={styles.sectionTitle}>Editar dados</Text>

                <Text style={styles.fieldLabel}>Nome</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={draft.name}
                  onChangeText={t => setDraft({ ...draft, name: t })}
                  placeholder="Nome do pet"
                  placeholderTextColor="#bbb"
                />

                <Text style={styles.fieldLabel}>Raça</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={draft.breed}
                  onChangeText={t => setDraft({ ...draft, breed: t })}
                  placeholder="Ex: Golden Retriever"
                  placeholderTextColor="#bbb"
                />

                <Text style={styles.fieldLabel}>Idade</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={draft.age}
                  onChangeText={t => setDraft({ ...draft, age: t })}
                  placeholder="Ex: 3 anos"
                  placeholderTextColor="#bbb"
                />

                <Text style={styles.fieldLabel}>Peso</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={draft.weight}
                  onChangeText={t => setDraft({ ...draft, weight: t })}
                  placeholder="Ex: 28 kg"
                  placeholderTextColor="#bbb"
                />

                <Text style={styles.fieldLabel}>Cor / Pelagem</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={draft.color}
                  onChangeText={t => setDraft({ ...draft, color: t })}
                  placeholder="Ex: Dourado"
                  placeholderTextColor="#bbb"
                />

                <Text style={styles.fieldLabel}>Espécie</Text>
                <View style={styles.speciesRow}>
                  {SPECIES_LIST.map(s => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.speciesChip, draft.species === s && styles.speciesChipActive]}
                      onPress={() => setDraft({ ...draft, species: s })}
                    >
                      <Text style={[styles.speciesChipText, draft.species === s && styles.speciesChipTextActive]}>
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.editActions}>
                  <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel} activeOpacity={0.7}>
                    <Text style={styles.cancelBtnText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
                    <Text style={styles.saveBtnText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Dados do pet</Text>
                {[
                  { label: 'Nome',          value: pet.name    },
                  { label: 'Espécie',       value: pet.species },
                  { label: 'Raça',          value: pet.breed   },
                  { label: 'Idade',         value: pet.age     },
                  { label: 'Peso',          value: pet.weight  },
                  { label: 'Cor / Pelagem', value: pet.color   },
                  { label: 'Tutor',         value: user?.name || 'Tutor' },
                ].map(field => (
                  <View key={field.label} style={styles.infoRow}>
                    <Text style={styles.infoLabel}>{field.label}</Text>
                    <Text style={styles.infoValue}>{field.value}</Text>
                  </View>
                ))}
              </>
            )}
          </View>
        )}

        {/* ── Aba: Saúde ── */}
        {activeTab === 'saude' && (
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>Próximas consultas</Text>
            {NEXT_APPOINTMENTS.map(appt => {
              const parts = appt.date.split('/');
              const day   = parts[0];
              const month = MONTHS[parseInt(parts[1]) - 1];
              return (
                <View key={appt.id} style={styles.apptCard}>
                  <View style={styles.apptDateBox}>
                    <Text style={styles.apptDay}>{day}</Text>
                    <Text style={styles.apptMonth}>{month}</Text>
                  </View>
                  <View style={styles.apptInfo}>
                    <Text style={styles.apptType}>{appt.type}</Text>
                    <Text style={styles.apptClinic}>{appt.clinic}</Text>
                    <Text style={styles.apptTime}>⏰ {appt.time}</Text>
                  </View>
                </View>
              );
            })}

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Histórico</Text>
            {HEALTH_HISTORY.map(item => (
              <View key={item.id} style={styles.historyItem}>
                <View style={[styles.historyAccent, { backgroundColor: STATUS_COLOR[item.status] }]} />
                <View style={styles.historyContent}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyType}>{item.type}</Text>
                    <Text style={styles.historyDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.historyDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addRecordBtn}
              onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento.')}
              activeOpacity={0.7}
            >
              <Text style={styles.addRecordText}>+ Adicionar registro</Text>
            </TouchableOpacity>

          </View>
        )}

        {/* ── Aba: Vacinas ── */}
        {activeTab === 'vacinas' && (
          <View style={styles.section}>

            <Text style={styles.sectionTitle}>Carteira de vacinação</Text>
            {VACCINES.map((v, i) => (
              <View key={i} style={styles.vaccineCard}>
                <View style={styles.vaccineLeft}>
                  <Text style={styles.vaccineName}>{v.name}</Text>
                  <Text style={styles.vaccineDate}>Aplicada em {v.date}</Text>
                  <Text style={styles.vaccineNext}>Próxima: {v.next}</Text>
                </View>
                <View style={[styles.vaccineStatusBadge, { backgroundColor: STATUS_BG[v.status] }]}>
                  <Text style={[styles.vaccineStatusText, { color: STATUS_COLOR[v.status] }]}>
                    {STATUS_LABEL[v.status]}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.vaccineTip}>
              <Text style={styles.vaccineTipIcon}>💡</Text>
              <Text style={styles.vaccineTipText}>
                Vacinas vencidas ou com atenção precisam de atualização. Agende uma consulta pelo app.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.scheduleBtn}
              onPress={() => navigate('Home')}
              activeOpacity={0.8}
            >
              <Text style={styles.scheduleBtnText}>Agendar consulta</Text>
            </TouchableOpacity>

          </View>
        )}

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

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '600',
    textAlign: 'right',
  },

  fieldLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 14,
    marginBottom: 4,
  },
  fieldInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  speciesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  speciesChip: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#fafafa',
  },
  speciesChipActive: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  speciesChipText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  speciesChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  saveBtn: {
    flex: 2,
    backgroundColor: '#2e7d32',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },

  apptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  apptDateBox: {
    width: 46,
    height: 52,
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  apptDay: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2e7d32',
    lineHeight: 24,
  },
  apptMonth: {
    fontSize: 10,
    color: '#2e7d32',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  apptInfo: {
    flex: 1,
  },
  apptType: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  apptClinic: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  apptTime: {
    fontSize: 12,
    color: '#888',
  },

  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  historyAccent: {
    width: 4,
  },
  historyContent: {
    flex: 1,
    padding: 14,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  historyType: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyDesc: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  addRecordBtn: {
    borderWidth: 1.5,
    borderColor: '#2e7d32',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addRecordText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
  },

  vaccineCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  vaccineLeft: {
    flex: 1,
    marginRight: 12,
  },
  vaccineName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  vaccineDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  vaccineNext: {
    fontSize: 12,
    color: '#555',
  },
  vaccineStatusBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  vaccineStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  vaccineTip: {
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ffe082',
  },
  vaccineTipIcon: {
    fontSize: 16,
    marginRight: 10,
    marginTop: 1,
  },
  vaccineTipText: {
    flex: 1,
    fontSize: 12,
    color: '#5d4037',
    lineHeight: 18,
  },
  scheduleBtn: {
    backgroundColor: '#2e7d32',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  scheduleBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

});