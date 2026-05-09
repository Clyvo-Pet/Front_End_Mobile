import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigate, setUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  });

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!form.name.trim()) { Alert.alert('Atencao', 'Informe seu nome completo.'); return; }
    if (!form.email.trim()) { Alert.alert('Atencao', 'Informe seu email.'); return; }
    if (!form.email.includes('@')) { Alert.alert('Atencao', 'Informe um email valido.'); return; }
    if (!form.telephone.trim()) { Alert.alert('Atencao', 'Informe seu telefone.'); return; }
    if (!form.password) { Alert.alert('Atencao', 'Informe uma senha.'); return; }
    if (form.password.length < 6) { Alert.alert('Atencao', 'A senha deve ter no minimo 6 caracteres.'); return; }
    if (form.password !== form.confirmPassword) { Alert.alert('Atencao', 'As senhas nao coincidem.'); return; }

    try {
      const user = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        telephone: form.telephone.trim(),
        password: form.password,
      };

      await AsyncStorage.setItem('@clyvo_user', JSON.stringify(user));

      Alert.alert(
        'Conta criada',
        'Seu cadastro foi realizado com sucesso. Faca login para continuar.',
        [{ text: 'Fazer login', onPress: () => navigate('Login') }]
      );
    } catch (e) {
      Alert.alert('Erro', 'Nao foi possivel salvar o cadastro. Tente novamente.');
    }
  };

  const fields = [
    { key: 'name', label: 'Nome completo', placeholder: 'Seu nome', autoCapitalize: 'words' },
    { key: 'email', label: 'Email', placeholder: 'seu@email.com', keyboard: 'email-address', autoCapitalize: 'none' },
    { key: 'telephone', label: 'Telefone', placeholder: '(11) 99999-9999', keyboard: 'phone-pad' },
    { key: 'password', label: 'Senha', placeholder: 'Minimo 6 caracteres', secure: true },
    { key: 'confirmPassword', label: 'Confirmar senha', placeholder: 'Repita a senha', secure: true },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.inner}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigate('Login')}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Preencha os dados abaixo para se cadastrar</Text>

        <View style={styles.form}>
          {fields.map(f => (
            <View key={f.key}>
              <Text style={styles.label}>{f.label}</Text>
              <TextInput
                style={styles.input}
                placeholder={f.placeholder}
                placeholderTextColor="#bbb"
                value={form[f.key]}
                onChangeText={v => updateField(f.key, v)}
                keyboardType={f.keyboard || 'default'}
                autoCapitalize={f.autoCapitalize || 'sentences'}
                secureTextEntry={f.secure || false}
                autoCorrect={false}
              />
            </View>
          ))}

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Ja tenho uma conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  inner: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  backBtn: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 28,
    lineHeight: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  button: {
    backgroundColor: '#2e7d32',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  loginButton: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  loginButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
});
